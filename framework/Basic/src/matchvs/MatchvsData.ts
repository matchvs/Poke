
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
	public static pChannel:string = "MatchVS-Test1"
	public static pPlatform:string = "release";
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
								// "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1526543241&di=d3855933248104e0888253044491a25b&src=http://www.th7.cn/d/file/p/2016/12/06/410a028423831f08a3a0effd5d2e781a.jpg",
								// "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1526543241&di=5fba65f1b8dc266ae84ef4572b78445f&src=http://www.ld12.com/upimg358/allimg/20160629/195257580739086.jpg",
								// "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1526543241&di=5fba65f1b8dc266ae84ef4572b78445f&src=http://www.ld12.com/upimg358/allimg/20160629/195257580739086.jpg",
								// "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526553368958&di=e726e3dbbde97b31e512b507850a2851&imgtype=0&src=http%3A%2F%2Fcdnq.duitang.com%2Fuploads%2Fitem%2F201504%2F30%2F20150430125352_aeTLk.jpeg",
								// "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526553561873&di=26467612a3cd453801fa390193bc6f04&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201408%2F28%2F20140828020542_zwKsY.jpeg",
								// "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526553561871&di=505dd43c7765befdc778e2d0969ee8b8&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201409%2F14%2F20140914161215_wWW2S.jpeg",
								// "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526553605118&di=a69dcf9d481b834119bee994dabe261c&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2015-01-29%2F231109552.jpg"
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