class PokeMatchvsEngine  {
	
	private engine:MatchvsEngine;
	private response:MatchvsResponse;

	public constructor() {
		this.engine = new MatchvsEngine;
		this.response = new MatchvsResponse;
	}
	
	/**
	 * 初始化
	 */
	public init(pChannel: string, pPlatform: string, gameID: number) :number{
		var result = this.engine.init(new MatchvsResponse,pChannel,pPlatform,gameID);
		egret.log("初始化result："+result);
		return result;
	}


	/**
	 * 注册
	 */
	public registerUser() :number{
		var result = this.engine.registerUser();
		egret.log("注册result："+result);
		return result;
	}

	/**
	 * 登录
	 */
	public login(pUserID: number, pToken: string,) :number {
		var result = this.engine.login(pUserID,pToken,MatchvsData.gameID,MatchvsData.gameVision,
		MatchvsData.appKey,MatchvsData.secret,MatchvsData.DeviceID,MatchvsData.gatewayID);
		egret.log("登录result："+result);
		return result;
	}


}