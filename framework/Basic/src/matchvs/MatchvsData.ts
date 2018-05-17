
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
	public static MatchvsReq:MatchvsEngine = new MatchvsEngine();
	public static MatchvsRep:MatchvsResponse = new MatchvsResponse();

	public constructor() {
	}
	


}