module battle {
	export class BattleStageControl extends egret.EventDispatcher {

		private _stage:BattleStageUI = null;
		public _playerList = new Array<Player>(); //用户列表
    	public _cardControl = new CardControl();  //牌控制
		private _myOwner = new Player();
		private _landlordList = [];
		private _playerHeader_left:PlayerHead = null;		//上家
		private _playerHeader_right:PlayerHead = null;		//下家
    
		public constructor(stage:BattleStageUI) {
			super();
			this._stage = stage;
		}

		public init(){
			//添加监听消息
			this.BattleEventListen();
			//给一个假的发牌消息
			//this.explameAddPlayer();
			this._playerHeader_left = new battle.PlayerHead();//上家
			this._playerHeader_right = new battle.PlayerHead();//下家
		}

		public startGame(){
			this.sendReadMsg();//发送准备消息
		}

		//设置底牌
		set landLordList(arr:Array<number>){
			this._landlordList = arr;
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

			network.BattleMsg.getInstance().addEventListener(network.BattleMsgEvent.GAME_READY,this.GameReadyEventCall, this);
		}

		

		/**
		 * 准备游戏后, 收到发牌消息调用这个函数，给各个用户填写牌信息
		 */
		private GameReadyEventCall(event:egret.Event){
			this.removeEventListener(network.BattleMsgEvent.GAME_READY,this.GameReadyEventCall, this);
			console.info("GameReadyEventCall",event.data);
			let data = event.data;
			if(!data){
				return;
			}
			if("userCards" in data){
				let list = [];
				list = data.userCards;
				let TableId  = 1;
				let myUser = this._myOwner;
				//获取牌列表
				this._playerList.forEach((element)=>{
					for(let i = 0; i < list.length; i++){
						if(list[i].userID == element.userID){
							console.info(list[i].card);
							element.AddcardList = list[i].card;
							element.seatNo = i;
							element.IsReady = true;
						}
					}
					//分配上下家
					if(element.userID == myUser.userID){
						element.LocalTableId = 3;
					}else{
						element.LocalTableId = TableId++;
					}
					//显示用户头像
					this.SetPlayerHead(element,true);
				});
			}


			//用户列表安装 seatNo排序
			this._playerList.sort(function(a,b){
				return a.seatNo < b.seatNo ? 1:-1;
			});


			if("lanownList" in data){
				this._landlordList = data.lanownList;
			}

			this.SendCard();
			
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
                var ph: PlayerHead = (<PlayerHead>this["_playerHeader_" + localid]);
                if (ph) {
                    egret.Tween.removeTweens(ph);
                    var tx: number = ph.x;
                    var fx: number = 0;
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


	}
}