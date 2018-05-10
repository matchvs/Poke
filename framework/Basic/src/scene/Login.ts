class Login extends eui.Component implements eui.UIComponent {
	private that: any = this;
	public constructor() {
		super();
		Toast.initRes(this, "resource/loading/toast-bg.png");
		// this.skinName = skins.AnimationSkin;


	}
	// public tweenGroup: egret.tween.TweenGroup;
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			Toast.show("click:" + partName);
			if (partName == "play") {
				SceneManager.showScene(new Game());
			} else if (partName == "bg") {
				this.bgAnim.play();
			}

		}, this);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.that.btnAnim.play();
	}

}