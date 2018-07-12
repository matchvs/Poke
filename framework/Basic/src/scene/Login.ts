class Login extends eui.Component implements eui.UIComponent {
	private that: any = this;

	public constructor() {
		super();
		Toast.initRes(this, "resource/loading/toast-bg.png");

	}
	// public tweenGroup: egret.tween.TweenGroup;
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			// Toast.show("click:" + partName);
			if (partName == "btn_login") {
				// Toast.show("ceshi");
				if (MatchvsData.loginStatus) {
					MatchvsData.loginStatus = false;
					var gameLayer = new Game();
					this.addChild(gameLayer);
				} else {
					Toast.show("登录失败，重试中");
					egret.log("重新登录",GlobalData.myUser.userID+"/n"+GlobalData.myUser.token);
					PokeMatchvsEngine.getInstance.init(MatchvsData.pChannel,MatchvsData.pPlatform,MatchvsData.gameID);
				}
			} else if (partName == "rank_list") {
				var rankList = new RankList();
				this.addChild(rankList);
			}

		}, this);
		network.NetworkStateCheck.getInstance().RegistNetListen(this);
	}



	protected childrenCreated(): void {
		super.childrenCreated();
		// this.that.btnAnim.play();
	}

}