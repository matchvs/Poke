class PokeMatchvsEngine  {
	

	private static _instance ;

	private constructor() {

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
	public joinRandomRoom(cpProto:string) {
		var result = MatchvsData.MatchvsReq.joinRandomRoom(MatchvsData.maxPlayer,cpProto);
		egret.log("快速匹配result :"+result);
		return result;
	}

	/**
	 * 离开房间
	 */
	public leaveRoom(cpProto:string) {
		var result = MatchvsData.MatchvsReq.leaveRoom(cpProto);
		egret.log("离开房间result :"+result);
		return result;
	}

	/**
	 * 创建房间
	 * @param roomPropety 传递自己的微信昵称与微信头像地址
	 */
	public creatRoom(roomName:string,roomPropety:string,maxPlayer:number,userProfile:string) {
		var defaultRoomInfo:MsCreateRoomInfo = new MsCreateRoomInfo(roomName,3,maxPlayer,1,1,roomPropety);
		var result = MatchvsData.MatchvsReq.createRoom(defaultRoomInfo,userProfile);
		egret.log("创建房间result:"+result);
		return result;
	}

	/**
	 * 踢人
	 */
	public kickPlayer(userID:number) {
		var result = MatchvsData.MatchvsReq.kickPlayer(userID,"你无法跟我一起游戏了");
		egret.log("踢人result:"+result);
		return result;
	}

	/**
	 * 加入房间
	 * @param userProfile 传递自己的微信昵称与微信头像地址
	 */
	public joinRoom(roomID:string,userProfile:string) {
		var result = MatchvsData.MatchvsReq.joinRoom(roomID,userProfile);
	}



	/**
	 * 存储数据
	 */
	public hashSet(key:any,value:any) {
		MatchvsData.MatchvsReq.hashSet(MatchvsData.gameID,GlobalData.myUser.userID,key,value);
	}

	/**
	 * 获取数据
	 */
	public hashGet(key:any) {
		MatchvsData.MatchvsReq.hashGet(MatchvsData.gameID,GlobalData.myUser.userID,key);
	}


}