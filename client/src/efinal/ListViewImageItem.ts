class ListViewImageItem extends eui.ItemRenderer {
	public constructor() {
		super();
		//自定义的 ItemRenderer
		this.touchChildren = true;
	}
	protected labelDisplay: eui.Label;
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);

		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.Event) {

			instance.name = partName;
			if (partName === "" || (instance.touchEnabled === false)) {
			} else {
				instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
					return this.onItemClick(partName, instance);
				}, this);
			}
		}, this);
		console.log('[INFO] partName' + partName);

	}
	protected childrenCreated(): void {
		super.childrenCreated();
		console.log('[INFO] childrenCreated');
		this.selected = true;
	}
	protected dataChanged(): void {

		// console.log('[List DataChanged] : ' + this.data);
	}
	protected onItemClick(viewName: string, view: any): void {
		console.log('[List OnItemClick] : ' + this.itemIndex + " ->" + viewName);

	}

}