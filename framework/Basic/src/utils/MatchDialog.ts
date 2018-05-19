class MatchDialog extends eui.Component implements  eui.UIComponent {


	private defaultFont:number = 0; 
	private fontImgUnits:eui.Image = null;
	private fontImgtens:eui.Image = null;
	private fontImghundreds:eui.Image = null;
	private timer:egret.Timer;


	public constructor() {
		super();
		this.timer = new egret.Timer(1000,0);
		//注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
		this.timer.start();
	}
	

	protected partAdded(partName:string,instance:any):void {

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