module battle {
	export class BattleStageControl extends egret.EventDispatcher {
		private static Delay_ReadyKick: number = 30000;       	//15秒不准备踢出
        public static Delay_SendCardAni: number = 6000;     	//4秒发牌动画
        private static Delay_CallLand: number = 10000;       	//10秒叫地主
        private static Delay_ShowCard: number = 25000;       	//25秒游戏发牌
		
		public _playerList = new Array<Player>(); 				//用户列表
		private _myOwner:Player = new Player();					//我自己
		private _landLordUser:Player = null;					//地主玩家
		private _lastSendCardPlayer:Player = null;				//最后出牌玩家
		private _callLandLordUID:number = 0;					//叫地主的人的ID
		private _landLordCardList = [];							//底牌列表
		private _tableCardList = [];							//桌面大牌
		private _playerPoint:number = 0;						//用户指针,指向当前用户,对应玩家seatNo
		private _tablelistdata:gameLogic.CardListData = null;   //当前桌面上的牌
		private _timesScore:string = "";
		private _timesCount:number = 0;							//加倍数

		private _playCardType: gameLogic.PlayCardTypes = null;   //判断牌类型
		private _compare: gameLogic.Compare = null;              //比较牌
		private _prompt: gameLogic.Prompt = null;                //提示牌

		private _stage:BattleStageUI = null;
    	
		private _playerHeader_left:PlayerHead = null;			//上家
		private _playerHeader_right:PlayerHead = null;			//下家

		private _playerTimer:PlayerTime = null;					//闹钟提示
		
		private _timeoutList:Array<number> = [];

		public constructor(stage:BattleStageUI) {
			super();
			this._stage = stage;
		}

		public init(){
			//添加监听消息
			this.BattleEventListen();
			this._playerHeader_left = new battle.PlayerHead();//上家
			this._playerHeader_right = new battle.PlayerHead();//下家
			this._playerTimer = new PlayerTime();
			this._playerTimer.Init();
			this._stage._playerTimerSprite.addChild(this._playerTimer);
			this._playerTimer.visible = false;
		}

		public startGame(){

			this._playCardType = 	new gameLogic.PlayCardTypes();   //判断牌类型
			this._compare = 		new gameLogic.Compare();              //比较牌
			this._prompt = 			new gameLogic.Prompt();                //提示牌

			this.sendReadMsg();//发送准备消息
		}

		//设置底牌
		set landLordCardList(arr:Array<number>){
			this._landLordCardList = arr;
		}

		/**
		 * 添加用户
		 * @param {GUser} user
		 */
		public addPlayer(user:GUser){
			console.log("addPlayers",user);
			if(user){
				let player = new Player();
				player.avator = user.avator;
				player.nickName = user.nickName;
				player.userID = user.userID;
				player.pointValue = user.pointValue;
				player.rank = user.rank;
				this._playerList.push(player);
				if(player.userID == GlobalData.myUser.userID){
					this._myOwner = player;
				}
			}
		}

		//添加事件监听
		private BattleEventListen(){
			//network.BattleMsg.getInstance() 是事件发送者，准备游戏发送回调
			network.BattleMsg.getInstance().addEventListener(network.BattleMsgEvent.GAME_READY,this.GameReadyEventCall, this);

			//叫地主结束
			network.BattleMsg.getInstance().addEventListener(network.BattleMsgEvent.CALL_LANDLORD_OVER,this.CallLandLordOver, this);

			//下一个叫地主
			network.BattleMsg.getInstance().addEventListener(network.BattleMsgEvent.CALL_LANDLORD_NEXT,this.CallLandLordNext, this);

			//收到出牌消息
			network.BattleMsg.getInstance().addEventListener(network.BattleMsgEvent.PLAYER_CARDS,this.PlayCards, this);

			//游戏结束
			network.BattleMsg.getInstance().addEventListener(network.BattleMsgEvent.GAME_OVER,this.GameOver, this);

			
			PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY,this.leaveRoomNotify,this);
		}


		/**
		 * 分配上下家
		 */
		private leftOrRight(){
			let myUser = this._myOwner;
			this._playerList.forEach((element)=>{
				//分配上下家
					if(element.userID == myUser.userID){
						element.LocalTableId = 3;
					}else{
						console.info("leftOrRight ", myUser.seatNo,element.seatNo);
						if(myUser.seatNo == 1){
							if(element.seatNo == 0){
								element.LocalTableId = 1;
							}else if(element.seatNo == 2){
								element.LocalTableId = 2;
							}
						}else if(myUser.seatNo == 2){
							if(element.seatNo == 1){
								element.LocalTableId = 1;
							}
							else if(element.seatNo == 0){
								element.LocalTableId = 2;
							}
						}else if(myUser.seatNo == 0){
							if(element.seatNo == 2){
								element.LocalTableId = 1;
							}else if(element.seatNo == 1){
								element.LocalTableId = 2;
							}
						}
					}
					console.info("leftOrRight",element.LocalTableId);
					//显示用户头像
					this.SetPlayerHead(element,true);
			});
		}

		/**
		 * 设置牌列表
		 */
		private setCardList(list:Array<any>){
			let TableId  = 1;
			let myUser = this._myOwner;
			//let seatNo = 0;

			for(let i = 0; i < list.length; i++){
				//获取牌列表
				this._playerList.forEach((element)=>{
					console.info("list[i].userID == element.userID",list[i].userID,element.userID);
					if(list[i].userID == element.userID){
						console.info("setCardList",list[i].card);
						element.AddcardList(list[i].card);
						element.seatNo = i;
						element.IsReady = true;
						console.info("element.seatNo"+element.seatNo);
					}
					// element.seatNo = i;
					
				});
			}
			//用户列表安装 seatNo排序
			this._playerList.sort(function(a,b){
				return a.seatNo < b.seatNo ? 1:-1;
			});
			this.leftOrRight();
		}

		private ReSendCard(){
			this._stage.ReSendCards();
			this._playerList.forEach(function(value){
				value.clearPlayer();
			});
		}

		/**
		 * 准备游戏后, 收到发牌消息调用这个函数，给各个用户填写牌信息
		 */
		private GameReadyEventCall(event:egret.Event){
			this.removeEventListener(network.BattleMsgEvent.GAME_READY, this.GameReadyEventCall, this);
			this.ReSendCard();
			this._stage.WaitSendCardHide();
			console.info("GameReadyEventCall",event.data);
			let data = event.data;
			if(!data){
				return;
			}

			//获取地主牌
			if("lanownList" in data){
				this._landLordCardList = data.lanownList;
			}

			if("callOwner" in data){
				this._callLandLordUID = data.callOwner;
			}

			if("userCards" in data){
				//获取洗出的牌进设置到用户列表中
				this.setCardList(data.userCards);
			}

		
			this._timeoutList.push(egret.setTimeout(this.beginCallLandLord, this, 4000));
			this.SendCard();
		}

		/**
		 * 开始叫地主
		 */
		private beginCallLandLord(){
			console.info("beginCallLandLord:");
			let ismeCall = false;
			if(this._callLandLordUID == this._myOwner.userID){
				ismeCall = true;
			}

			this._playerList.forEach((value)=>{
				if(value.userID == this._callLandLordUID){
					console.info("beginCallLandLord",value);
					//显示叫地主
					this._stage.ShowCallLand(value, ismeCall,0,BattleStageControl.Delay_CallLand);
				}
			});			
		}

		/**
		 * 游戏结束的时候调用
		 */
		public GameOver(event:egret.Event){
			network.BattleMsg.getInstance().removeEventListener(network.BattleMsgEvent.GAME_OVER,this.GameOver, this);
			console.info("游戏结束", event.data);
			if(!("winerID" in event.data) || !("winSeatNo" in event.data) || !("islandwin" in event.data)){
				console.error("消息格式错误");
				return;
			}
			this._playerPoint = 0;                          //用户指针,指向当前用户,对应玩家tableid
			this._tablelistdata = null;                		//当前桌面上的牌
			this._landLordUser = null;                      //地主
			this._landLordCardList = [];                    //起始的三张地主牌
			//取消定时
			while (this._timeoutList.length > 0) {
            	egret.clearTimeout(this._timeoutList.pop());
        	}

			if (<PlayerHead>this["_playerHeader_left"]) {
                (<PlayerHead>this["_playerHeader_left"]).Ready = false;
                (<PlayerHead>this["_playerHeader_left"]).ShowCard = false;
            }

            if (<PlayerHead>this["_playerHeader_right"]) {
                (<PlayerHead>this["_playerHeader_right"]).Ready = false;
                (<PlayerHead>this["_playerHeader_right"]).ShowCard = false;
            }
            // this._playerTimer.visible = false;
			let islandwin = event.data.islandwin;
			let iswin:boolean = this._myOwner.isLandLord == islandwin;

			var tp1: Player = this.getPlayerByLocalTableId(1);//需要根据上下家区分显示牌
			var tp2: Player = this.getPlayerByLocalTableId(2);
			var tp3: Player = this.getPlayerByLocalTableId(3);
			let winplayer = this.getPlayerForUserID(event.data.winerID);
			this._stage.GameOver(iswin,tp1,tp2,tp3,islandwin,this._timesCount,false, 0, 0, 0, winplayer);
			this._stage = null;
		}

		/**
		 * CallLandOver 结束叫地主
		 */
		private CallLandLordOver(evt:egret.Event){
			console.log("叫地主结束", evt.data);
			if(!evt.data){
				return;
			}
			if("landOwner" in evt.data && "landCards" in evt.data && "value" in evt.data){
				let landOwnerID = evt.data.landOwner;
				//获取底牌
				this.landLordCardList = evt.data.landCards;
				for(let i = 0; i < this._playerList.length; i++){
					//判断是不是地主
					if(landOwnerID == this._playerList[i].userID){
						//this._landLordUser = new Player();
						this._playerList[i].isLandLord = true;
						this._playerList[i].landlordScore = evt.data.value;
						this._playerList[i].AddcardList(evt.data.landCards);//添加地主牌
						//获取地主
						this._landLordUser = this._playerList[i];
						this._timesScore = evt.data.value+"X"+1
					}
				}

				// if(landOwnerID == this._myOwner.userID){
				// 	//如果地主是我就给我添加地主牌
				// 	this._myOwner.AddcardList(evt.data.landCards);
				// }
				this._tableCardList = [];
				this._playerPoint = this._landLordUser.seatNo;
				this._stage.OverCallLand(this._landLordUser, evt.data.landCards, this._myOwner,this._timesScore);
				this._stage.TurnPlayCard(this._landLordUser, (this._landLordUser.userID == this._myOwner.userID), true, this._tableCardList,BattleStageControl.Delay_ShowCard,false);
			}
		}

		/**
		 * 下一个叫地主的人
		 */
		private CallLandLordNext(event:egret.Event){
			let ismeCall = false;
			if(event.data.nextUser == this._myOwner.userID){
				ismeCall = true;
			}
			this._callLandLordUID = event.data.nextUser;
			this._playerList.forEach((value)=>{
				if(value.userID == event.data.nextUser){
					console.info("beginCallLandLord",value);
					//显示叫地主
					this._stage.ShowCallLand(value, ismeCall,event.data.score,BattleStageControl.Delay_CallLand);
				}
			});	
		}

		/**
		 * UserID 获取player
		 */
		private getPlayerForUserID(userID):Player{
			let player = null;
			this._playerList.forEach((value)=>{
				if(value.userID == userID){
					player = value;
				}
			});
			return player;
		}

		/**
		 * seatNo获取player
		 */
		private getPlayerForSeatNo(seatNo):Player{
			let player = null;
			for(let i = 0; i < this._playerList.length; i++){
				if(this._playerList[i].seatNo == seatNo){
					player = this._playerList[i];
					console.info("getPlayerForSeatNo ",this._playerList[i]);
					return this._playerList[i];
				}
			}
			return player;
		}
		
		private getPlayerByLocalTableId(localTableID:number){
			let player = null;
			this._playerList.forEach((value)=>{
				console.info("getPlayerByLocalTableId "+value.LocalTableId);
				if(value.LocalTableId == localTableID){
					player = value;
				}
			});
			return player;
		}

		/**
		 * 获取下一个出牌的人
		 */
		private getNextPlayerPoint(playPonit:number):Player{
			this._playerPoint = playPonit;
			if((++this._playerPoint) >= 3){
				this._playerPoint = 0;
			}
			return this.getPlayerForSeatNo(this._playerPoint);
		}

		/**
		 * 获取敌人
		 */
		private getPlayerEnemy(p:Player):Player{
			let tableloc: number = 0;
            let pp:Player = null;
            for (let i in this._playerList) {
                if (this._playerList[i] == null || this._playerList[i] == p) {
                    continue;
                }
                if (this._playerList[i].isLandLord != p.isLandLord && this._playerList[i].LocalTableId > tableloc) {
                    tableloc = this._playerList[i].LocalTableId;
                    pp = this._playerList[i];
                }
            }
            return pp;
		}
		/**
		 * 获取敌人列表
		 */
		private getEnemy(p: Player): Array<Player> {
			let len: number = this._playerList.length;
			let i: number = 0;
			let enelist: Array<Player> = [];
			for (i = 0; i < len; i++) {
				if (this._playerList[i].userID != p.userID && this._playerList[i].isLandLord != p.isLandLord) {
					enelist.push(this._playerList[i]);
				}
			}
			return enelist;
    	}

		//过,要不起
		public Pass(id: number): boolean {
			if (this._landLordUser == null) {
				console.info("RobotGameMgr-Pass> 没有产生地主");
				return false;
			}
			if (this._playerPoint != id) {
				console.info("RobotGameMgr-Pass> 没有轮到该玩家");
				return false;
			}
			console.info("RobotGameMgr-Pass> 玩家pass,id:", id);
			this._playerPoint++;
			if (this._playerPoint >= 3) {
				this._playerPoint = 0;
			}
			if (this._tablelistdata && this._playerPoint == this._tablelistdata.FromId) {
				console.info("RobotGameMgr-Pass> 一轮结束 玩家可以重新出牌:", id);
				this._tablelistdata = null;
			}
			return true;
		}


		//出牌
		public ShowCard(slist: Array<number>, id: number): boolean {
			if (this._landLordUser == null) {
				console.info("RobotGameMgr-ShowCard> 没有产生地主,先叫分");
				return false;
			}
			if (this._playerPoint != id) {
				console.info("RobotGameMgr-ShowCard> 没有轮到该玩家");
				return false;
			}
			let cld: gameLogic.CardListData = this._playCardType.GetType(slist);
			if (cld.Type == gameLogic.PlayCardTypes.Types_Error) {
				console.info("RobotGameMgr-ShowCard> 出牌不符合规则");
				return false;
			}

			let isbig: boolean = this._compare.IsBiger(cld, this._tablelistdata)
			if (!isbig) {
				console.info("RobotGameMgr-ShowCard> 出牌大不过桌面牌");
				return false;
			}
			if (cld.Type == gameLogic.PlayCardTypes.Types_Bomb) {
				this._timesCount++;
			}
			let player:Player = this.getPlayerForSeatNo(this._playerPoint);
			console.info("_playerPoint",this._playerPoint);
			player.removeCards(slist);
			this._lastSendCardPlayer = player;
			console.info("该玩家剩余牌数量："+player.cardNumber);
			if (player.cardNumber <= 0) {
				let enelist: Array<Player> = this.getEnemy(player);
				let isspring: boolean = true;
				for (let i: number = 0; i < enelist.length; i++) {
					if (enelist[i].cardNumber > 0) {
						isspring = false;
					}
				}
				if (isspring) {
					this._timesCount++;              	//春天
				}
				player.cardList = slist;               	//显示最后玩家牌
				//this.GameOver();
				if(player.userID == this._myOwner.userID){
					console.info("发送游戏结束消息：", player.userID, this);
					this.sendGameOver({
						winSeatNo:player.seatNo,			//胜利者座位
						islandwin:player.isLandLord,		//是不是地主
						timesCount:this._timesCount,		//加倍数
					});
				}
				
				return false;
			}
			console.info("RobotGameMgr-ShowCard> 出牌成功");
			this._playerPoint++;
			if (this._playerPoint >= 3) {
				this._playerPoint = 0;
			}
			this._tablelistdata = cld;
			this._tablelistdata.FromId = id;

			return true;
		}


		/**
		 * 收到出牌消息,显示牌
		 */
		public PlayCards(event:egret.Event){
			console.info("出牌逻辑：",event.data);
			if(!("userID" in event.data) || !("cardlist" in event.data)){
				return;
			}

			//显示上一个出牌的人的牌
			let player:Player = this.getPlayerForUserID(event.data.userID);
			
			let clist: Array<number> = event.data.cardlist;
			let isok:boolean = false;
			if (clist == null || clist.length <= 0) {
				isok = this.Pass(this._playerPoint);
			}else{
				isok = this.ShowCard(clist, this._playerPoint);
			}
			if (isok == false)//出牌失败
			{
				//console.info("出牌失败");
				return;
			}
			let Crushed:number = 1;
			let isnew = this._tablelistdata == null; //是否出完一轮，新出牌
			//移除牌，玩家的牌
			player.removeCards(clist);
			console.info("myPlayer",this._myOwner, " sendCardPlayer:", player)
			//界面显示牌
			this._stage.ShowPlay(player, clist,  (player.userID == this._myOwner.userID) , "");

			if (this._tableCardList == null || this._tableCardList.length == 0) {
				let yasplayer:Player = this.getPlayerEnemy(player);
				if (yasplayer) {
					Crushed = yasplayer.LocalTableId;
				}
			}
			else {
				if (this._lastSendCardPlayer) {
					Crushed = this._lastSendCardPlayer.LocalTableId;
				}
			}
			if (clist != null && clist.length > 0) {
				this._tableCardList = clist;
				this._lastSendCardPlayer = player;
            }


			//获取下一个出牌的人
			player = this.getNextPlayerPoint(player.seatNo);

			let canshowAll = false; //别人都剩一张的时候自己没有单牌,可以全下条件
			if (isnew) {
				this._tableCardList = [];
				this._lastSendCardPlayer = null;
			}
			console.info("新的一轮 isnew:", isnew);
			console.info("下一个出牌人 player:", player);
			console.info("当前桌上牌 _tableCardList:", this._tableCardList);
			//轮流出牌
			this._stage.TurnPlayCard(player, (player.userID == this._myOwner.userID), isnew, this._tableCardList, BattleStageControl.Delay_ShowCard, false);
		}

		/**
		 * 启用发牌动画
		 */
		private SendCard(){
			// 发牌
			this._stage.SendCard(this._myOwner);
			this._playerHeader_left.ShowCard = true;
			this._playerHeader_left.Ready = false;
			this._playerHeader_right.ShowCard = true;
			this._playerHeader_right.Ready = false;
		}

		/**
		 * 发送准备消息
		 */
		private sendReadMsg(){
			network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.GAME_READY_S,{value:"ready"});
		}

		/**
		 * 发送游戏结束
		 */
		private sendGameOver(data:any){
			network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.GAME_OVER_S, data);
		}

		/**
		 * 显示对手玩家的头像
		 */
		public SetPlayerHead(p: Player, isin: boolean = false){
			if (p == null) {
                return;
            }
			//判断上下家 我
			if(p.userID == GlobalData.myUser.userID){
				return;
			}

			let localid = "left";
			if(p.LocalTableId == 2){
				localid = "right";
			}
			console.log("_playerHeader_",this["_playerHeader_" + localid]);
            (<PlayerHead>this["_playerHeader_" + localid]).Release();
			console.info("SetPlayerHead"+p.cardNumber);
            (<PlayerHead>this["_playerHeader_" + localid]).Init(p);
            this._stage._playerHeadSprite.addChildAt((<PlayerHead>this["_playerHeader_" + localid]), 0);
            (<PlayerHead>this["_playerHeader_" + localid]).Ready = p.IsReady;
            (<PlayerHead>this["_playerHeader_" + localid]).UpdateCardNum();
            (<PlayerHead>this["_playerHeader_" + localid]).LandFlagVisible(false, false);
            if (p.LocalTableId == 1) {
                this._playerHeader_left.x = 65;
                this._playerHeader_left.y = 190;
            }
            else if (p.LocalTableId == 2) {
                this._playerHeader_right.x = 475;
                this._playerHeader_right.y = 190;
            }

            if (isin && p.LocalTableId != 3) {
                let ph: PlayerHead = (<PlayerHead>this["_playerHeader_" + localid]);
                if (ph) {
                    egret.Tween.removeTweens(ph);
                    let tx: number = ph.x;
                    let fx: number = 0;
                    if (p.LocalTableId == 1) {
                        fx = tx - 300;
                    }
                    else if (p.LocalTableId == 2) {
                        fx = tx + 300;
                    }
                    ph.x = fx;
                    egret.Tween.get(ph).to({ x: tx }, 600);
                }
            }
		}

		public SetPlayerTime(p: Player, delaytime:number){
			this._playerTimer.SetPoint(p.LocalTableId, delaytime);
            this._playerTimer.visible = true;
		}

		/**
		 * 设置地主标志
		 */
		public SetPlayerLandFlag(landid: number){
			if(this["_playerHeader_left"]){
				this._playerHeader_left.IsLandOwner = false;
				this._playerHeader_left.LandFlagVisible(true, false);
			}

			if(this["_playerHeader_right"]){
				this._playerHeader_right.IsLandOwner = false;
				this._playerHeader_right.LandFlagVisible(true, false);
			}


			if(landid == 1){
				if(this["_playerHeader_left"]){
					this["_playerHeader_left"].IsLandOwner = false;
					this["_playerHeader_left"].LandFlagVisible(true, true);
				}
			}
			else if(landid == 2){
				if(this["_playerHeader_right"]){
					this["_playerHeader_right"].IsLandOwner = false;
					this["_playerHeader_right"].LandFlagVisible(true, true);
				}
			}
		}

		/**
		 * 更新牌数
		 */
		public UpdateAllCardNum(){
			if(this["_playerHeader_left"]){
				this._playerHeader_left.ShowCard = true;
				this._playerHeader_left.UpdateCardNum();
			}

			if(this["_playerHeader_right"]){
				this._playerHeader_right.ShowCard = true;
				this._playerHeader_right.UpdateCardNum();
			}
		}

		//有玩家离开房间就提示玩家离开房间，需要回到大厅。
		private leaveRoomNotify(event:egret.Event){
			PokeMatchvsEngine.getInstance.leaveRoom("他们都不玩了，我也离开");
			DialogPage.ErrorPage("玩家"+event.data.userId+"离开房间，请返回到大厅...",()=>{
				
			},this);
		}

		public Release(){
			console.info("BattleStageControl Release ");
			//network.BattleMsg.getInstance() 是事件发送者，准备游戏发送回调
			network.BattleMsg.getInstance().removeEventListener(network.BattleMsgEvent.GAME_READY,this.GameReadyEventCall, this);

			//叫地主结束
			network.BattleMsg.getInstance().removeEventListener(network.BattleMsgEvent.CALL_LANDLORD_OVER,this.CallLandLordOver, this);

			//下一个叫地主
			network.BattleMsg.getInstance().removeEventListener(network.BattleMsgEvent.CALL_LANDLORD_NEXT,this.CallLandLordNext, this);

			//收到出牌消息
			network.BattleMsg.getInstance().removeEventListener(network.BattleMsgEvent.PLAYER_CARDS,this.PlayCards, this);

			//游戏结束
			network.BattleMsg.getInstance().removeEventListener(network.BattleMsgEvent.GAME_OVER,this.GameOver, this);

			PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY,this.leaveRoomNotify,this);

			if(this._playerTimer){
				this._playerTimer.Release();
			}
			if(this._playerHeader_left){
				this._playerHeader_left.Release();
			}
			if(this._playerHeader_right){
				this._playerHeader_right.Release();
			}
			
		}
	}
}