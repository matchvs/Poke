
/**
 * 常量定义
 */
class PokesData {

	public static engine:MatchvsEngine = new MatchvsEngine();
	public static response:MatchvsResponse = new MatchvsResponse();
	public static gameID:number = 200787;
	public static appKey:string = "de7c4a439d2948d880451c25c910b239";
	public static secret:string = "5667067032b644c687c0a86ca9faa2d6";
	//1默认快速游戏模式，随机匹配进行，2约战模式，创建房间邀请好友加入。
	public static gameMode:number = 1;


	public static GAMESERVER:boolean = false; //Gamesever模式

	public constructor() {
	}
	

	public static ResponseBind(responseName:number,thisObject: any) {
		switch (responseName) {
			case 1:

			break
		}
	
	}
}