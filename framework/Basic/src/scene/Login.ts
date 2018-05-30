class Login extends Base implements eui.UIComponent {
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
					SceneManager.showScene(Game);
				} else {
					Toast.show("登录失败，重试中");
					egret.log("重新登录",GlobalData.myUser.userID+"/n"+GlobalData.myUser.token);
					PokeMatchvsEngine.getInstance().login(GlobalData.myUser.userID,GlobalData.myUser.token);
				}
			} else if (partName == "rank_list") {
				// var rankList = new RankList();
				SceneManager.showScene(RankList);
			}

		}, this);
		this.onError();
	}

	protected onError() {
		super.onError(this);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		// this.that.btnAnim.play();
	}

}