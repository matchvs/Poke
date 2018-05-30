
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
	public static pPlatform:string = "release";
	public static HtttpUrl:any = "http://vsopen.matchvs.com/wc5/getGameData.do?";
	public static alphaHttpUrl:any = "https://alphavsopen.matchvs.com/wc5/getGameData.do?";
	public static MatchvsReq:MatchvsEngine = new MatchvsEngine();
	public static MatchvsRep:MatchvsResponse = new MatchvsResponse();
	public static maxPlayer:number = 3; //随机匹配房间最大人数
	public static defaultIcon = ["https://alphazwimg.matchvs.com/egret/Three-Poker/img/images1.jpg",
								"https://alphazwimg.matchvs.com/egret/Three-Poker/img/images2.jpg",
								"https://alphazwimg.matchvs.com/egret/Three-Poker/img/images3.jpg",
								"https://alphazwimg.matchvs.com/egret/Three-Poker/img/images4.jpg",
								"https://alphazwimg.matchvs.com/egret/Three-Poker/img/images5.jpg",
								"https://alphazwimg.matchvs.com/egret/Three-Poker/img/images6.jpg",
								"https://alphazwimg.matchvs.com/egret/Three-Poker/img/images7.jpg",
								"https://alphazwimg.matchvs.com/egret/Three-Poker/img/images8.jpg",
								"https://alphazwimg.matchvs.com/egret/Three-Poker/img/images9.jpg",
								"https://alphazwimg.matchvs.com/egret/Three-Poker/img/images10.jpg",
								];
	public static FCdefaultIcon = ["https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-0/p206x206/22366452_1967021146906417_8277070881351653528_n.jpg?_nc_cat=0&oh=b3dfcda6a2aba65b074a779c8985c519&oe=5B8BDAE3",
								"https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-0/p206x206/22366452_1967021146906417_8277070881351653528_n.jpg?_nc_cat=0&oh=b3dfcda6a2aba65b074a779c8985c519&oe=5B8BDAE3",
								"https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-0/p206x206/22366452_1967021146906417_8277070881351653528_n.jpg?_nc_cat=0&oh=b3dfcda6a2aba65b074a779c8985c519&oe=5B8BDAE3",
								"https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-0/p206x206/22366452_1967021146906417_8277070881351653528_n.jpg?_nc_cat=0&oh=b3dfcda6a2aba65b074a779c8985c519&oe=5B8BDAE3",
								"https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-0/p206x206/22366452_1967021146906417_8277070881351653528_n.jpg?_nc_cat=0&oh=b3dfcda6a2aba65b074a779c8985c519&oe=5B8BDAE3",
								"https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-0/p206x206/22366452_1967021146906417_8277070881351653528_n.jpg?_nc_cat=0&oh=b3dfcda6a2aba65b074a779c8985c519&oe=5B8BDAE3",
								"https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-0/p206x206/22366452_1967021146906417_8277070881351653528_n.jpg?_nc_cat=0&oh=b3dfcda6a2aba65b074a779c8985c519&oe=5B8BDAE3",
								"https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-0/p206x206/22366452_1967021146906417_8277070881351653528_n.jpg?_nc_cat=0&oh=b3dfcda6a2aba65b074a779c8985c519&oe=5B8BDAE3",
								"https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-0/p206x206/22366452_1967021146906417_8277070881351653528_n.jpg?_nc_cat=0&oh=b3dfcda6a2aba65b074a779c8985c519&oe=5B8BDAE3",
								"https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-0/p206x206/22366452_1967021146906417_8277070881351653528_n.jpg?_nc_cat=0&oh=b3dfcda6a2aba65b074a779c8985c519&oe=5B8BDAE3",
								];
	
	public static defaultScore = 10000;
	public static defaultRoomInfo:MsCreateRoomInfo = new MsCreateRoomInfo("",3,1,1,1,"");
	public static gameMode:boolean = false; // false  代表直接开始游戏，true代表邀请好友开始游戏
	public static loginStatus = false;


	public constructor() {
	}
	
	public static getDefaultUserProfile():string {
		egret.log("自己加入房间的USerProFile",GlobalData.myUser.nickName+"/n"+GlobalData.myUser.avator+"/n"+GlobalData.myUser.pointValue);
		return GlobalData.myUser.nickName+"/n"+GlobalData.myUser.avator+"/n"+GlobalData.myUser.pointValue;
	}

}