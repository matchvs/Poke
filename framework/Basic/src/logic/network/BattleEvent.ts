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
	}
}