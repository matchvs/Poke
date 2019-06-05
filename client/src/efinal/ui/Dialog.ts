class Dialog extends eui.Component implements eui.UIComponent {
	public OK: eui.Button;
	public Cancle: eui.Button;
	public title: eui.Label;
	public message: eui.Label;
	public img: eui.Image;


	public constructor() {
		super();

	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		console.log('[INFO] partAdded');


	}

	protected childrenCreated(): void {
		super.childrenCreated();
		console.log('[INFO] childrenCreated');
	}
	public show(context: egret.DisplayObjectContainer, message: string, OKListener?: Function, title?: string, cancleListener?: Function) {
		context.addChild(this);
		message && (this.message.text = message);
		title && (this.title.text = title);
		this.setOKListener(OKListener);
		this.setCancleListener(cancleListener);
		return this;

	}
	public hide() {
		this.parent && this.parent.removeChild(this);
	}
	public setOKListener(cb) {
		this.OK.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			this.hide();
			return cb&&cb();
		}.bind(this), this.OK);
	}
	public setCancleListener(cb) {
		this.Cancle.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			this.hide();
			return cb&&cb();
		}.bind(this), this.OK);
	}
}