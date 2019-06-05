class Game extends BaseScene {

	private userPlayer = [];
	private roomName = "我是世界第一，你是谁？";
	private roomPropety = "谁都可以来挑战我";
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
				if(PokeMatchvsEngine.getInstance.joinRandomRoom(MatchvsData.getDefaultUserProfile()) != 0) {
					Toast.show("您随机匹配点击的太快了，请稍后");
					return;
				}
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
			} else if (partName == "createRoom") {
				//设置游戏模式为好友开心模式
				MatchvsData.gameMode = true;
				if(PokeMatchvsEngine.getInstance.creatRoom(this.roomName,this.roomPropety,MatchvsData.maxPlayer,MatchvsData.getDefaultUserProfile())) {
					Toast.show("创建房间太快了，我已经跟不上了");
				}
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_CREATE_ROOM,this.onEvent,this);
			} else if (partName == "inviteFriends") {
				//todo 直接邀请
				MatchvsData.gameMode = true;
				this.isInvite = true; //进入房间直接邀请
				if(PokeMatchvsEngine.getInstance.creatRoom(this.roomName,this.roomPropety,MatchvsData.maxPlayer,MatchvsData.getDefaultUserProfile())) {
					Toast.show("创建房间太快了，我已经跟不上了");
				}
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_CREATE_ROOM,this.onEvent,this);
			}

		}, this);
		network.NetworkStateCheck.getInstance().RegistNetListen(this);
	}

	
	/**
	 * 接收Event信息
	 */
	 public onEvent(e:egret.Event):void {
		 switch (e.type) {
			 case MatchvsMessage.MATCHVS_CREATE_ROOM:
				if (e.data.status == 200) {
			 		console.log("接收到创建房间成功的消息");
					network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.GAME_IS_OKS, {});
					this.startRoomScene(e.data.roomID);
        		} else {
					Toast.show("创建房间失败了");
        		}
			 break;
			 case MatchvsMessage.MATCHVS_JOINROOM_RSP:
				this.removeEvent();
				SceneManager.showScene(MatchDialog,e.data.roomID);
			 break;
		 }
	 }

	 /**
	  * 移除监听
	  */
	 public removeEvent() {
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_CREATE_ROOM,this.onEvent,this);
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
	 }

	 public Release(){
		 this.removeEvent();
	 }





	/**
	 * 跳转到房间页面
	 */
	private startRoomScene(roomID:string) {
		var obj = {roomID: roomID, gameMode:MatchvsData.gameMode,isInvite:this.isInvite,isRestart:true};
		this.removeEvent();
		SceneManager.showScene(Room,obj);
		this.isInvite = false;
	}



	protected childrenCreated(): void {
		super.childrenCreated();
		// console.log("Game","childrenCreated");
	}

}