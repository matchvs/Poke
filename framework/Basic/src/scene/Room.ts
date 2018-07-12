class Room extends eui.Component implements  eui.UIComponent {

	public roomID:string = "";
	private countDownLabel:eui.Label = null;
	private userPlayer = [];
	private timer:egret.Timer; //游戏开始倒数10秒定时器
	private countDownTimer:number = 0;  //倒计时时间
	private icon_one:eui.Image = null;
	private name_one:eui.Label = null;
	private icon_two:eui.Image = null;
	private name_two:eui.Label = null;
	private action:eui.Rect = null;
	private action1:eui.Rect = null;
	private actionText:eui.Label = null;
	private actionText1:eui.Label = null;
	private nickName:eui.Label = null;
	private integral:eui.Label = null;
	private head:eui.Image = null;
	private roomID_tabel:eui.Label = null;
	private my_icon:eui.Image = null;
	private my_name:eui.Label = null;
	private nameViewList = [];
	private iconViewList = [];
	private actionViewList = [];
	private actionTextViewList = [];
	private beKickedOutName = "";

	public constructor() {
		super();

	}

	public onShow(obj) {
		if (this.nickName != null) {
			this.showName();
		}
		console.log("Room","onShow");
		MatchvsData.loginStatus = false;
		this.userPlayer.length = 0;
		this.roomID = obj.roomID;
		this.initEvent();
		if(obj.isInvite) {
			if(MatchvsData.gameMode) {
				try {
					var par = "roomID="+this.roomID;
					together("邀请好友",par);
				} catch (e) {
					console.warn(e,e.message)
					// PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM,this.onEvent,this);
					// PokeMatchvsEngine.getInstance.leaveRoom("");
					// return;
				}
			}
		}

		if (obj.isRestart) {
			this.restart(this.roomID);
		}
	}
	

	public showName() {
		console.log('Room','showName');
		this.nickName.text =  GlobalData.myUser.nickName;
		this.integral.text = GlobalData.myUser.pointValue+"";
		this.head.source = GlobalData.myUser.avator;
		this.roomID_tabel.text = "房间号："+this.roomID;
		this.my_icon.source = GlobalData.myUser.avator;
		this.my_name.text = GlobalData.myUser.nickName;
	}


	protected childrenCreated():void {
		super.childrenCreated();
		console.log("Room","childrenCreated");
	}

	/**
	 * 重新进入房间
	 */
	public restart(roomID:string) {
		PokeMatchvsEngine.getInstance.getRoomDetail(roomID);
		network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.GAME_IS_OKS, {});
	}

	public initEvent() {
		network.NetworkStateCheck.getInstance().RegistNetListen(this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_ROOM_DETAIL_RSP,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_KICK_PLAYER_NOTIFY,this.onEvent,this);
		network.BattleMsg.getInstance().addEventListener(network.BattleMsgEvent.GAME_IS_OK,this.onEvent, this);
	}

		
	

	protected partAdded(partName:string,instance:any):void { 
		super.partAdded(partName,instance);
		switch(partName) {
			case "nickName":
			 	this.nickName = instance;
				instance.text = GlobalData.myUser.nickName;
				break;
			case "integral":
				this.integral = instance;
				instance.text = GlobalData.myUser.pointValue;
				break;
			case "head":
				this.head = instance;
				instance.source = GlobalData.myUser.avator;
				break;
			case "roomID_tabel":
				this.roomID_tabel = instance;
				instance.text = "房间号："+this.roomID;
			break;
			case "my_icon":
				this.my_icon = instance;
				instance.source = GlobalData.myUser.avator;
			break;
			case "my_name":
				this.my_name = instance;
				instance.text = GlobalData.myUser.nickName;
			break;
			case "countdown":
				this.countDownLabel = instance;
			break;
			case "icon_one":
				this.icon_one = instance;
			break;
			case "name_one":
				this.name_one = instance;
			break;
			case "icon_two":
				this.icon_two = instance;
			break;
			case "name_two":
				this.name_two = instance;
			break;
			case "action":
				this.action = instance;
			break;
			case "action1":
				this.action1 = instance;
			break;
			case "action_text":
				this.actionText = instance;
			break;
			case "action_text_one":
				this.actionText1 = instance;
			break;
			
		}

		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			if(partName == "btn_leave_room") {
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM,this.onEvent,this);
				PokeMatchvsEngine.getInstance.leaveRoom(MatchvsData.getDefaultUserProfile());
			}
			//踢人或者邀请
			if(partName == "action") {
				this.userAction(this.name_one);
			}
			if (partName == "action1") {
				this.userAction(this.name_two);
			}
			if(partName == "action_text") {
				this.userAction(this.name_one);
			}
			if (partName == "action_text_one") {
				this.userAction(this.name_two);
			}

		}, this);
	}




	/**
	 * 接收消息
	 */
	protected onEvent(e:egret.Event) {
		switch(e.type) {
			//有人进来就通知
			case MatchvsMessage.MATCHVS_JOINROOM_NOTIFY:
				var user:GUser = new GUser;
				var arr = JSON.parse(e.data.userProfile);
				user.nickName =arr.nickName;
				user.avator = arr.avator;
				user.pointValue = arr.pointValue;
				user.userID = e.data.userId;
				this.userPlayer.push(user);
				//房间内人数到达三个 就启动定时器;
				this.initView(this.userPlayer);
			break;
			//自己加入房间的通知
			case MatchvsMessage.MATCHVS_JOINROOM_RSP:
				egret.log("我进入房间了",e.data);
			break;
			case MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY:
				//获取数组下标，删除离开玩家的指定的下标，将定时器重置，倒计时也需要重置
				this.removeView(e.data);
				if(e.data.owner !== GlobalData.myUser.userID) {
					this.isOwnew(false);
				} else {
					this.isOwnew(true);
				}
			break;
			case MatchvsMessage.MATCHVS_LEVAE_ROOM:
				//自己离开了房间，将定时器关闭
				if (this.timer != null) {
					this.timer.stop();
				}
				this.userPlayer.length = 0;
				this.removeEvent();
				SceneManager.back();
			break;
			case MatchvsMessage.MATCHVS_KICK_PLAYER_NOTIFY:
				this.removeView(e.data);
				if(e.data.owner !== GlobalData.myUser.userID) {
					this.isOwnew(false);
				} else {
					this.isOwnew(true);
				}
			break;
			case MatchvsMessage.MATCHVS_KICK_PLAYER:
				this.removeView(e.data);
			break;
			case MatchvsMessage.MATCHVS_ROOM_DETAIL_RSP:
				this.userPlayer = [];
				this.addUser(e.data.userInfos);
				if(e.data.owner !== GlobalData.myUser.userID) {
					this.isOwnew(false);
				} else {
					this.isOwnew(true);
				}
			break;
			case network.BattleMsgEvent.GAME_IS_OK:
				console.log("gameServer 通知倒计时开始");
				this.createTimer();
			break;
		}
	}	


	/**
     * 在这里移除所有的监听
     */
    public removeEvent() {
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_ROOM_DETAIL_RSP,this.onEvent,this);
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY,this.onEvent,this);
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY,this.onEvent,this);
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM,this.onEvent,this);
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_KICK_PLAYER_NOTIFY,this.onEvent,this);
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_KICK_PLAYER,this.onEvent,this);
		network.BattleMsg.getInstance().removeEventListener(network.BattleMsgEvent.GAME_IS_OK,this.onEvent, this);
    }


	public Release (){
		this.removeEvent();
		if (this.timer != undefined) {
			this.timer.stop();
		}
	}

	/**
	 * 显示其他玩家的基本信息
	 */
	private initView(userPlayer:any) {
		egret.log("展示其他玩家信息");
		this.nameViewList = [this.name_one,this.name_two];
		this.iconViewList = [this.icon_one,this.icon_two];
		this.actionViewList = [this.action,this.action1];
		this.actionTextViewList = [this.actionText,this.actionText1];
		for(var i =0; i < this.userPlayer.length;i++) {
			if(this.nameViewList[i].text == "") {
				this.nameViewList[i].text = userPlayer[i].nickName;
				this.iconViewList[i].source = userPlayer[i].avator;
				this.actionViewList[i].strokeColor = "11169372"
				this.actionTextViewList[i].text = "踢人";
				this.actionTextViewList[i].textColor = "11169372";
			}
		}
	}


	/**
	 * 玩家退出将玩家的信息从页面上消失
	 */
	private removeView(data:any) {
		var id;
		if (data.userId === undefined) {
			id = data.userID;
		} else {
			id = data.userId;
		}
		if (this.timer != null) {
			this.timer.stop();
		}
		for(var a = 0; a < this.userPlayer.length;a++ ) {
			if(id == this.userPlayer[a].userID) {
				this.userPlayer.splice(a,1);
			}
		}
		if(id === GlobalData.myUser.userID) {
			this.countDownLabel.text = "";
			this.countDownTimer = 0;
			this.removeEvent();
			SceneManager.showScene(Game);
		}
		var name;
		if (this.beKickedOutName == "") {
			var arr = JSON.parse(data.cpProto);
			name = arr.nickName;
		} else {
			name = this.beKickedOutName;
		}
		for(var i = 0; i < this.nameViewList.length; i++) {
			if(name== this.nameViewList[i].text) {
				this.nameViewList[i].text = "";
				this.iconViewList[i].source = "";
				this.actionViewList[i].strokeColor = "15445580"
				this.actionTextViewList[i].text = "邀请";
				this.actionTextViewList[i].textColor = "15445580";
				//11169372
				this.beKickedOutName = "";
				return;
			}
		}
	}

	/**
	 * 用户操作，踢人或者邀请
	 */
	public userAction(instance:any) {
		var name = instance.text;
		console.log("正在操作名字为"+name+"玩家")
		if(name != "" && name != undefined ) {
			//踢人
			PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_KICK_PLAYER,this.onEvent,this);
			for (var i = 0;i < this.userPlayer.length; i++) {
				if (name === this.userPlayer[i].nickName) {
					PokeMatchvsEngine.getInstance.kickPlayer(this.userPlayer[i].userID); 
				}
			}
			this.beKickedOutName = instance.text;
		} else {
			try {
				var par = "roomID="+this.roomID;
				together("约战",par);
			} catch (e){
				console.warn(e,e.message);
			}

		}
	}


	//创建一个定时器
	private createTimer() {
		this.timer = new egret.Timer(1000,11);
		//注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.showCounDownLabel,this);
		this.timer.start();
	}

	/**
	 * 显示开始游戏倒计时
	 */
	protected showCounDownLabel() {
		this.countDownLabel.text = "开始倒计时："+Math.abs((this.countDownTimer-10));
		this.countDownTimer++;
		if(this.countDownTimer === 11) {
			this.timer.stop();
			this.startBattle();
		}
	}


	/**
	  * 跳转游戏页面
	*/
	private startBattle(){
		MatchvsData.gameMode = true;
		this.userPlayer.push(GlobalData.myUser);
		this.removeEvent();
		var obj = {roomID: this.roomID, userList:this.userPlayer};
		SceneManager.showScene(BattleStageUI,obj);
	}



	/**
	 * 将玩家信息放入UserplayerList中
	 */
	public addUser(userPlayer:any) {
		for(var i = 0; i <userPlayer.length; i++) {
			var user:GUser = new GUser;
			var arr = JSON.parse(userPlayer[i].userProfile);
			if(arr.userID !== GlobalData.myUser.userID) {
				user.nickName =arr.nickName;
				user.avator = arr.avator;
				user.pointValue = arr.pointValue;
				user.userID = userPlayer[i].userId;
				this.userPlayer.push(user);
			}

		}
		this.initView(this.userPlayer);
	}

	/**
	 * 是否是房主,是房主 传true 不是传 false，来确定按钮的显示隐藏
	 */
	public isOwnew(isOwnew :boolean) {
		this.action.visible = isOwnew;
		this.action1.visible = isOwnew;
		this.actionText.visible = isOwnew;
		this.actionText1.visible = isOwnew;
	}


	
}