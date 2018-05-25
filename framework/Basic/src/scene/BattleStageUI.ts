class BattleStageUI extends eui.Component implements eui.UIComponent{


	private _topHeader:TopHeader = null;//顶部用户自己的头像和积分位置
	
	private _battleControl: battle.BattleStageControl = null; //对战控制

	public _playerHeadSprite:egret.Sprite = null; //对手头像和卡牌放置地方
	public _playerTimerSprite:egret.Sprite = null;

	public _myCardSprote:egret.Sprite = null;	//我的卡牌放置容器
	private _myCardControl:battle.MyCardControl = null; //我的卡牌控制

	private _sendCardAnimal:battle.SendCardAnimal = null; //发牌动画控制类型
	public _sendCardSprote:egret.Sprite = null; 		  //发牌时的容器

	public _tablecardControl:battle.TableCardControl = null; //new battle.TableCardControl();  	//桌子牌控制
	public _tableCardSprite:egret.Sprite = null;


	private _battleButtonCtl:battle.BattleBtnControl = null;
	private _battleButtonSprote:egret.Sprite = null;

	private _chatMsgProxy:battle.ChatMsgControl = null;
	private _chatSprite:egret.Sprite = null;


	
	public constructor() {
		super();
		
	}
	/**
	 * 获取exml 中的控件
	 */
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		console.log("partAdded",partName,instance);
		if(partName == "topHeader"){
			this._topHeader = instance;
		}
	}


	/**
	 * 添加几个假的用户
	 */
	public explameAddPlayer(){
		// GlobalData.myUser = new GUser();
		// GlobalData.myUser.avator = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526393669326&di=835161a2290b3b6ae1740bd39eb52f3e&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201609%2F16%2F20160916214658_UcHjJ.jpeg";
		// GlobalData.myUser.nickName = "vv";
		// GlobalData.myUser.userID = 85642;
		// GlobalData.myUser.pointValue = 12535;
	}

	/**
	 * 显示顶部的用户信息
	 */
	public showTopUserInfo(user ?:GUser){
		if(user){
			this._topHeader.init();
			this._topHeader.ShowAvator(user.avator);
			this._topHeader.SetNickName(user.nickName);
			this._topHeader.SetPointValue(user.pointValue);
		}
	}

	public init(){
		this.explameAddPlayer();
		console.info("BattleStageUI init");
		//显示用户头像
		this.showTopUserInfo(GlobalData.myUser);

		
		//我的卡牌放置容器
		this._myCardSprote = new egret.Sprite();
		this.addChild(this._myCardSprote);
		this._myCardControl = new battle.MyCardControl();
		this._myCardControl.Init(this._myCardSprote);

		//发牌容器
		this._sendCardSprote = new egret.Sprite();
		this.addChild(this._sendCardSprote);
		this._sendCardSprote.touchChildren = false;
		this._sendCardSprote.touchEnabled = false;

		// 发牌动画类
		this._sendCardAnimal = new battle.SendCardAnimal();
		this._sendCardAnimal.Init(this._sendCardSprote);

		//对手头像
		this._playerHeadSprite = new egret.Sprite();
		this.addChild(this._playerHeadSprite);

		//倒计时
		this._playerTimerSprite = new egret.Sprite();
		this.addChild(this._playerTimerSprite);
		

		//桌子出牌控制
		this._tablecardControl = new battle.TableCardControl();
		this._tableCardSprite = new egret.Sprite();
		this.addChild(this._tableCardSprite);
		this._tablecardControl.Init(this._tableCardSprite);

		//按钮控制
		this._battleButtonCtl = new battle.BattleBtnControl;
		this._battleButtonSprote = new egret.Sprite();
		this.addChild(this._battleButtonSprote);
		this._battleButtonCtl.Init(this._battleButtonSprote);

		this._chatSprite = new egret.Sprite();
		this.addChild(this._chatSprite);
		this._chatSprite.touchChildren = false;
		this._chatSprite.touchEnabled = false;
		this._chatMsgProxy = new battle.ChatMsgControl();
		this._chatMsgProxy.Init(this._chatSprite);
		
		// 控制对战舞台类
		this._battleControl = new battle.BattleStageControl(this);
		
	}

	/**
	 * 开始对战，要先添加用户
	 */
	public StartBattle(users:Array<GUser>){
		this.addPlayers(users);

		this._battleButtonCtl.RoomIn();
		this._battleControl.Release();
		this._battleControl.init();
		this._battleControl.startGame();
	}

	//添加用户
	private addPlayers(users:Array<GUser>){
		console.info("addPlayers",users)
		for(let i = 0; i < users.length; i++){
			this._battleControl.addPlayer(users[i]);
		}
	}

	/**
	 * 发牌动画
	 */
	public SendCard(player:battle.Player):void{

		this._battleButtonCtl.HideAll();

		this._sendCardAnimal.StartAnimal(player, function (): void {
			// 其他隐藏,除自己的
			//全部隐藏起来等待服务器下发叫地主通知
			// if (this._battleButtonCtl.State != battle.BattleBtnControl.STATE_Qiangdizhu && this._btnProxy.State != battle.BattleBtnControl.STATE_Playing) {
			//     this._battleButtonCtl.HideAll();
			// }
        }, this);
	}

	/**
	 * 显示叫地主
	 */
	public ShowCallLand(player:battle.Player, isme: boolean, nowscore: number, delaytime: number){
		if (isme) {
			this._battleButtonCtl.CallLandOwner(nowscore);
		}
		else {
			this._battleButtonCtl.HideAll();
		}
		//this._battleControl.SetPlayerTime(player, delaytime);
        this._battleControl.UpdateAllCardNum();
	}

	/**
	 * 结束叫地主，显示按钮和牌
	 * @param {battle.Player} landplayer
	 * @param {Array<number>} landlist
	 * @param {battle.Player} mainplayer
	 * @param {string} landscore
	 * 
	 */
	public OverCallLand(landplayer: battle.Player, landlist: Array<number>, mainplayer: battle.Player, landscore: string){
		//显示底牌
		this._tablecardControl.ShowLandCard(landlist);
		//显示地主标志
		this._battleControl.SetPlayerLandFlag(landplayer.LocalTableId);
		//如果我自己是地主就显示我自己的地主标志
		this._myCardControl.SetPlayerLandFlag(landplayer.LocalTableId);
		//出牌动画重置
		this._sendCardAnimal.Release(landplayer.LocalTableId);
		//设置我的牌区域
		this._myCardControl.SetMainPlayer(mainplayer);
		//对战控制
		this._battleButtonCtl.SetCardProxy(this._myCardControl);
		//设置出牌按钮控制
		this._myCardControl.SetButtonCtl(this._battleButtonCtl);
		
		// TODO
		//设置倍数 todo
	}

	//轮流出牌
	public TurnPlayCard(player:battle.Player, isme: boolean, isnew: boolean, tablelist: Array<number>, delaytime: number, canshowAll: boolean, lastplayer:battle.Player =null){
	
		if (isnew) {
			this._sendCardAnimal.Release(0);
			this._tablecardControl.clearAll();
			this._myCardControl.SetTableList([]);
			if (lastplayer) {
				this._tablecardControl.ShowTableCard(lastplayer.LocalTableId, null);
			}
        }

		if (isme) {
			this._myCardControl.SetTableList(tablelist);
			if (lastplayer) {
				this._tablecardControl.ShowTableCard(lastplayer.LocalTableId, tablelist);
			}
			this._myCardControl.CanShowAll = canshowAll;
			var hascar: boolean = true;
			this._battleButtonCtl.Playing(isnew);
			this._myCardControl.SetBtnVisible();
			if (player.cardNumber == 1 && player.cardNumber < tablelist.length)//自己单牌,别人打多张,没有牌直接过
			{
				network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.PLAY_CARDS_S, { cardlist: [] });
				this._battleButtonCtl.HideAll();
				return;
			}
		}
		else {
			this._battleButtonCtl.HideAll();
		}
		this._battleControl.SetPlayerTime(player, delaytime);
		this._battleControl.UpdateAllCardNum();
	}

	/**
	 *  有玩家出牌后，更新桌面牌
	 */ 
	public ShowPlay(player: battle.Player, clist: Array<number>, isme: boolean, timestr: string){
		this._battleControl.UpdateAllCardNum();
		if (isme) {
            //如果出牌人是我，更新我的牌数量
            this._myCardControl.SendOver();
        }
		if (clist != null && clist.length > 0) {
			this._tablecardControl.ShowTableCard(player.LocalTableId, clist);
			this._myCardControl.SetTableList(clist);
		}else {
			this._tablecardControl.ShowTableCard(player.LocalTableId, clist);
			this._chatMsgProxy.ShowTableCard(player.LocalTableId, "不要");
		}
		//this._uiProxy.SetTimes(timestr);
		// var cld:gameLogic.CardListData = this._type.GetType(clist);
		// if (cld.Type == gameLogic.PlayCardTypes.Types_Bomb) {

        //         var eff: effect.BombEffect = MandPool.getIns(effect.BombEffect);
        //         eff.Init();
        //         this._effectSprite.addChild(eff);
        //         this._effectList.push(eff)
        //     }
        //     else if (cld.Type == gameLogic.PlayCardTypes.Types_ThreeN_Double ||
        //         cld.Type == gameLogic.PlayCardTypes.Types_ThreeN_Signal ||
        //         cld.Type == gameLogic.PlayCardTypes.Types_ThreeN) {

        //         var eff2: effect.PlaneEffect = MandPool.getIns(effect.PlaneEffect);
        //         eff2.Init();
        //         this._effectSprite.addChild(eff2);
        //         this._effectList.push(eff2)
        //     }
	}

	public GameOver(iswin: boolean, p1: battle.Player, p2: battle.Player, p3: battle.Player,
            islandwin: boolean, timestr: number, isactover: boolean, actrank: number, actHScore: number, actmoney: number, winplayer: battle.Player){
		this._battleButtonCtl.HideAll();

		if (p1) {
			this._tablecardControl.ShowTableCard(1, p1.cardList);
		}
		if (p2) {
			this._tablecardControl.ShowTableCard(2, p2.cardList);
		}
		if (p3) {
			this._tablecardControl.ShowTableCard(3, p3.cardList);
			this._myCardControl.Release();
		}

		// this.Release();
		// let result = new ResultUI();
		//SceneManager.back();
		//SceneManager.removeAll();
		var result:ResultUI = SceneManager.showScene(ResultUI);
		result.init();
		if(p1.isLandLord){
			result.showResult(p1,p2,p3,iswin,islandwin,timestr);
		}else if(p2.isLandLord){
			result.showResult(p2,p1,p3,iswin,islandwin,timestr);
		}else if(p3.isLandLord){
			result.showResult(p3,p1,p2,iswin,islandwin,timestr);
		}
	}

	public Release(){
		this.removeChildren();
		this._battleButtonCtl.Release();
		this._myCardControl.Release();
		this._tablecardControl.clearAll();
		this._battleControl.Release();
	}
}
