
/**
 * 常量定义
 */
class PokesData {

	public static engine:MatchvsEngine = new MatchvsEngine();
	public static response:MatchvsResponse = new MatchvsResponse();
	public static gameID:number = 201220;
	public static appKey:string = "00f6f33ee17d48e8b7d6731bb5a71ef7";
	public static secret:string = "a8c6f99cb17745efaee615f052547dee";
	//todo 备用方案
	public static _playerList: Array<data.Player> = [];
	
	public constructor() {
	}
	

	public static ResponseBind(responseName:number,thisObject: any) {
		switch (responseName) {
			case 1:

			break
		}
	
	}
}