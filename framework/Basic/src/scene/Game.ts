class Game extends eui.Component implements eui.UIComponent {



	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		
		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			//快速匹配
			if (partName == "fastMatch") {
				PokeMatchvsEngine.getInstance().joinRandomRoom();
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY,this.onEvent,this);
			} else if (partName == "bg") {
				SceneManager.showScene(new Game());
			}

		}, this);
	}

	private userPlayer = [];
	
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
	}

}