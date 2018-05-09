/**
 *
 * 网络管理,发送接受发事件
 * @author
 *
 */
class NetMgr extends egret.EventDispatcher {
    private _socketBase: net.SocketBase = null;
    private static _instance: NetMgr = null;
    private _concecttime: number = 0;
    private static RENETTIME: number = 100;        //断线重连次数,超过此不重连

    private _timer: egret.Timer = new egret.Timer(6000);

    public constructor() {
        super();
        this._socketBase = new net.SocketBase();
        this._socketBase.addEventListener(net.SocketBase.Event_Open, this.onSocketOpen, this);
        this._socketBase.addEventListener(net.SocketBase.Event_Close, this.onSocketClose, this);
        this._socketBase.addEventListener(net.SocketBase.Event_Error, this.onSocketError, this);

        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    }

    public onTimer(e: egret.TimerEvent): void {
        this.SendMsg(enums.NetEnum.NET_C2S_PING);
    }

    public get IsConnect(): boolean {
        if (data.GameData.IsRobot_Offline) {
            return true;
        }
        return this._socketBase.IsConnect;
    }

    public onSocketOpen(): void {
        //trace("NetMgr::onSocketOpen->");
        this.dispatchEvent(new egret.Event(enums.NetEvent.NETEVENT_CONNECT));
        if (windowui.SysTipsInst.Instance.getText() == "网络已断开,正在重连" || "网络已断开,正在重连" == windowui.SysTipsInst.Instance.getText()) {
            windowui.SysTipsInst.Instance.Hide();
        }
        if (this._concecttime > 0)     //断线重连,重发login,第一次不发
        {
            Main.reconnect();
//            var value:any={};
//            value.userid= data.GameData.userid;
//            value.flag=data.GameData.flag;
//            value.groupid=data.GameData.groupid;
//            value.nickname=data.GameData.nickname;
//            value.avatar=data.GameData.avatar;
//            value.integral=data.GameData.integral;
//            value.money=data.GameData.money;
//            this.SendMsg(enums.NetEnum.NET_CSC_LOGIN,value);
        }
        this._timer.start();
        this._concecttime++;
    }

    private onSocketClose(): void {
        //trace("NetMgr::onSocketClose->");
        this.dispatchEvent(new egret.Event(enums.NetEvent.NETEVENT_CLOSE));
        if (data.GameData.IsRobot_Offline) {
            return;
        }
        this.showDisTips();
        if (this._concecttime >= NetMgr.RENETTIME) {
            return;
        }
        egret.setTimeout(function (): void {
            this.Connect();
        }, this, 15000);
    }

    public showDisTips(): void {
        if (windowui.ActivityOverInst.Instance.IsActOver)            //活动结束
        {
            windowui.SysTipsInst.Instance.Hide();
            this._concecttime = NetMgr.RENETTIME;
            return;
        }
        if (data.GameData.flag == data.GameData.GameFlag_Activity && this._concecttime > 0)  //活动踢人
        {
            windowui.SysTipsInst.Instance.Hide();
            this._concecttime = NetMgr.RENETTIME;

            windowui.SysTipsInst.Instance.Show("没有活动资格,无法进入活动", function (): void {
                NativeMgr.Instance.ExitWindow();
            }, this, true, "退出游戏");
        }
        if (data.GameData.IsActivityKick)                            //活动被踢
        {
            windowui.SysTipsInst.Instance.Hide();
            this._concecttime = NetMgr.RENETTIME;

            windowui.SysTipsInst.Instance.Show("您的比赛积分不足,无法继续游戏,欢迎下次再次挑战", function (): void {
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
        windowui.SysTipsInst.Instance.Show("网络已断开,正在重连", function (): void {
        }, this);
    }

    private onSocketError(): void {
        trace("NetMgr::onSocketError->");
        this.dispatchEvent(new egret.Event(enums.NetEvent.NETEVENT_ERROR));
        if (data.GameData.IsRobot_Offline) {
            return;
        }
        this.showDisTips();
    }

    public static get Instance(): NetMgr {
        if (NetMgr._instance == null) {
            NetMgr._instance = new NetMgr();
        }
        return NetMgr._instance;
    }

    /**
     * 连接服务器
     * @constructor
     */
    public Connect(): void {
        if (data.GameData.IsRobot_Offline) {
            return;
        }
        this._socketBase.connet(data.GameData.SERVER_URL);
    }

    /**
     * 发送消息
     * @param str
     * @constructor
     */
    public SendMsg(type: number, value: any = null): void {
        //启动单机
        if (data.GameData.IsRobot_Offline && type != enums.NetEnum.NET_C2S_PING) {
            var obj: any = {};
            obj.type = enums.NetEnum.NET_C2S_PING; // 4
            obj.value = value;
            var str: string = JSON.stringify(obj);
            return RobotGameMgr.Instance.SendMsg(type, value);
        }
        if (value == null) {
            value = {};
        }
        if (value.playerGuid == null) {
            value.playerGuid = data.GameData.playerGuid;
        }
        //服务器
        var obj: any = {};
        obj.type = type;
        obj.value = value;
        var str: string = JSON.stringify(obj);
        //this._socketBase.sendDataByString(str);
        //Matchvs 服务 
        switch (type) {
            //创建房间
            case enums.NetEnum.GAME_CREATE_ROOM:
                RobotGameMgr.Instance.SendMsg(type, value)
                break;
            //加入房间
            case enums.NetEnum.GAME_JOIN_ROOM:
                RobotGameMgr.Instance.SendMsg(type, value)
                break;
            case enums.NetEnum.GAME_START_GAME:
                RobotGameMgr.Instance.SendMsg(type,value);

                PokesData.engine.joinOver("china no 1");
                break;
                //进入房间
            case enums.NetEnum.MATCHVS_GAME_SERVER_LOGIN_ROOM:
                RobotGameMgr.Instance.SendMsg(type, value);
                break;
                //准备动作
            case enums.NetEnum.MATCHVS_GAME_SERVER_READ:
                break;
            case enums.NetEnum.MATCHVS_GAME_SEND_CARD:
                break;
                //下一个地主产生的玩家
            case enums.NetEnum.MATCHVS_GAME_GRAB_LANDLORD:
                RobotGameMgr.Instance.SendMsg(type, value);
                break;
                //地主产生
            case enums.NetEnum.GAME_2_CLIENT_CALLLANDOVER:
                RobotGameMgr.Instance.SendMsg(type, value);
                break;
            case enums.NetEnum.CLIENT_2_GAME_SHOWCARD:
                RobotGameMgr.Instance.SendMsg(type,value);
                break;
                //游戏结束
            case enums.NetEnum.GAME_2_CLIENT_GAMEOVER:
                RobotGameMgr.Instance.SendMsg(type,value);
                break;
            case enums.NetEnum.CLIENT_2_GAME_REQ_EXIT:
                RobotGameMgr.Instance.SendMsg(type,value);
                break;

            case enums.NetEnum.GAME_SHARE_WX:
                RobotGameMgr.Instance.SendMsg(type,value);
                break;
             default:
                break;
        }

    }


    // 接受消息
    public OnMessage(type: number, value: any = null): void {
        // var obj: any = JSON.parse(str);
        var eventtype: string = "";
        switch (type) {
            //Matchvs 专用逻辑模块
            case null:
                return;

            case enums.NetEnum.GAME_ROOM_PLAYER_FILL:

                return;
            case enums.NetEnum.NET_C2S_PING:
                eventtype = enums.NetEvent.NETEVENT_PING;
                return;
            case enums.NetEnum.NET_CSC_LOGIN:
                // eventtype = enums.NetEvent.NETEVENT_LOGINSUCESS;
                // data.GameData.playerGuid = obj.value;
                // data.GameData.money = obj.money;
                // if ((this._concecttime > 1 && SceneMgr.Instance.GetCurrentScene() != null))      //第二次登陆的话直接内部处理,
                // {
                //     this.SendMsg(enums.NetEnum.CLIENT_2_CENTER_LOGIN_OK);
                //     return;
                // }
                break;
                //发送进入房间的消息
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
            default :
                break;
        }
        this.dispatchEvent(new egret.Event(eventtype, false, false, value));
    }

    public Exit(): void {
        this._socketBase.Close();
    }

}
