module network {
	/**
	 * S 后缀代表 发送，R代表接收
	 */
	export enum  NetMsgEvent {

		GAME_READY_S = 120, 			//准备游戏
		GAME_READY_R = 121,				//准备响应（发牌）
		
		RESET_ROOM_S = 122,				//重置房间信息
		RESET_ROOM_R = 123,				//重置响应

		CALL_LAND_S = 124,				//叫地主
		CALL_LAND_RN = 125,				//没有产生地主，下一个叫地主
		CALL_LAND_RO = 126,				//产生地主，叫地主结束

		REPROT_SCORE_S = 128,			//上报分数
		REPROT_SCORE_R = 129,			//上报分数响应

		PLAY_CARDS_S = 130,				//出牌
		PLAY_CARDS_R = 131,

		GAME_OVER_S = 132,				//游戏结束上报
		GAME_OVER_R = 133,				//游戏结束响应

		GAME_IS_OKS = 134,			//回到游戏房间页面，开始倒计时
		GAME_IS_OKR = 135,
	}


	export class BattleMsgEvent {
		constructor(){
		}
		//准备游戏
		public static GAME_READY = "GameReady";

		//叫地主结束
		public static CALL_LANDLORD_OVER = "CallLandLordOver";

		//下一个叫地主
		public static CALL_LANDLORD_NEXT = "CallLandLordNext";

		//出牌
		public static PLAYER_CARDS = "PlayerCards";

		//上报分数事件
		public static REPORT_DATA = "ReportData";

		//游戏结束
		public static GAME_OVER = "GameOver";

		// 进入房间，准备倒计时
		public static START_THE_COUNTDOWN = "START_THE_COUNTDOWN";


		// 回到游戏大厅
		public static GAME_IS_OK = "GAME_IS_OK";
	}
}