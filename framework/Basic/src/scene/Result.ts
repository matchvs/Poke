/**
 * 结算页面
 * 
 */
class ResultUI extends eui.Component implements  eui.UIComponent {
	private allChildren:{[key:string]:any} = [];

	private winTitleImg:eui.Image = null; //显示胜利还是失败

	private head_landlord:eui.Image = null;
	private head_peasant1:eui.Image = null;
	private head_peasant2:eui.Image = null;

	private nickName_landlord:eui.Label = null;
	private nickName_peasant1:eui.Label = null;
	private nickName_peasant2:eui.Label = null;

	private integral_landlord:eui.Label = null;
	private integral_peasant1:eui.Label = null;
	private integral_peasant2:eui.Label = null;

	private icon_landlord:eui.Image = null;
	private icon_peasant1:eui.Image = null;
	private icon_peasant2:eui.Image = null;

	private _landLord:battle.Player = null;
	private _peasant1:battle.Player = null;
	private _peasant2:battle.Player = null;
	private _iswin:boolean= false;
	private _isLandWin:boolean = false
	private _timesCount:number = 0;

	private _landlordText:string = "";
	private _peasant1Text:string = "";
	private _peasant2Text:string = "";

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void{
		super.partAdded(partName,instance);
		this.allChildren[partName] = instance;
		console.info("ResultUI partName",partName,instance);
		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			if(partName = "confirm") {
				//确定按钮
				this.backConfirm(MatchvsData.gameMode);
			}
		},this);
	}

	public init(){
		this.winTitleImg = this.allChildren["winTitleImg"];

		this.head_landlord = this.allChildren["head_landlord"];
		this.head_peasant1 = this.allChildren["head_peasant1"];
		this.head_peasant2 = this.allChildren["head_peasant2"];

		this.nickName_landlord = this.allChildren["nickName_landlord"];
		this.nickName_peasant1 = this.allChildren["nickName_peasant1"];
		this.nickName_peasant2 = this.allChildren["nickName_peasant2"];

		this.integral_landlord = this.allChildren["integral_landlord"];
		this.integral_peasant1 = this.allChildren["integral_peasant1"];
		this.integral_peasant2 = this.allChildren["integral_peasant2"];

		this.icon_landlord = this.allChildren["icon_landlord"];
		this.icon_peasant1 = this.allChildren["icon_peasant1"];
		this.icon_peasant2 = this.allChildren["icon_peasant2"];
	}

	protected childrenCreated():void{
		super.childrenCreated();
		console.log("结算页面控件获取完毕：",this.allChildren);
		
	}

	public setResultInfo(landLord:battle.Player, peasant1:battle.Player, peasant2:battle.Player, iswin:boolean, isLandWin:boolean){

	}
	// private showLandLordInfo(user:battle.Player){
	// 	this.head_landlord.source = user.avator;
	// 	this.nickName_landlord.text = user.nickName;
	// 	this.integral_landlord.text = user.pointValue.toString();
	// }

	// private showPeasant1Info(user:battle.Player){

	// }


	// private showPeasant2Info(user:battle.Player){

	// }

	/**
	 * @param {number} base 基础值
	 * @param {times} times 倍数
	 * @returns {number} 
	 */
	private PointIncrement(base:number, times:number):number{
		return base*(Math.pow(2,times));;
	}

	private ReporePointValue(){
		network.BattleMsg.getInstance().sendToGameServer(network.NetMsgEvent.RESET_ROOM_S,{});
	}

	private FinalValueResult(landowner:battle.Player, p1:battle.Player, p2:battle.Player, isLandWin:boolean, base:number, times:number):number{
		let incValue = this.PointIncrement(base, times);
		let finalValue = 0;
		if(isLandWin){
			if(p1.pointValue > incValue){
				this._peasant1Text = p1.pointValue+"-"+ incValue;
				finalValue += incValue;
				p1.pointValue -= incValue;
				
			}else{
				this._peasant1Text = p1.pointValue+"-"+ p1.pointValue;
				finalValue += p1.pointValue;
				p1.pointValue = 0;
			}

			if(p2.pointValue > incValue){
				this._peasant2Text = p2.pointValue+"-"+ incValue;
				finalValue += incValue; 
				p2.pointValue -= incValue;
			}else{
				this._peasant2Text = p2.pointValue+"-"+ p2.pointValue;
				finalValue += p2.pointValue;
				p2.pointValue = 0;
			}
			this._landlordText = landowner.pointValue+"+"+ finalValue;
			landowner.pointValue += finalValue;
			
		}else{
			incValue = (incValue*2);
			if(landowner.pointValue > incValue){
				this._landlordText = landowner.pointValue+"-"+ incValue;
				landowner.pointValue -= incValue;
				finalValue += incValue;
			}else{
				this._landlordText = landowner.pointValue+"-"+ landowner.pointValue;
				finalValue += landowner.pointValue;
				landowner.pointValue = 0;
			}
			this._peasant1Text = p1.pointValue+"-"+ (finalValue/2);
			this._peasant2Text = p2.pointValue+"-"+ (finalValue/2);
			p1.pointValue = finalValue/2;
			p2.pointValue = finalValue/2;
		}
		return finalValue;
	}

	public showResult(landLord:battle.Player, peasant1:battle.Player, peasant2:battle.Player, iswin:boolean, isLandWin:boolean, timesCount:number){
		let finalValue = this.FinalValueResult(landLord,peasant1,peasant2,isLandWin,100,timesCount);
		if(iswin){
			this.winTitleImg.source = "resource/assets/result/title_win.png";
		}else{
			this.winTitleImg.source = "resource/assets/result/title_fail.png";
		}
		if(isLandWin){
			this.icon_landlord.source = "resource/assets/result/icon_result_win.png";
			this.icon_peasant1.source = "resource/assets/result/icon_result_fail.png";
			this.icon_peasant2.source = "resource/assets/result/icon_result_fail.png";

			
		}else{
			this.icon_landlord.source = "resource/assets/result/icon_result_fail.png";
			this.icon_peasant1.source = "resource/assets/result/icon_result_win.png";
			this.icon_peasant2.source = "resource/assets/result/icon_result_win.png";
		}

		this.integral_landlord.text = this._landlordText;
		this.integral_peasant1.text = this._peasant1Text;
		this.integral_peasant2.text = this._peasant2Text;


		this.head_landlord.source = landLord.avator;
		this.nickName_landlord.text = landLord.nickName;
		

		this.head_peasant1.source = peasant1.avator;
		this.nickName_peasant1.text = peasant1.nickName;
		

		this.head_peasant2.source = peasant2.avator;
		this.nickName_peasant2.text = peasant2.nickName;
		
		
	}
	/**
	 * 确定按钮
	 * @param isGameMode false直接跳转到首页  true直接跳转到房间页面，userPlayer不要清空，房间需要重新打开，可以重新开始游戏
	 */
	private backConfirm(isGameMode) {
		if(isGameMode) {
			let room = new Room();
			SceneManager.showScene(room);
		} else{
			PokeMatchvsEngine.getInstance().leaveRoom("战斗结束了");
			SceneManager.showScene(new Game);
		}
	}
	
}