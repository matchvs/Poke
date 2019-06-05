class Login extends BaseScene {
	private that: any = this;

	public constructor() {
		super();

	}
	
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			if (partName == "btn_login") {
				if (MatchvsData.loginStatus) {
					MatchvsData.loginStatus = false;
					SceneManager.showScene(Game);
				} else {
					Toast.show("登录失败，重试中");
					console.log("重新登录",GlobalData.myUser.userID+"/n"+GlobalData.myUser.token);
					PokeMatchvsEngine.getInstance.init(MatchvsData.pChannel,MatchvsData.pPlatform,MatchvsData.gameID);
				}
			} else if (partName == "rank_list") {
				SceneManager.showScene(RankList);
			}

		}, this);
		network.NetworkStateCheck.getInstance().RegistNetListen(this);
	}



	protected childrenCreated(): void {
		super.childrenCreated();
	}

}