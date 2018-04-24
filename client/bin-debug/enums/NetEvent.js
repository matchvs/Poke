var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Administrator on 2016/1/1.
 */
var enums;
(function (enums) {
    //客户端专用网络事件
    var NetEvent = (function () {
        function NetEvent() {
        }
        NetEvent.NETEVENT_CONNECT = "NETEVENT_CONNECT"; //socket连接成功
        NetEvent.NETEVENT_CLOSE = "NETEVENT_CLOSE"; //socket关闭
        NetEvent.NETEVENT_ERROR = "NETEVENT_ERROR"; //socket错误
        NetEvent.NETEVENT_PING = "NETEVENT_PING"; //socket错误
        NetEvent.NETEVENT_LOGINSUCESS = "NETEVENT_LOGINSUCESS"; //登陆成功
        NetEvent.NETEVENT_ROOMIN = "NETEVENT_ROOMIN"; //进入房间
        NetEvent.NETEVENT_OTHERPLAYERIN = "NETEVENT_PLAYERIN"; //其他玩家进入房间
        NetEvent.NETEVENT_SENDCARD = "NETEVENT_SENDCARD"; //系统发牌
        NetEvent.NETEVENT_TURNCALLLAND = "NETEVENT_TURNCALLLAND"; //轮流叫地主
        NetEvent.NETEVENT_OTHERCALLLAND = "NETEVENT_OTHERCALLLAND"; //其他玩家叫分
        NetEvent.NETEVENT_CALLLANDOVER = "NETEVENT_CALLLANDOVER"; //其他玩家叫分
        NetEvent.NETEVENT_TURNPALY = "NETEVENT_TURNPALY"; //主玩家出牌
        NetEvent.NETEVENT_SHOWPALY = "NETEVENT_SHOWPALY"; //其他玩家出牌,
        NetEvent.NETEVENT_GAMEOVER = "NETEVENT_GAMEOVER"; //游戏结束,
        NetEvent.NETEVENT_SENDCHAT = "NETEVENT_SENDCHAT"; //聊天,
        NetEvent.NETEVENT_READY = "NETEVENT_READY"; //准备,
        NetEvent.NETEVENT_PLAYEROUT = "NETEVENT_PLAYEROUT"; //玩家离开,
        NetEvent.NETEVENT_AUTO = "NETEVENT_AUTO"; //玩家托管,
        NetEvent.NETEVENT_ACTIVITYONLINE = "NETEVENT_ACTIVITYONLINE"; //玩家活动人数提示,走马灯,
        NetEvent.NETEVENT_WAITACTIVITYEND = "NETEVENT_WAITACTIVITYEND"; //活动打完等待活动结束
        NetEvent.NETEVENT_LOBBYIN = "NETEVENT_LOBBYIN"; //进入大厅
        NetEvent.NETEVENT_ADDFREEMONEY = "NETEVENT_ADDFREEMONEY"; //送金币
        return NetEvent;
    }());
    enums.NetEvent = NetEvent;
    __reflect(NetEvent.prototype, "enums.NetEvent");
})(enums || (enums = {}));
//# sourceMappingURL=NetEvent.js.map