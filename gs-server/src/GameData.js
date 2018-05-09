var GameData = {
    MSG_EVENT:{
        READY:113,                  //准备游戏
        RESET_ROOM:140,             //重置房间
        SEND_CARD:177,              //发牌
        TURN_CALL_LAND:179,         //轮流叫地主
        REPROT_SCORE:181,
        CLEAR_SCROE:183,
    },

    RSP_EVENT:{
        SEND_CARD:177,              //发牌
        NEXT_CALL_LAND:178,         //下一个叫地主
        LAND_CALL_OVER:180,         //结束叫地主
        REPROT_RESULT:182,          //上报分数
        RESET_OK:141,               //重置OK
    },

    Conf:{
        MAX_PLAYER_NUM : 3,//一个房间的最大人数
        MAX_LAND_SCORE:3,  //叫地主的最大分数
        DATA_STORAGE_ENV:0, //0-alpha 1-release
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