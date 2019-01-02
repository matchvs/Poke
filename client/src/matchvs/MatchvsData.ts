
/**
 * Matchvs常量定义
 */
class MatchvsData {

	public static gameID:number = 200787;
	public static appKey:string = "de7c4a439d2948d880451c25c910b239";
	public static secret:string = "5667067032b644c687c0a86ca9faa2d6";
	public static gameVision:number = 1.0;
	public static DeviceID:string = "0";
	public static pChannel:string = "MatchVS";
	public static pPlatform:string = "release";
	public static HtttpUrl:any = "https://vsopen.matchvs.com/wc5/getGameData.do?";
	public static alphaHttpUrl:any = (MatchvsData.pPlatform == "release" ? "https://vsopen.matchvs.com/wc5/getGameData.do?": "https://alphavsopen.matchvs.com/wc5/getGameData.do?");
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
	
	public static getDefaultUserProfile():any {
		var obj = {nickName:GlobalData.myUser.nickName,avator:GlobalData.myUser.avator,pointValue:GlobalData.myUser.pointValue,
			userID:GlobalData.myUser.userID};
		egret.log("自己加入房间的USerProFile",GlobalData.myUser.nickName+"/"+GlobalData.myUser.avator+"/"+GlobalData.myUser.pointValue+"/"+
		GlobalData.myUser.userID);
		return JSON.stringify(obj);
	}

}