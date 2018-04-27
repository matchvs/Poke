/**
 * Created by Administrator on 2016/1/1.
 */

// note: 使用数字,节省

module enums {
    export enum NetEnum {
        // -----------【 系 统 】消息------------
        //探测服务器是否有返回,ping
        NET_C2S_PING = 4, 
        //登陆服务器
        NET_CSC_LOGIN = 5,
        //登陆服务器
        NET_CSC_LOGIN_DEBUG = 18,

        // -----------【中心服】消息------------
        // 【客户端】资源加载完成，接收服务器初始化消息
        CLIENT_2_CENTER_LOGIN_OK = 51,
        // 【客户端】请求登陆房间
        CLIENT_2_CENTER_REQ_BATTLE = 52,

        

        // -----------【游戏服】消息------------
        // 【客户端】聊天和表情
        CLIENT_2_GAME_SENDCHAT = 112,
        // 【客户端】按下准备
        CLIENT_2_GAME_READY = 113,
        // 【客户端】叫分抢地主
        CLIENT_2_GAME_CALLLANDOWNER = 114,
        // 【客户端】请求出牌
        CLIENT_2_GAME_SHOWCARD = 115,
        // 【客户端】请求托管
        CLIENT_2_GAME_AUTO = 116,
        // 【客户端】请求换桌
        GAME_CENTER_2_GAME_GAMERESULT = 118,
        // 【客户端】请求退出游戏服
        CLIENT_2_GAME_REQ_EXIT = 120,

        // -----------【客户端】消息------------
        // 【中心服】登陆游戏大厅
        CENTER_2_CLIENT_LOGIN_LOBBY = 171,
        // 【中心服】活动信息
        // 【游戏服】我登陆房间
        GAME_2_CLIENT_INIT_ROOM = 172,
        // 【游戏服】其他人登陆房间
        GAME_2_CLIENT_OTHER_ENTER_ROOM = 173,
        // 【游戏服】广播玩家退出
        GAME_2_CLIENT_PLAYEROUT = 174,
        // 【游戏服】广播聊天
        GAME_2_CLIENT_SENDCHAT = 175,
        // 【游戏服】广播准备
        GAME_2_CLIENT_RREADY = 176,
        // 【游戏服】发牌阶段,等待4秒后开始叫地主
        GAME_2_CLIENT_SENDCARD = 177,
        // 【游戏服】广播叫地主
        GAME_2_CLIENT_CALLLANDOWNER = 178,
        // 【游戏服】广播下一位叫地主
        GAME_2_CLIENT_TURNCALLLAND = 179,
        // 【游戏服】叫地主结束,开始游戏
        GAME_2_CLIENT_CALLLANDOVER = 180,
        // 【游戏服】广播轮到下一位出牌
        GAME_2_CLIENT_TURNPLAY = 181,
        // 【游戏服】广播出牌内容
        GAME_2_CLIENT_SHOWPLAY = 182,
        // 【客户端】广播托管
        GAME_2_CLIENT_AUTO = 183,
        // 【游戏服】游戏结束
        GAME_2_CLIENT_GAMEOVER = 184,
        // 【游戏服】活动结束，等待剩余玩家打完比赛
        GAME_2_CLIENT_WAIT_ACTIVITY_END = 185,
        // 【网关服】活动人数
        GATE_2_CLIENT_ACTIVITY_ONLINE = 186,
        // 【中心服】发送活动金币
        CENTER_2_CLIENT_ADD_FREE_MONEY = 187,


        //Matchvs消息定义。



        //创建房间
        GAME_CREATE_ROOM = 200,
        //加入房间
        GAME_JOIN_ROOM = 201,
        //房间有人加入
        GAME_JOIN_ROOM_NOTIFY = 202,
        //房间人满
        GAME_ROOM_PLAYER_FILL = 203,
        //开始游戏
        GAME_START_GAME = 204,

        //gameServer模式下，
        MATCHVS_GAME_SERVER_LOGIN_ROOM =299,
        //准备动作
        MATCHVS_GAME_SERVER_READ = 300,
    }
}

