class MatchDialog extends BaseScene {


	private defaultFont: number = 0;
	private fontImgUnits: eui.Image = null;
	private fontImgtens: eui.Image = null;
	private fontImghundreds: eui.Image = null;
	private timer: egret.Timer;
	private userPlayer = [];
	private roomID = "";

	public constructor(obj) {
		super();
		console.log('MatchDialog', 'constructor');
		this.timer = new egret.Timer(1000, 0);
		//注册事件侦听器
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this.timer.start();
		this.userPlayer.length = 0;
	}

	public initEvent() {
		console.log("initEvent");
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY, this.onEvent, this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM, this.onEvent, this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY, this.onEvent, this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_ROOM_DETAIL_RSP, this.onEvent, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		if (partName == "time_units") {
			this.fontImgUnits = instance;
		}
		if (partName == "time_tens") {
			this.fontImgtens = instance;
		}
		if (partName == "time_hundreds") {
			this.fontImghundreds = instance;
		}
		if (partName == "cancel_match") {
			instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
				if (PokeMatchvsEngine.getInstance.leaveRoom("不想等待匹配了") == -6) {
					this.userPlayer.length = 0;
					this.stopTimer();
					SceneManager.showScene(Game);
				}
			}, this);
		};
		network.NetworkStateCheck.getInstance().RegistNetListen(this);
	}
	public onShow(par?: any) {
		this.roomID = par;
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		console.log('MatchDialog', 'childrenCreated');
		network.NetworkStateCheck.getInstance().RegistNetListen(this);
		PokeMatchvsEngine.getInstance.getRoomDetail(this.roomID);
		this.initEvent();

	}

	/**
	 * 接收Event信息
	 */
	public onEvent(e: egret.Event): void {
		switch (e.type) {
			case MatchvsMessage.MATCHVS_ROOM_DETAIL_RSP:
				for (var i in e.data.userInfos) {
					if (e.data.userInfos[i].userId != GlobalData.myUser.userID) {
						this.addUser(e.data.userInfos[i]);
					}
				}
				break;
			case MatchvsMessage.MATCHVS_JOINROOM_NOTIFY:
				this.addUser(e.data);
				break;

			case MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY:
				//获取数组下标，删除离开玩家的指定的下标，将定时器重置，倒计时也需要重置
				for (var i in this.userPlayer) {
					if (e.data.userId == this.userPlayer[i].userID) {
						egret.log("删除userID在数组的位置" + i);
						this.userPlayer.splice(parseInt(i), 1);
					}
				}
				break;
			case MatchvsMessage.MATCHVS_LEVAE_ROOM:
				this.userPlayer.length = 0;
				egret.log("接收到离开房间的消息");
				this.stopTimer();
				// var roomPanel = new Game();
				// this.addChild(roomPanel);
				// roomPanel = null;
				SceneManager.back();
				console.log('MatchDialog', 'back_game');
				break;

		}
	}


	/**
	 * 跳转游戏页面
	 */
	private startBattle() {
		this.stopTimer();
		var obj = { roomID: this.roomID, userList: this.userPlayer };
		SceneManager.showScene(BattleStageUI, obj);
	}


	/**
	 * 定时器时间的展示
	 */
	private timerFunc() {
		switch (this.defaultFont.toString().length) {
			case 1:
				var a = this.defaultFont % 10;
				this.fontImgUnits.source = (a).toString();
				break
			case 2:
				var a = this.defaultFont % 10;
				var b = Math.floor((this.defaultFont % 100) / 10);
				this.fontImgUnits.source = a.toString();
				this.fontImgtens.source = b.toString();
				break
			case 3:
				var a = this.defaultFont % 10;
				var b = Math.floor((this.defaultFont % 100) / 10);
				var c = Math.floor((this.defaultFont / 100));
				this.fontImgUnits.source = (a).toString();
				this.fontImgtens.source = (b).toString();
				this.fontImghundreds.source = (c).toString();
				break
		}
		egret.log("时间" + this.defaultFont);
		this.defaultFont++;
	}



	/**
 * 将玩家信息放入UserplayerList中
 */
	public addUser(userPlayer: any) {
		if (this.userPlayer.length > 0) {
			for (var i = 0; i < this.userPlayer.length; i++) {
				if (userPlayer.userId != this.userPlayer[i].userID) {
					var user: GUser = new GUser;
					var arr = JSON.parse(userPlayer.userProfile);
					user.nickName = arr.nickName;
					user.avator = arr.avator;
					user.pointValue = arr.pointValue;
					user.userID = userPlayer.userId;
					this.userPlayer.push(user);
				}
			}
		} else {
			var user: GUser = new GUser;
			var arr = JSON.parse(userPlayer.userProfile);
			user.nickName = arr.nickName;
			user.avator = arr.avator;
			user.pointValue = arr.pointValue;
			user.userID = userPlayer.userId;
			this.userPlayer.push(user);
		}
		egret.log("userPlayer的长度" + this.userPlayer.length);
		if (this.userPlayer.length == (MatchvsData.maxPlayer - 1)) {
			this.userPlayer.push(GlobalData.myUser);
			this.startBattle();
		}
	}


	/**
	 * 将定时器停止,移除监听
	 */
	public stopTimer() {
		this.removeEvent();
		this.timer.stop();
	}

	public removeEvent() {
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY, this.onEvent, this);
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY, this.onEvent, this);
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM, this.onEvent, this);
		PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_ROOM_DETAIL_RSP, this.onEvent, this);
		this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
	}





	public Release() {
		this.removeEvent();
	}

	Num = [9, 99, 999, 9999, 9999, 99999, 999999];

	public getIntLenth(x: number) {
		for (var i = 0; i < this.Num.length; i++) {
			if (Math.abs(x) <= this.Num[i]) {
				return i + 1;
			}
		}
	}

}