class Game extends eui.Component implements eui.UIComponent {

	private userPlayer = [];
	private roomName = "我是世界第一，你是谁？";
	private roomPropety = "谁都可以来挑战我";
	private matchDialog:MatchDialog = null;
	private isInvite = false; //是否是邀请

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		//昵称
		if(partName == "nickName") {
			instance.text = GlobalData.myUser.nickName;
		}
		//积分
		if(partName == "integral") {
			instance.text = GlobalData.myUser.pointValue;
		}
		//头像
		if(partName == "head") {
			instance.source = GlobalData.myUser.avator;
		}
		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			//快速匹配
			if (partName == "fastMatch") {
				//设置游戏模式为随机模式
				MatchvsData.gameMode = false;
				PokeMatchvsEngine.getInstance().joinRandomRoom(MatchvsData.getDefaultUserProfile());
				this.matchDialog = SceneManager.showScene(MatchDialog);
			} else if (partName == "createRoom") {
				//设置游戏模式为好友开心模式
				MatchvsData.gameMode = true;
				PokeMatchvsEngine.getInstance().creatRoom(this.roomName,this.roomPropety,MatchvsData.maxPlayer,MatchvsData.getDefaultUserProfile());
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_CREATE_ROOM,this.onEvent,this);
			} else if (partName == "inviteFriends") {
				//todo 直接邀请
				MatchvsData.gameMode = true;
				this.isInvite = true; //进入房间直接邀请
				PokeMatchvsEngine.getInstance().creatRoom(this.roomName,this.roomPropety,MatchvsData.maxPlayer,MatchvsData.getDefaultUserProfile());
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_CREATE_ROOM,this.onEvent,this);
			}

		}, this);
	}

	
	/**
	 * 接收Event信息
	 */
	 public onEvent(e:egret.Event):void {
		 switch (e.type) {
			 case MatchvsMessage.MATCHVS_CREATE_ROOM:
			 	egret.log("接收到创建房间成功的消息");
				this.startRoomScene(e.data.roomID);
			 break;
			 
		 }
	 }

	 /**
	  * 移除监听
	  */
	 public removeEvent() {
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_CREATE_ROOM,this.onEvent,this);
	 }



	/**
	 * 跳转到房间页面
	 */
	private startRoomScene(roomID:string) {
		var obj = {roomID: "", gameMode:MatchvsData.gameMode,isInvite:this.isInvite,isRestart:false};
		obj.roomID = roomID;
		this.removeEvent();
		SceneManager.showScene(Room,obj);
		this.isInvite = false;
	}



	protected childrenCreated(): void {
		super.childrenCreated();
	}

}