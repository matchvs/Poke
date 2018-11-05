var GameData = {
    MSG_EVENT:{
        READY:120,                  //准备游戏
        RESET_ROOM:140,             //重置房间
        SEND_CARD:177,              //发牌
        TURN_CALL_LAND:124,         //轮流叫地主
        REPROT_SCORE:128,
        CLEAR_SCROE:183,
        PLAY_CARDS:130,             //出牌
        GAME_OVER_S:132,             //游戏结束
        INROOM_ISOK_S:134                //加入指定房间的时候，确认OK了
    },

    RSP_EVENT:{
        SEND_CARD:121,              //发牌
        NEXT_CALL_LAND:125,         //下一个叫地主
        LAND_CALL_OVER:126,         //结束叫地主
        REPROT_RESULT:129,          //上报分数
        RESET_OK:141,               //重置OK
        PLAY_CARDS_R:131,
        GAME_OVER_R:133,            //游戏结束
        INROOM_ISOK_R:135,          //加入指定房间时，确认OK回复，可以开始游戏。
    },

    Conf:{
        MAX_PLAYER_NUM : 3,//一个房间的最大人数
        MAX_LAND_SCORE:3,  //叫地主的最大分数
        DATA_STORAGE_ENV:1, //0-alpha 1-release
        RANK_NUM:10,        //保存排行榜数据人数
        APPKEY:"de7c4a439d2948d880451c25c910b239",
        SECRET:"5667067032b644c687c0a86ca9faa2d6",
        GAMEID:200787,
    },

    HttpApi:{
        RELEASE_HOST:"http://vsopen.matchvs.com",
        ALPHA_HOST:"http://alphavsopen.matchvs.com",
        SET_GAMEDATA:"/wc5/setGameData.do?",
        GET_GAMEDATA:"/wc5/getGameData.do?",
        DELETE_GAMEDATA:"/wc5/delGameData.do?",
    }
}

module.exports = GameData;