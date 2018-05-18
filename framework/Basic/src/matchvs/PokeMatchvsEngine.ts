class PokeMatchvsEngine  {
	
	// private engine:MatchvsEngine;
	// private response:PokeMatchvsRep;
	private static _instance ;

	private constructor() {
		// this.engine = new MatchvsEngine();
		// var response = new PokeMatchvsRep();
		// var rs = new MatchvsResponse();
		// rs.initResponse = this.initResponse.bind(this);
	}


	public static getInstance():PokeMatchvsEngine {  
         if (this._instance == null) {    
            this._instance = new PokeMatchvsEngine();  
         }    
        return this._instance;  
    }  
	
	/**
	 * 初始化
	 */
	public init(pChannel: string, pPlatform: string, gameID: number) :number{
		var result = MatchvsData.MatchvsReq.init( MatchvsData.MatchvsRep,pChannel,pPlatform,gameID);
		egret.log("初始化result："+result);
		return result;
	}

	/**
	 * 注册
	 */
	public registerUser() :number{
		var result = MatchvsData.MatchvsReq.registerUser();
		egret.log("注册result："+result);
		return result;
	}

	/**
	 * 登录
	 */
	public login(pUserID: number, pToken: string,) :number {
		var result = MatchvsData.MatchvsReq.login(pUserID,pToken,MatchvsData.gameID,MatchvsData.gameVision,
		MatchvsData.appKey,MatchvsData.secret,MatchvsData.DeviceID,MatchvsData.gatewayID);
		egret.log("登录result："+result);
		return result;
	}

	/**
	 * 快速匹配
	 */
	public joinRandomRoom() {
		var result = MatchvsData.MatchvsReq.joinRandomRoom(MatchvsData.maxPlayer,"");
		egret.log("快速匹配result :"+result);
		return result;
	}

	/**
	 * 离开房间
	 */
	public leaveRoom(cpProto:string) {
		var result = MatchvsData.MatchvsReq.leaveRoom(cpProto);
	}

	/**
	 * 存储数据
	 */
	public hashSet(userID:string,value:any) {
		MatchvsData.MatchvsReq.hashSet(MatchvsData.gameID,userID,MatchvsData.appKey,value);
	}


}