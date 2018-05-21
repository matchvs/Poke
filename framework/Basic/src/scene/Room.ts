class Room extends eui.Component implements  eui.UIComponent {

	public roomID:string = "";
	private _topHeader:TopHeader = null;//顶部用户自己的头像和积分位置
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


	public constructor() {
		super();
	}

	/**
	 * 房间ID
	 */
	public init(roomID:string) {
		this.roomID = roomID;
	}


	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM,this.onEvent,this);
		switch(partName) {
			case "roomID_tabel":
				instance.text = "房间号："+this.roomID;
			break;
			case "topHeader":
				this._topHeader = instance;
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
				PokeMatchvsEngine.getInstance().leaveRoom("我走了");
			}

			//踢人或者邀请
			if(partName == "action") {
				// PokeMatchvsEngine.getInstance().
			}
		}, this);
	}


	protected childrenCreated():void {
		super.childrenCreated();
		this.showTopUserInfo(GlobalData.myUser);
	}

	/**
	 * 接收消息
	 */
	protected onEvent(e:egret.Event) {
		switch(e.type) {
			//有人进来就通知
			case MatchvsMessage.MATCHVS_JOINROOM_NOTIFY:
				this.userPlayer.push(e.data);
				//房间内人数到达三个 就启动定时器;
				this.initView(this.userPlayer);
				if( this.userPlayer.length  == MatchvsData.maxPlayer) {
					this.createTimer();
				}
			break;
			//自己加入房间的通知
			case MatchvsMessage.MATCHVS_JOINROOM_RSP:
				this.userPlayer.push(GlobalData.myUser);
				for(var i in e.data) {
					var user:GUser = new GUser;
					user.userID = e.data[i].userId;
					user.nickName = e.data[i].userId;
					user.avator = e.data[i].userProfile;
					user.pointValue = MatchvsData.defaultScore;
					this.userPlayer.push(user);
				}
				this.initView(this.userPlayer);
				if( this.userPlayer.length  == MatchvsData.maxPlayer) {
					this.createTimer();
				}
				this
			break;
			case MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY:
				//获取数组下标，删除离开玩家的指定的下标，将定时器重置，倒计时也需要重置
				for(var i in this.userPlayer ) {
					if(e.data.userId == this.userPlayer[i].userID) {
						this.userPlayer.splice(parseInt(i));
					}
				}
				this.removeView(e.data.userId);
			break;
			case MatchvsMessage.MATCHVS_LEVAE_ROOM:
				//自己离开了房间，将定时器关闭
				if (this.timer != null) {
					this.timer.stop();
				}
				SceneManager.back();
			break;
			case MatchvsMessage.MATCHVS_KICK_PLAYER_NOTIFY:
				this.removeView(e.data.userID);
			break;
			case MatchvsMessage.MATCHVS_KICK_PLAYER:
				this.removeView(e.data.userID);
			break;
		}
	}	

	/**
	 * 显示其他玩家的基本信息
	 */
	private initView(userPlayer:any) {
		this.nameViewList = [this.name_one,this.name_two];
		this.iconViewList = [this.icon_one,this.icon_two];
		this.actionViewList = [this.action,this.action1];
		this.actionTextViewList = [this.actionText,this.actionText1];
		for(var i =0; i< this.userPlayer.length;i++) {
			if(userPlayer.nickName === GlobalData.myUser.nickName)
				return;
			if(this.nameViewList[i-1].text != "") {
				this.nameViewList[i-1].text = userPlayer.nickName;
				this.iconViewList[i-1].source = userPlayer.avator;
				this.actionViewList[i-1].strokeColor = "11169372"
				this.actionTextViewList[i-1].text = "踢人";
				this.actionTextViewList[i-1].textColor = "11169372";
			}
		}
	}


	/**
	 * 玩家退出将玩家的信息从页面上消失
	 */
	private removeView(userID:any) {
		for(var i in this.nameViewList) {
			if(userID === this.nameViewList[i].text) {
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
		if(instance.text != "" ) {
			//踢人
			PokeMatchvsEngine.getInstance().kickPlayer(instance.text); 
			PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_KICK_PLAYER_NOTIFY,this.onEvent,this);
			PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_KICK_PLAYER,this.onEvent,this);
		} else {
			try {
				var par = "roomID ="+instance.text;
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
		}
	}

	/**
	 * 显示顶部的用户信息
	 */
	public showTopUserInfo(user ?:GUser){
			this._topHeader.init();
			this._topHeader.ShowAvator(user.avator);
			this._topHeader.SetNickName(user.nickName);
			this._topHeader.SetPointValue(user.pointValue);
	}

	
}