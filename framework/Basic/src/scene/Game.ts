class Game extends eui.Component implements eui.UIComponent {

	private userPlayer = [];
	private roomName = "我是世界第一，你是谁？";
	private roomPropety = "谁都可以来挑战我";
	private matchDialog:MatchDialog = null;
	private isInvite = false;

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
				PokeMatchvsEngine.getInstance().joinRandomRoom(MatchvsData.getDefaultUserProfile());
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY,this.onEvent,this);
				this.matchDialog = new MatchDialog();
				SceneManager.showScene(this.matchDialog);
			} else if (partName == "createRoom") {
				PokeMatchvsEngine.getInstance().creatRoom(this.roomName,this.roomPropety,MatchvsData.maxPlayer,MatchvsData.getDefaultUserProfile());
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_CREATE_ROOM,this.onEvent,this);
			} else if (partName == "inviteFriends") {
				//todo 直接邀请
				MatchvsData.gameMode = true;
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
			 case MatchvsMessage.MATCHVS_JOINROOM_RSP:
			 	this.userPlayer.push(GlobalData.myUser);
				for(var i = 0; i < e.data.length; i++) {
					var user:GUser = new GUser;
					var arr = e.data[i].userProfile.split("/n");
					user.nickName =arr[0];
					user.avator = arr[1];
					user.pointValue = arr[2];
					user.userID = e.data[i].userId;
					this.userPlayer.push(user);
				}
				egret.log("userPlayer的长度"+this.userPlayer.length);
				if(this.userPlayer.length  == MatchvsData.maxPlayer) {
					this.startBattle();
				}
			 break;
			 case MatchvsMessage.MATCHVS_JOINROOM_NOTIFY:
				var user:GUser = new GUser;
				var arr = e.data.userProfile.split("/n");
				user.nickName =arr[0];
				user.avator = arr[1];
				user.pointValue = arr[2];
				user.userID = e.data.userId;
				this.userPlayer.push(user);
				egret.log("NOTIFYuserPlayer的长度"+this.userPlayer.length);
				if( this.userPlayer.length  == MatchvsData.maxPlayer) {
					this.startBattle();	
				}
			 break;
			 case MatchvsMessage.MATCHVS_CREATE_ROOM:
			 	egret.log("接收到创建房间成功的消息");
				this.startRoomScene(e.data.roomID);
			 break;
		 }
	 }



	 /**
	  * 跳转游戏页面
	  */
	private startBattle(){
		var battles = new BattleStageUI();
		this.matchDialog.stopTimer();
		SceneManager.showScene(battles);
		battles.init();
		battles.StartBattle(this.userPlayer);
		
	}

	/**
	 * 跳转到房间页面
	 */
	private startRoomScene(roomID:string) {
		let room = new Room();
		room.init(roomID,this.isInvite);
		this.isInvite = false;
		SceneManager.showScene(room);
	}

	/**
	 * 踢人
	 */
	private kickPlayer(userID:number) {
		PokeMatchvsEngine.getInstance().kickPlayer(userID);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

}