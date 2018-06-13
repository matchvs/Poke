class RankList extends eui.Component implements  eui.UIComponent {
	private rankList:eui.List;
	private dsListHeros:Array<Object> = [];
            // { ranking: "1", nickName: "乖宝宝", score: "10000" ,head:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526552548316&di=e90e3532b6906f745c2006446bd4c216&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201501%2F14%2F20150114145326_sQPjW.jpeg"}
            // , { ranking: "2", nickName: "小乖乖", score: "9852" ,head:"https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1526543170&di=1f42a59764ace471c6d9ffc50d3315ac&src=http://p.3761.com/pic/81841417221689.jpg"}
            // , { ranking: "3", nickName: "爱我不到黎明", score: "9583",head:"https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1526543170&di=15a734dd177962fd4c3c3d45295314f8&src=http://img5.duitang.com/uploads/blog/201410/06/20141006162725_FTrrj.jpeg"}
            // , { ranking: "4", nickName: "回头最寂寞", score: "6543",head: "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1526543241&di=d3855933248104e0888253044491a25b&src=http://www.th7.cn/d/file/p/2016/12/06/410a028423831f08a3a0effd5d2e781a.jpg"}
            // , { ranking: "5", nickName: "我怕来不及", score: "5684" ,head:"https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1526543241&di=5fba65f1b8dc266ae84ef4572b78445f&src=http://www.ld12.com/upimg358/allimg/20160629/195257580739086.jpg"}
            // , { ranking: "6", nickName: "小甜蜜、幸福满溢", score: "5562",head: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526553605118&di=a69dcf9d481b834119bee994dabe261c&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2015-01-29%2F231109552.jpg"}
            // , { ranking: "7", nickName: "哼゜还不是你给宠坏的", score: "4523",head: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526553368958&di=e726e3dbbde97b31e512b507850a2851&imgtype=0&src=http%3A%2F%2Fcdnq.duitang.com%2Fuploads%2Fitem%2F201504%2F30%2F20150430125352_aeTLk.jpeg" }
	

	public constructor() {
		super();
		var timestamp=new Date().getTime();
		PokeMatchvsEngine.getInstance.getRankList(timestamp);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_RANK_LIST,this.onEvent,this);
	}

	protected partAdded(partName:string,instance:any):void{
		super.partAdded(partName,instance);
		if (partName == "listGoods") {
			this.rankList = instance;
			egret.log("拿到控件");
		}
		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			if (partName == "close") {
				SceneManager.back();
				PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_RANK_LIST,this.onEvent,this);
			}

		}, this);
	}


	protected childrenCreated():void {
		super.childrenCreated();

	}

	public onEvent(e:egret.Event):void {
		switch(e.type) {
			case MatchvsMessage.MATCHVS_RANK_LIST:
				let a = JSON.parse(e.data);
				for(var i= 0; i < a.length; i++) {
					var obj = {ranking: "", name: "", score: "" ,head:""};
					obj.ranking = (i+1)+"";
					if (a[i].name == "") {
						obj.name = a[i].key;
					} else {
						obj.name = a[i].name;
					}

					if (a[i].avator == "" ){
						obj.head = "http://alphazwimg.matchvs.com/egret/Three-Poker/img/images2.jpg";
					} else {
						obj.head = a[i].avator;
					}
					obj.score = a[i].value;
					this.dsListHeros.push(obj);
				}
				this.rankList.dataProvider  = new eui.ArrayCollection(this.dsListHeros);
				this.rankList.itemRenderer = RankListItem;
			break;
		}
	}


	 /**
	  * 移除监听
	  */
	 public removeEvent() {
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_RANK_LIST,this.onEvent,this);
	 }


	

	
}