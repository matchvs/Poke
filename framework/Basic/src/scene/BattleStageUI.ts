class BattleStageUI extends eui.Component implements eui.UIComponent{


	private _topHeader:TopHeader = null;//顶部用户自己的头像和积分位置
	
	private _battleControl: battle.BattleStageControl = null; //对战控制

	public _battleSprite:egret.Sprite = null; //对战控制舞台
	
	public constructor() {
		super();
		
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		console.log("partAdded",partName,instance);
		if(partName == "topHeader"){
			this._topHeader = instance;
		}
	}


	/**
	 * 添加几个假的用户
	 */
	public explameAddPlayer(){
		GlobalData.myUser = new GUser();
		GlobalData.myUser.avator = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526393669326&di=835161a2290b3b6ae1740bd39eb52f3e&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201609%2F16%2F20160916214658_UcHjJ.jpeg";
		GlobalData.myUser.nickName = "vv";
		GlobalData.myUser.userID = 85642;
		GlobalData.myUser.pointValue = 12535;
	}


	public showTopUserInfo(user ?:GUser){
		if(user){
			this._topHeader.init();
			this._topHeader.ShowAvator(user.avator);
			this._topHeader.SetNickName(user.nickName);
			this._topHeader.SetPointValue(user.pointValue);
		}
	}

	public init(){
		this.explameAddPlayer();
		this.showTopUserInfo(GlobalData.myUser);
		this._battleSprite = new egret.Sprite();
		this.addChild(this._battleSprite);
		this._battleControl = new battle.BattleStageControl(this);
		this._battleControl.init();
	}

	//添加用户
	public addPlayer(user:GUser){
		this._battleControl.addPlayer(user);
	}


}
