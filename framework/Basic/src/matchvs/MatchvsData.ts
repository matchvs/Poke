
/**
 * Matchvs常量定义
 */
class MatchvsData {

	public static gameID:number = 200787;
	public static appKey:string = "de7c4a439d2948d880451c25c910b239";
	public static secret:string = "5667067032b644c687c0a86ca9faa2d6";
	public static gameVision:number = 1.0;
	public static DeviceID:string = "0";
	public static gatewayID: number = 1;
	public static pChannel:string = "MatchVS"
	public static pPlatform:string = "alpha";
	public static HtttpUrl:any = "https://vsopen.matchvs.com/wc5/getGameData.do?";
	public static alphaHttpUrl:any = "https://alphavsopen.matchvs.com/wc5/getGameData.do?";
	public static MatchvsReq:MatchvsEngine = new MatchvsEngine();
	public static MatchvsRep:MatchvsResponse = new MatchvsResponse();
	public static maxPlayer:number = 3; //随机匹配房间最大人数
	public static defaultIcon = ["http://193.112.47.13/headimg/1.jpg",
								"http://193.112.47.13/headimg/2.jpg",
								"http://193.112.47.13/headimg/3.jpg",
								"http://193.112.47.13/headimg/4.jpg",
								"http://193.112.47.13/headimg/5.jpg",
								"http://193.112.47.13/headimg/6.jpg",
								"http://193.112.47.13/headimg/7.jpg",
								"http://193.112.47.13/headimg/8.jpg",
								"http://193.112.47.13/headimg/9.jpg",
								"http://193.112.47.13/headimg/11.jpg",
								"http://193.112.47.13/headimg/12.jpg",
								"http://193.112.47.13/headimg/13.jpg",
								"http://193.112.47.13/headimg/14.jpg",
								];
	
	public static defaultScore = 10000;
	public static defaultRoomInfo:MsCreateRoomInfo = new MsCreateRoomInfo("",3,1,1,1,"");
	public static gameMode:boolean = false; // false  代表直接开始游戏，true代表邀请好友开始游戏

	public constructor() {
	}
	
	public static getDefaultUserProfile():string {
		egret.log("自己加入房间的USerProFile",GlobalData.myUser.nickName+"/n"+GlobalData.myUser.avator+"/n"+GlobalData.myUser.pointValue);
		return GlobalData.myUser.nickName+"/n"+GlobalData.myUser.avator+"/n"+GlobalData.myUser.pointValue;
	}

}