/**
 *
 * 网络管理,发送接受发事件
 * @author
 *
 */
var NetMgr = (function (_super) {
    __extends(NetMgr, _super);
    function NetMgr() {
        _super.call(this);
        this._socketBase = null;
        this._concecttime = 0;
        this._timer = new egret.Timer(6000);
        this._socketBase = new net.SocketBase();
        this._socketBase.addEventListener(net.SocketBase.Event_Open, this.onSocketOpen, this);
        this._socketBase.addEventListener(net.SocketBase.Event_Close, this.onSocketClose, this);
        this._socketBase.addEventListener(net.SocketBase.Event_Error, this.onSocketError, this);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    }
    var d = __define,c=NetMgr;p=c.prototype;
    p.onTimer = function (e) {
        this.SendMsg(enums.NetEnum.NET_C2S_PING);
    };
    d(p, "IsConnect"
        ,function () {
            if (data.GameData.IsRobot_Offline) {
                return true;
            }
            return this._socketBase.IsConnect;
        }
    );
    p.onSocketOpen = function () {
        //trace("NetMgr::onSocketOpen->");
        this.dispatchEvent(new egret.Event(enums.NetEvent.NETEVENT_CONNECT));
        if (windowui.SysTipsInst.Instance.getText() == "网络已断开,正在重连" || "网络已断开,正在重连" == windowui.SysTipsInst.Instance.getText()) {
            windowui.SysTipsInst.Instance.Hide();
        }
        if (this._concecttime > 0) {
            Main.reconnect();
        }
        this._timer.start();
        this._concecttime++;
    };
    p.onSocketClose = function () {
        //trace("NetMgr::onSocketClose->");
        this.dispatchEvent(new egret.Event(enums.NetEvent.NETEVENT_CLOSE));
        if (data.GameData.IsRobot_Offline) {
            return;
        }
        this.showDisTips();
        if (this._concecttime >= NetMgr.RENETTIME) {
            return;
        }
        egret.setTimeout(function () {
            this.Connect();
        }, this, 15000);
    };
    p.showDisTips = function () {
        if (windowui.ActivityOverInst.Instance.IsActOver) {
            windowui.SysTipsInst.Instance.Hide();
            this._concecttime = NetMgr.RENETTIME;
            return;
        }
        if (data.GameData.flag == data.GameData.GameFlag_Activity && this._concecttime > 0) {
            windowui.SysTipsInst.Instance.Hide();
            this._concecttime = NetMgr.RENETTIME;
            windowui.SysTipsInst.Instance.Show("没有活动资格,无法进入活动", function () {
                NativeMgr.Instance.ExitWindow();
            }, this, true, "退出游戏");
        }
        if (data.GameData.IsActivityKick) {
            windowui.SysTipsInst.Instance.Hide();
            this._concecttime = NetMgr.RENETTIME;
            windowui.SysTipsInst.Instance.Show("您的比赛积分不足,无法继续游戏,欢迎下次再次挑战", function () {
                NativeMgr.Instance.ExitWindow();
            }, this, true, "退出游戏");
            return;
        }
        this._concecttime++;
        //if(this._concecttime<3)
        //{
        //    windowui.SysTipsInst.Instance.Show("网络已断开,正在重连");
        //    return;
        //}
        windowui.SysTipsInst.Instance.Show("网络已断开,正在重连", function () {
        }, this);
    };
    p.onSocketError = function () {
        trace("NetMgr::onSocketError->");
        this.dispatchEvent(new egret.Event(enums.NetEvent.NETEVENT_ERROR));
        if (data.GameData.IsRobot_Offline) {
            return;
        }
        this.showDisTips();
    };
    d(NetMgr, "Instance"
        ,function () {
            if (NetMgr._instance == null) {
                NetMgr._instance = new NetMgr();
            }
            return NetMgr._instance;
        }
    );
    /**
     * 连接服务器
     * @constructor
     */
    p.Connect = function () {
        if (data.GameData.IsRobot_Offline) {
            return;
        }
        this._socketBase.connet(data.GameData.SERVER_URL);
    };
    /**
     * 发送消息
     * @param str
     * @constructor
     */
    p.SendMsg = function (type, value) {
        if (value === void 0) { value = null; }
        //启动单机
        if (data.GameData.IsRobot_Offline && type != enums.NetEnum.NET_C2S_PING) {
            var obj = {};
            obj.type = enums.NetEnum.NET_C2S_PING; // 4
            obj.value = value;
            var str = JSON.stringify(obj);
            return RobotGameMgr.Instance.SendMsg(type, value);
        }
        if (value == null) {
            value = {};
        }
        if (value.playerGuid == null) {
            value.playerGuid = data.GameData.playerGuid;
        }
        //服务器
        var obj = {};
        obj.type = type;
        obj.value = value;
        var str = JSON.stringify(obj);
        this._socketBase.sendDataByString(str);
    };
    // 接受消息
    p.OnMessage = function (str) {
        var obj = JSON.parse(str);
        var eventtype = "";
        switch (obj.type) {
            case null:
                return;
            case enums.NetEnum.NET_C2S_PING:
                eventtype = enums.NetEvent.NETEVENT_PING;
                return;
            case enums.NetEnum.NET_CSC_LOGIN:
                eventtype = enums.NetEvent.NETEVENT_LOGINSUCESS;
                data.GameData.playerGuid = obj.value;
                data.GameData.money = obj.money;
                if ((this._concecttime > 1 && SceneMgr.Instance.GetCurrentScene() != null)) {
                    this.SendMsg(enums.NetEnum.CLIENT_2_CENTER_LOGIN_OK);
                    return;
                }
                break;
            case enums.NetEnum.GAME_2_CLIENT_INIT_ROOM:
                eventtype = enums.NetEvent.NETEVENT_ROOMIN;
                break;
            case enums.NetEnum.GAME_2_CLIENT_OTHER_ENTER_ROOM:
                eventtype = enums.NetEvent.NETEVENT_OTHERPLAYERIN;
                break;
            case enums.NetEnum.GAME_2_CLIENT_SENDCARD:
                eventtype = enums.NetEvent.NETEVENT_SENDCARD;
                break;
            case enums.NetEnum.GAME_2_CLIENT_TURNCALLLAND:
                eventtype = enums.NetEvent.NETEVENT_TURNCALLLAND;
                break;
            // 别人叫了对叫地主的处理,0,1,2,3
            case enums.NetEnum.GAME_2_CLIENT_CALLLANDOWNER:
                eventtype = enums.NetEvent.NETEVENT_OTHERCALLLAND;
                break;
            case enums.NetEnum.GAME_2_CLIENT_CALLLANDOVER:
                eventtype = enums.NetEvent.NETEVENT_CALLLANDOVER;
                break;
            case enums.NetEnum.GAME_2_CLIENT_TURNPLAY:
                eventtype = enums.NetEvent.NETEVENT_TURNPALY;
                break;
            case enums.NetEnum.GAME_2_CLIENT_SHOWPLAY:
                eventtype = enums.NetEvent.NETEVENT_SHOWPALY;
                break;
            case enums.NetEnum.GAME_2_CLIENT_GAMEOVER:
                eventtype = enums.NetEvent.NETEVENT_GAMEOVER;
                break;
            case enums.NetEnum.GAME_2_CLIENT_SENDCHAT:
                eventtype = enums.NetEvent.NETEVENT_SENDCHAT;
                break;
            case enums.NetEnum.GAME_2_CLIENT_RREADY:
                eventtype = enums.NetEvent.NETEVENT_READY;
                break;
            case enums.NetEnum.GAME_2_CLIENT_PLAYEROUT:
                eventtype = enums.NetEvent.NETEVENT_PLAYEROUT;
                break;
            case enums.NetEnum.GAME_2_CLIENT_AUTO:
                eventtype = enums.NetEvent.NETEVENT_AUTO;
                break;
            case enums.NetEnum.GATE_2_CLIENT_ACTIVITY_ONLINE:
                eventtype = enums.NetEvent.NETEVENT_ACTIVITYONLINE;
                break;
            case enums.NetEnum.GAME_2_CLIENT_WAIT_ACTIVITY_END:
                eventtype = enums.NetEvent.NETEVENT_WAITACTIVITYEND;
                break;
            case enums.NetEnum.CENTER_2_CLIENT_LOGIN_LOBBY:
                eventtype = enums.NetEvent.NETEVENT_LOBBYIN;
                break;
            case enums.NetEnum.CENTER_2_CLIENT_ADD_FREE_MONEY:
                eventtype = enums.NetEvent.NETEVENT_ADDFREEMONEY;
                break;
            default:
                break;
        }
        this.dispatchEvent(new egret.Event(eventtype, false, false, obj));
    };
    p.Exit = function () {
        this._socketBase.Close();
    };
    NetMgr._instance = null;
    NetMgr.RENETTIME = 100; //断线重连次数,超过此不重连
    return NetMgr;
})(egret.EventDispatcher);
egret.registerClass(NetMgr,"NetMgr");
