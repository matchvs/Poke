
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
	public static HtttpUrl:any = "http://vsopen.matchvs.com/wc5/getGameData.do?";
	public static alphaHttpUrl:any = "http://alphavsopen.matchvs.com/wc5/getGameData.do?";
	public static MatchvsReq:MatchvsEngine = new MatchvsEngine();
	public static MatchvsRep:MatchvsResponse = new MatchvsResponse();
	public static maxPlayer:number = 3; //随机匹配房间最大人数
	public static defaultIcon = ["http://alphazwimg.matchvs.com/egret/Three-Poker/img/images1.jpg",
								"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images2.jpg",
								"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images3.jpg",
								"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images4.jpg",
								"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images5.jpg",
								"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images6.jpg",
								"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images7.jpg",
								"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images8.jpg",
								"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images9.jpg",
								"http://alphazwimg.matchvs.com/egret/Three-Poker/img/images10.jpg",
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