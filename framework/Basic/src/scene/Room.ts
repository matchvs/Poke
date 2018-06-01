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
	private nameViewList = [];
	private iconViewList = [];
	private actionViewList = [];
	private actionTextViewList = [];
	// private isRestart = false; //是否是打完一局重新开始
	// private isInvite = false; //是否进入房间直接邀请


	public constructor() {
		super();
	}

	public onShow(obj) {
		MatchvsData.loginStatus = false;
		this.roomID = obj.roomID;
		if(obj.isInvite) {
			if(MatchvsData.gameMode) {
				try {
					WxUtils.wxTogether("邀请好友",this.roomID);
				} catch (e) {
					PokeMatchvsEngine.getInstance.leaveRoom("");
				}
			}
		}

		if (obj.isRestart) {
			this.restart(this.roomID);
		}
	}

	/**
	 * 重新进入房间
	 */
	public restart(roomID:string) {
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_ROOM_DETAIL_RSP,this.onEvent,this);
		PokeMatchvsEngine.getInstance.getRoomDetail(roomID);
	}
	

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM,this.onEvent,this);
		switch(partName) {
			case "nickName":
				instance.text = GlobalData.myUser.nickName;
				break;
			case "integral":
				instance.text = GlobalData.myUser.pointValue;
				break;
			case "head":
				instance.source = GlobalData.myUser.avator;
				break;
			case "roomID_tabel":
				instance.text = "房间号："+this.roomID;
			break;
			case "my_icon":
				instance.source = GlobalData.myUser.avator;
			break;
			case "my_name":
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
				PokeMatchvsEngine.getInstance.leaveRoom("我走了");
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


	protected childrenCreated():void {
		super.childrenCreated();
		network.NetworkStateCheck.getInstance().RegistNetListen(this);
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
				if( this.userPlayer.length  == 2) {
					this.createTimer();
				}
			break;
			//自己加入房间的通知
			case MatchvsMessage.MATCHVS_JOINROOM_RSP:
			egret.log("我进入房间了",e.data);
				this.addUser(e.data);
			break;
			case MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY:
				//获取数组下标，删除离开玩家的指定的下标，将定时器重置，倒计时也需要重置
				this.removeView(e.data.userId);
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
				this.removeView(e.data.userID);
			break;
			case MatchvsMessage.MATCHVS_KICK_PLAYER:
				this.removeView(e.data.userID);
			break;
			case MatchvsMessage.MATCHVS_ROOM_DETAIL_RSP:
				this.addUser(e.data.userInfos);
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
    }


	public Release (){
		this.removeEvent();
		this.timer.stop();
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
	private removeView(userID:any) {
		for(var a = 0; a < this.userPlayer.length;a++ ) {
			if(userID == this.userPlayer[a].userID) {
				this.userPlayer.splice(a,1);
			}
		}
		if(userID === GlobalData.myUser.userID) {
			this.timer.stop;
			this.countDownLabel.text = "";
			this.countDownTimer = 0;
			this.removeEvent();
			SceneManager.back();
		}
		for(var i = 0; i < this.nameViewList.length; i++) {
			if(userID == this.nameViewList[i].text) {
				this.nameViewList[i].text = "";
				this.iconViewList[i].text = "";
				this.actionViewList[i].strokeColor = "15445580"
				this.actionTextViewList[i].text = "邀请";
				this.actionTextViewList[i].textColor = "11169372";
				return;
			}
		}
	}

	/**
	 * 用户操作，踢人或者邀请
	 */
	public userAction(instance:any) {
		if(instance.text != "" && instance.text != undefined ) {
			//踢人
			PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_KICK_PLAYER_NOTIFY,this.onEvent,this);
			PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_KICK_PLAYER,this.onEvent,this);
			PokeMatchvsEngine.getInstance.kickPlayer(instance.text); 

		} else {
			try {
				var par = "roomID="+this.roomID;
				egret.log("约战的roomID"+this.roomID);
				together("约战",par);
			} catch (e){
				egret.log(e,e.message);
			}

		}
	}


	//创建一个定时器
	private createTimer() {
		this.timer = new egret.Timer(1000,0);
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
		this.userPlayer.push(GlobalData.myUser);
		this.removeEvent();
		// var battles = new BattleStageUI();
		// battles.init();
		// battles.StartBattle(this.userPlayer);
		var obj = {roomID: this.roomID, userList:this.userPlayer};
		SceneManager.showScene(BattleStageUI,obj);
	}



	/**
	 * 将玩家信息放入UserplayerList中
	 */
	public addUser(userPlayer:any) {
		egret.log(userPlayer);
		egret.log(userPlayer[0].userProfile);
		for(var i = 0; i <userPlayer.length; i++) {
			var user:GUser = new GUser;
			var arr = userPlayer[i].userProfile.split("/n");
			user.nickName =arr[0];
			user.avator = arr[1];
			user.pointValue = arr[2];
			user.userID = userPlayer[i].userId;
			this.userPlayer.push(user);
		}
		this.initView(this.userPlayer);
		if( this.userPlayer.length  == 2) {
			this.createTimer();
		}
	}




	
}