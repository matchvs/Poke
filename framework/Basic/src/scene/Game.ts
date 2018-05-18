class Game extends eui.Component implements eui.UIComponent {

	private userPlayer = [];
	
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		//昵称
		if(partName == "nickName") {
			instance.text = PokeMatchvsRep.getInstance._myUser.nickName;
		}
		//积分
		if(partName == "integral") {
			instance.text = PokeMatchvsRep.getInstance._myUser.pointValue;
		}
		//头像
		if(partName == "head") {
			instance.source = PokeMatchvsRep.getInstance._myUser.avator;
		}
		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			//快速匹配
			if (partName == "fastMatch") {
				PokeMatchvsEngine.getInstance().joinRandomRoom();
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY,this.onEvent,this);
				let matchDialog = new MatchDialog();
				SceneManager.showScene(matchDialog);
			} else if (partName == "bg") {
				SceneManager.showScene(new Game());
			}

		}, this);
	}

	
	/**
	 * 接收时间
	 */
	 public onEvent(e:egret.Event):void {
		 switch (e.type) {
			 case MatchvsMessage.MATCHVS_JOINROOM_RSP:
				if( e.data.length  == MatchvsData.maxPlayer) {
					this.userPlayer = e.data;
					this.startBattle();
				}
			 break;
			 case MatchvsMessage.MATCHVS_JOINROOM_NOTIFY:
				this.userPlayer.push(e.data);
				if( e.data.length  == MatchvsData.maxPlayer) {
					this.startBattle();	
				}
			 break;
		 }
	 }



	 /**
	  * 跳转游戏页面
	  */
	private startBattle(){
		var login = new BattleStageUI();
		this.addChild(login);
		login.init();
		login.StartBattle(this.userPlayer);
	}



	protected childrenCreated(): void {
		super.childrenCreated();
		parseInt
	}

}