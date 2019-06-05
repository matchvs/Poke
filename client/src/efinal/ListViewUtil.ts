class ListViewUtil {
	/**
	 * 初始化 List 
	 * eg:
	 * 		ListViewUtil.initListView(this.l_list,[1,23,4,5,1,23,1,1], (e: eui.ItemTapEvent) => {
			Toast.show("on item click	" + e.itemIndex);
		})
	 */
	public static initListView(conatiner:egret.DisplayObjectContainer,listview: eui.List, sourceArr: any[], onItemClick?:Function) {
		//用ArrayCollection包装
		var myCollection: eui.ArrayCollection = new eui.ArrayCollection(sourceArr);
		listview.dataProvider = myCollection;
		listview.useVirtualLayout = true;
		listview.itemRenderer = ListViewImageItem;
		//设置listview容器本身不可点击
		listview.touchEnabled = false;
		// //创建一个 Scroller
		var scroller = new eui.Scroller();
		scroller.height = listview.height;
		scroller.width = listview.width;
		scroller.viewport = listview;
		scroller.x = listview.x;
		scroller.y = listview.y
		
		scroller.name = "scroller";
		conatiner.addChild(scroller);
		onItemClick&&listview.addEventListener(eui.ItemTapEvent.ITEM_TAP, onItemClick, listview);
	}
	public static refreshData(listView: any, newDataList: Array<any>) {
		(<eui.ArrayCollection>listView.dataProvider).source = newDataList;
		(<eui.ArrayCollection>listView.dataProvider).refresh();
	}
	/**
	 * 
	 * ListViewUtil.setOnItemClick(this.l_list,(e: eui.ItemTapEvent) => {
			Toast.show("on item click	" + e.itemIndex);
		})
	 * 
	 */
	public static setOnItemClick(listview: eui.List,onItemClick?:Function){
		onItemClick&&listview.addEventListener(eui.ItemTapEvent.ITEM_TAP, onItemClick, listview);
	}
}