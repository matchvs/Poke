/**
 * Created by Administrator on 2016/1/1.
 */
// note: 使用数字,节省
var enums;
(function (enums) {
    var NetEnum;
    (function (NetEnum) {
        // -----------【 系 统 】消息------------
        //探测服务器是否有返回,ping
        NetEnum[NetEnum["NET_C2S_PING"] = 4] = "NET_C2S_PING";
        //登陆服务器
        NetEnum[NetEnum["NET_CSC_LOGIN"] = 5] = "NET_CSC_LOGIN";
        //登陆服务器
        NetEnum[NetEnum["NET_CSC_LOGIN_DEBUG"] = 18] = "NET_CSC_LOGIN_DEBUG";
        // -----------【中心服】消息------------
        // 【客户端】资源加载完成，接收服务器初始化消息
        NetEnum[NetEnum["CLIENT_2_CENTER_LOGIN_OK"] = 51] = "CLIENT_2_CENTER_LOGIN_OK";
        // 【客户端】请求登陆房间
        NetEnum[NetEnum["CLIENT_2_CENTER_REQ_BATTLE"] = 52] = "CLIENT_2_CENTER_REQ_BATTLE";
        // -----------【游戏服】消息------------
        // 【客户端】聊天和表情
        NetEnum[NetEnum["CLIENT_2_GAME_SENDCHAT"] = 112] = "CLIENT_2_GAME_SENDCHAT";
        // 【客户端】按下准备
        NetEnum[NetEnum["CLIENT_2_GAME_READY"] = 113] = "CLIENT_2_GAME_READY";
        // 【客户端】叫分抢地主
        NetEnum[NetEnum["CLIENT_2_GAME_CALLLANDOWNER"] = 114] = "CLIENT_2_GAME_CALLLANDOWNER";
        // 【客户端】请求出牌
        NetEnum[NetEnum["CLIENT_2_GAME_SHOWCARD"] = 115] = "CLIENT_2_GAME_SHOWCARD";
        // 【客户端】请求托管
        NetEnum[NetEnum["CLIENT_2_GAME_AUTO"] = 116] = "CLIENT_2_GAME_AUTO";
        // 【客户端】请求换桌
        NetEnum[NetEnum["GAME_CENTER_2_GAME_GAMERESULT"] = 118] = "GAME_CENTER_2_GAME_GAMERESULT";
        // 【客户端】请求退出游戏服
        NetEnum[NetEnum["CLIENT_2_GAME_REQ_EXIT"] = 120] = "CLIENT_2_GAME_REQ_EXIT";
        // -----------【客户端】消息------------
        // 【中心服】登陆游戏大厅
        NetEnum[NetEnum["CENTER_2_CLIENT_LOGIN_LOBBY"] = 171] = "CENTER_2_CLIENT_LOGIN_LOBBY";
        // 【中心服】活动信息
        // 【游戏服】我登陆房间
        NetEnum[NetEnum["GAME_2_CLIENT_INIT_ROOM"] = 172] = "GAME_2_CLIENT_INIT_ROOM";
        // 【游戏服】其他人登陆房间
        NetEnum[NetEnum["GAME_2_CLIENT_OTHER_ENTER_ROOM"] = 173] = "GAME_2_CLIENT_OTHER_ENTER_ROOM";
        // 【游戏服】广播玩家退出
        NetEnum[NetEnum["GAME_2_CLIENT_PLAYEROUT"] = 174] = "GAME_2_CLIENT_PLAYEROUT";
        // 【游戏服】广播聊天
        NetEnum[NetEnum["GAME_2_CLIENT_SENDCHAT"] = 175] = "GAME_2_CLIENT_SENDCHAT";
        // 【游戏服】广播准备
        NetEnum[NetEnum["GAME_2_CLIENT_RREADY"] = 176] = "GAME_2_CLIENT_RREADY";
        // 【游戏服】发牌阶段,等待4秒后开始叫地主
        NetEnum[NetEnum["GAME_2_CLIENT_SENDCARD"] = 177] = "GAME_2_CLIENT_SENDCARD";
        // 【游戏服】广播叫地主
        NetEnum[NetEnum["GAME_2_CLIENT_CALLLANDOWNER"] = 178] = "GAME_2_CLIENT_CALLLANDOWNER";
        // 【游戏服】广播下一位叫地主
        NetEnum[NetEnum["GAME_2_CLIENT_TURNCALLLAND"] = 179] = "GAME_2_CLIENT_TURNCALLLAND";
        // 【游戏服】叫地主结束,开始游戏
        NetEnum[NetEnum["GAME_2_CLIENT_CALLLANDOVER"] = 180] = "GAME_2_CLIENT_CALLLANDOVER";
        // 【游戏服】广播轮到下一位出牌
        NetEnum[NetEnum["GAME_2_CLIENT_TURNPLAY"] = 181] = "GAME_2_CLIENT_TURNPLAY";
        // 【游戏服】广播出牌内容
        NetEnum[NetEnum["GAME_2_CLIENT_SHOWPLAY"] = 182] = "GAME_2_CLIENT_SHOWPLAY";
        // 【客户端】广播托管
        NetEnum[NetEnum["GAME_2_CLIENT_AUTO"] = 183] = "GAME_2_CLIENT_AUTO";
        // 【游戏服】游戏结束
        NetEnum[NetEnum["GAME_2_CLIENT_GAMEOVER"] = 184] = "GAME_2_CLIENT_GAMEOVER";
        // 【游戏服】活动结束，等待剩余玩家打完比赛
        NetEnum[NetEnum["GAME_2_CLIENT_WAIT_ACTIVITY_END"] = 185] = "GAME_2_CLIENT_WAIT_ACTIVITY_END";
        // 【网关服】活动人数
        NetEnum[NetEnum["GATE_2_CLIENT_ACTIVITY_ONLINE"] = 186] = "GATE_2_CLIENT_ACTIVITY_ONLINE";
        // 【中心服】发送活动金币
        NetEnum[NetEnum["CENTER_2_CLIENT_ADD_FREE_MONEY"] = 187] = "CENTER_2_CLIENT_ADD_FREE_MONEY";
        //Matchvs消息定义。
        //创建房间
        NetEnum[NetEnum["GAME_CREATE_ROOM"] = 200] = "GAME_CREATE_ROOM";
        //加入房间
        NetEnum[NetEnum["GAME_JOIN_ROOM"] = 201] = "GAME_JOIN_ROOM";
        //房间有人加入
        NetEnum[NetEnum["GAME_JOIN_ROOM_NOTIFY"] = 202] = "GAME_JOIN_ROOM_NOTIFY";
        //房间人满
        NetEnum[NetEnum["GAME_ROOM_PLAYER_FILL"] = 203] = "GAME_ROOM_PLAYER_FILL";
        //开始游戏
        NetEnum[NetEnum["GAME_START_GAME"] = 204] = "GAME_START_GAME";
    })(NetEnum = enums.NetEnum || (enums.NetEnum = {}));
})(enums || (enums = {}));
//# sourceMappingURL=NetEnum.js.map