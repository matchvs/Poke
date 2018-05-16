class Game extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		
		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			Toast.show("click:" + partName);
			if (partName == "back") {
				// SceneManager.back();
				instance.value = RES.getRes("button_up_png");
				// instance.touchEnabled =false;
				// instance.source = "button_up_png";
				Toast.show("ceshi");
			} else if (partName == "bg") {
				SceneManager.showScene(new Game());
			}

		}, this);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

}