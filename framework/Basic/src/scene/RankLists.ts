class RankLists extends eui.Component implements  eui.UIComponent {

	private rankList:eui.List;

	private dsListHeros:Array<Object> = [
            { ranking: "1", nickName: "魔法石", score: "法力加成 +3" }
            , { ranking: "2", nickName: "诅咒娃娃", score: "咒术加成 +3" }
            , { ranking: "3", nickName: "万圣戒指", score: "敏捷加成 +3" }
            , { ranking: "4", nickName: "斗篷", score: "耐力加成 +3" }
            , { ranking: "5", nickName: "鹅毛笔", score: "精神加成 +3" }
            , { ranking: "6", nickName: "血滴子", score: "嗜血加成 +3" }
            , { ranking: "7", nickName: "屠龙刀", score: "力量加成 +5" }
        ];


	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
		if(partName == "rank_list") {
			this.rankList = instance;
		}

	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.rankList.dataProvider  = new eui.ArrayCollection(this.dsListHeros);
		this.rankList.itemRenderer = RankListItem;
	}
	
}

class RankListItem extends eui.ItemRenderer {

	public constructor() {
		super();
	}


	protected createChildren():void {
		super.createChildren();
	}

	protected dataChanged():void {

	}


}