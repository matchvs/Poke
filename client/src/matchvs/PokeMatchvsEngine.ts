class PokeMatchvsEngine  {
	

	private static _instance ;

	private constructor() {

	}


	public static get getInstance():PokeMatchvsEngine {  
         if (this._instance == null) {    
            this._instance = new PokeMatchvsEngine();  
         }    
        return this._instance;  
    }  
	
	/**
	 * 初始化
	 */
	public init(pChannel: string, pPlatform: string, gameID: number) :number{
		var result = MatchvsData.MatchvsReq.init(MatchvsData.MatchvsRep, pChannel, pPlatform, gameID, MatchvsData.appKey,MatchvsData.gameVision);
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
		var result = MatchvsData.MatchvsReq.login(pUserID,pToken, MatchvsData.DeviceID);
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

	public loginOut():number{
		var result = MatchvsData.MatchvsReq.logout("累了困了");
		egret.log("登出：",result);
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
	public kickPlayer(userID:number,name:string) {
		var obj = {nickName:name,proto:"你无法跟我一起游戏了"}
		var result = MatchvsData.MatchvsReq.kickPlayer(userID,JSON.stringify(obj));
		egret.log("踢出" +userID+"result:"+result);
		return result;
	}

	/**
	 * 加入房间
	 * @param userProfile 传递自己的微信昵称与微信头像地址
	 */
	public joinRoom(roomID:string,userProfile:string) {
		var result = MatchvsData.MatchvsReq.joinRoom(roomID,userProfile);
		egret.log("加入房间result:"+result);
		return result;
	}

	/**
	 * 获取房间详情
	 */
	public getRoomDetail(roomID:string) {
		var result = MatchvsData.MatchvsReq.getRoomDetail(roomID);
		egret.log("获取房间详情result:"+result);
		return result;
	}



	// /**
	//  * 存储数据
	//  */
	// public hashSet(key:any,value:any) {
	// 	MatchvsData.MatchvsReq.hashSet(MatchvsData.gameID,GlobalData.myUser.userID,key,value);
	// }

	// /**
	//  * 获取数据
	//  */
	// public hashGet(key:any) {
	// 	MatchvsData.MatchvsReq.hashGet(MatchvsData.gameID,GlobalData.myUser.userID,key);
	// }

	/**
	 * 取全局排行榜数据
	 */
	public getRankList(key:any) {
		//参数组合是安装首字母排序的
		let keyList =  JSON.stringify([{"key":"rankList"}]);
		egret.log(keyList);
    	var params = "gameID=" + MatchvsData.gameID + "&userID=" + GlobalData.myUser.userID + "&keyList=" +keyList;
    	//加上 appkey 和 token 进行MD5签名
		var matchvsMD5 = new MD5();
    	var sign = matchvsMD5.hex_md5(MatchvsData.appKey+"&gameID="+MatchvsData.gameID+"&userID="+GlobalData.myUser.userID+"&"+ MatchvsData.secret);
		var rankListUrl = MatchvsData.alphaHttpUrl+params+"&sign="+sign;
		egret.log(rankListUrl,rankListUrl);
		var http = new MatchvsHttp(PokeMatchvsRep.getInstance);
		http.get(rankListUrl+"&timer="+key);
	}

	/**
	 * 发送消息扩展接口，给gameServer
	 */
	public sendEventEx(action,cpProto:string) {
		var result = MatchvsData.MatchvsReq.sendEventEx(1,JSON.stringify({action:action,data:cpProto}),1,[]);
		console.log("发送消息 result"+ result);
		return result;
	}

	// public onMsg;
	// public onErr;
	// public onGetProgress(){

	// 	this.onMsg = function (buf) {
		
	// 	},
	// 	this.onErr = function (errCode, errMsg) {
		
	// 	}
	// }


}

class onGetProgress {

	public onMsg = function(buf) {

	}


	public onErr = function(errCode,errMsg) {

	}


}