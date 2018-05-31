class RankListItem extends eui.ItemRenderer {


	private rankings = [];

	public constructor() {
		super();
	}



	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
		// if(partName == "ranking") {
		// 	egret.log(this.data) ;
		// 	if(this.data != null) {
		// 		instance.source = this.data.ranking;
		// 	}
		// }
	}

	protected createChildren():void {
		super.createChildren();
	}

	protected dataChanged():void {
		super.dataChanged();
	}


}