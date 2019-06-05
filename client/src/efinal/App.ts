class App {
	public static W: number = 1270;
	public static H: number = 720;
	public static IS_DEGUG: boolean = true;
	public constructor() {
	}

	public static init(container: egret.DisplayObjectContainer): void {
		Toast.initRes(container, "resource/efinal/loading/toast-bg.png");
		var rootView = new egret.Sprite();
		rootView.width = container.stage.stageWidth;
		rootView.height = container.stage.stageHeight;
		App.W = container.stage.stageWidth;
		App.H = container.stage.stageHeight;
		rootView.x = 0;
		rootView.y = 0;
		container.addChild(rootView);
		SceneManager.init(rootView);
		App.IS_DEGUG&&UI.buildEgretLogger(container);

	}
}