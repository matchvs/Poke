class MatchDialog extends eui.Component implements  eui.UIComponent {


	private defaultFont:number = 0; 
	private fontImgUnits:eui.Image = null;
	private fontImgtens:eui.Image = null;
	private fontImghundreds:eui.Image = null;
	private timer:egret.Timer;
	private userPlayer = [];

	public constructor() {
		super();
		this.timer = new egret.Timer(1000,0);
		//注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
		this.timer.start();
	}
	

	protected partAdded(partName:string,instance:any):void {
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY,this.onEvent,this);
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_LEVAE_ROOM,this.onEvent,this);
		super.partAdded(partName,instance);
		if(partName == "time_units") {
			this.fontImgUnits = instance;
		}
		if(partName == "time_tens") {
			this.fontImgtens = instance;
		}
		if(partName == "time_hundreds") {
			this.fontImghundreds = instance;
		}
		
		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			if(partName == "cancel_match") {
				PokeMatchvsEngine.getInstance().leaveRoom("不想等待匹配了");
				this.stopTimer();
				SceneManager.back();
			}

		},this);

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
			 case MatchvsMessage.MATCHVS_LEVAE_ROOM:
			 	this.userPlayer.length = 0;
				 egret.log("接收到离开房间的消息");
			 break;
			 
		 }
	 }


	 	 /**
	  * 跳转游戏页面
	  */
	private startBattle(){
		this.timer.stop();
		SceneManager.showScene(BattleStageUI,this.userPlayer);
	}


	/**
	 * 定时器时间的展示
	 */
    private timerFunc() {
		switch(this.defaultFont.toString().length) {
			case 1:
				var a=this.defaultFont%10;
				this.fontImgUnits.source = (a).toString();  
			break
			case 2:
				var a = this.defaultFont%10;  
				var b = Math.floor((this.defaultFont%100)/10);
				this.fontImgUnits.source = a.toString();
				this.fontImgtens.source = b.toString();  
				
			break
			case 3:
				var a = this.defaultFont%10;  
				var b = Math.floor((this.defaultFont%100)/10);
				var c = Math.floor((this.defaultFont/100));
				this.fontImgUnits.source = (a).toString();
				this.fontImgtens.source = (b).toString();  
				this.fontImghundreds.source = (c).toString();
			break
		}
		egret.log("时间"+this.defaultFont);
		this.defaultFont++;
    }

	/**
	 * 将定时器停止
	 */
	public stopTimer() {
		this.removeEventListener(MatchvsMessage.MATCHVS_DELET_TIME,this.onEvent,this);
		this.timer.stop();
	}


	 protected partRemoved(partName: string, instance: any){
		 super.partRemoved(partName,instance);
		 egret.log();
	 }


	protected childrenCreated():void {
		super.childrenCreated();
	}


	Num = [9,99,999,9999,9999,99999,999999];

	public getIntLenth (x:number) {
		for(var i = 0; i< this.Num.length;i++) {
			if(Math.abs(x) <= this.Num[i]) {
				return i+1;
			}	
		}
	}
	
}