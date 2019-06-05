class RankList extends BaseScene {
	private rankList:eui.List;
	private http:MvsHttpApi = new MvsHttpApi();
	private userMap:{[key:number]:any} = [];
	private dsListHeros:Array<any> = [];
	// { ranking: "1", name: "乖宝宝", score: "10000" ,head:"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images2.jpg"}
            // , { ranking: "2", name: "小乖乖", score: "9852" ,head:"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images2.jpg"}
            // , { ranking: "3", name: "爱我不到黎明", score: "9583",head:"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images2.jpg"}
            // , { ranking: "4", name: "回头最寂寞", score: "6543",head: "http://alphazwimg.matchvs.com/egret/Three-Poker/img/images2.jpg"}
            // , { ranking: "5", name: "我怕来不及", score: "5684" ,head:"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images2.jpg"}
            // , { ranking: "6", name: "小甜蜜、幸福满溢", score: "5562",head: "http://alphazwimg.matchvs.com/egret/Three-Poker/img/images2.jpg"}
            // , { ranking: "7", name: "哼゜还不是你给宠坏的", score: "4523",head: "http://alphazwimg.matchvs.com/egret/Three-Poker/img/images2.jpg" }];
	

	public constructor() {
		super();
		var timestamp=new Date().getTime();
		// PokeMatchvsEngine.getInstance.getRankList(timestamp);
		// PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_RANK_LIST,this.onEvent,this);
		this.http.GetRankListData(this.RankListRsp.bind(this));
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
	/**
	 * 获取排行榜列表回调
	 */
	public RankListRsp(res, err){
		console.log("请求的数据为：",res);
		if(res && res.statusCode == 200){
			if(res.data == null){
				console.log("暂无排行数据");
				res.data = [];
			}
			let data:Array<any> = res.data;
			let userList:Array<any> = [];
			for(var i= 0; i < data.length; i++){
				let obj = {
					ranking: data[i].rank + "", 
					name: data[i].userID, 
					score: data[i].value ,
					head:"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images2.jpg"
				};
				this.dsListHeros.push(obj);
				userList.push(data[i].userID);
			}
			this.http.GetUserInfoList(userList,this.getUserInfoListRsp.bind(this));
		}else{
			console.log("请求错误：", err);
		}
	}

	private getUserInfoListRsp(resData, err){
		if(resData && resData.status == 0 && resData.data){
			let dataList:Array<any> = resData.data.dataList;
			// let user_map = this.userMap;
			this.dsListHeros.forEach( dt => {
				dataList.forEach( user=>{
					if(dt.name == user.key){
						let info = JSON.parse(ArrayTools.Base64Decode(user.value));
						dt.name = info.name;
						dt.head = info.avatar;
					}
				});
			} );

			this.rankList.dataProvider  = new eui.ArrayCollection(this.dsListHeros);
			this.rankList.itemRenderer = RankListItem;
		}
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
					// console.log("aaaaaaaaobj:",obj);
					this.dsListHeros.push(obj);
				}
				
				// this.rankList.dataProvider  = new eui.ArrayCollection(this.dsListHeros);
				// this.rankList.itemRenderer = RankListItem;
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