var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    var GameData = (function () {
        function GameData() {
        }
        GameData.IsRobot_Offline = true; //是否单机
        GameData.IsInNative = false; //是否在原生中          //根据环境动态更改
        GameData.IsDebug = true; // 不使用sdk登陆
        GameData.IsPrompt = true; //是否自动提示
        GameData.IsActivityKick = false;
        // 服务器地址
        GameData.SERVER_IP = "http://dmhd123.f3322.net:8009/getGateServer"; //"http://127.0.0.1:8000/getGateServer" "http://dmhd123.f3322.net:8009/getGateServer";//"http://127.0.0.1:8000/getGateServer""http://dmhd123.f3322.net:8009/getGateServer";//"http://127.0.0.1:8000/getGateServer";
        GameData.SERVER_URL = "127.0.0.1:8001";
        //游戏类型
        GameData.GameFlag_offline = 2; //单机
        GameData.GameFlag_Rapid = 1; //快速进入
        GameData.GameFlag_Activity = 2; //比赛比赛flag=rapid
        GameData.GameFlag_Group = 3; //群,
        GameData.GameFlag_Challenge = "challenge"; //挑战排行榜
        GameData.GameFlag_Defender = "defender"; //被挑战的人进入游戏标志
        //app传入值,玩家属性值
        GameData.token = "";
        GameData.flag = 0;
        GameData.userid = "";
        GameData.groupid = "";
        GameData.nickname = "";
        GameData.avatar = "";
        GameData.integral = 0;
        GameData.money = 0;
        GameData.playerGuid = 0;
        GameData.IsAuto = false;
        return GameData;
    }());
    data.GameData = GameData;
    __reflect(GameData.prototype, "data.GameData");
})(data || (data = {}));
//# sourceMappingURL=GameData.js.map