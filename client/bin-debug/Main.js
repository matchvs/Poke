var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var numberToBlendMode = egret.sys.numberToBlendMode;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        /**
         * 引擎初始化回调
         */
        _this.initResponse = function (status) {
            if (status === 200) {
                PokesData.engine.registerUser();
            }
            else {
                egret.log("初始化失败，错误码" + status);
            }
        };
        /**
     * 注册用户会掉函数
     */
        _this.registerUserResponse = function (userInfo) {
            if (userInfo.status === 0) {
                egret.log("注册用户成功");
                //将ID存储到本地
                data.GameData.userid = userInfo.id;
                egret.localStorage.setItem("userId", String(userInfo.id));
                //token
                egret.localStorage.setItem("token", userInfo.token);
                data.GameData.token = userInfo.token;
                //姓名
                egret.localStorage.setItem("name", userInfo.name);
                data.GameData.nickname = userInfo.name;
            }
            else {
                egret.log("注册用户失败,错误码:" + userInfo.status);
            }
        };
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.reconnect = function () {
        Main.instance.preloadover(null);
    };
    Main.prototype.onAddToStage = function (event) {
        Config.StageWidth = this.stage.stageWidth;
        Config.StageHeight = this.stage.stageHeight;
        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
        LayerMgr.Instance.Init(this);
        //判断系统类型
        this.setos();
        //设置加载进度界面
        windowui.LoadingInst.Instance.Show();
        windowui.LoadingInst.Instance.SetText("正在打开游戏");
        //todo 先将应用初始化
        LoadMgr.Instance.Init();
        var channel = "MatchVS";
        var platform = "alpha";
        this.status = PokesData.engine.init(PokesData.response, channel, platform, PokesData.gameID);
        PokesData.response.registerUserResponse = this.registerUserResponse.bind(this);
        PokesData.response.initResponse = this.initResponse.bind(this);
        LoadMgr.Instance.addEventListener(LoadMgr.LOADOVER_PRELOAD, this.preloadover, this);
        LoadMgr.Instance.addEventListener(LoadMgr.LOADOVER_LOBBY, this.createScene, this);
        this.stage.addEventListener(egret.Event.RESIZE, this.resizefun, this);
        Main.instance = this;
        this.pushHistory();
        window.addEventListener("popstate", function (e) {
            alert("离开将开启自动托管"); //根据自己的需求实现自己的功能 
        }, false);
    };
    /**
     * 修改网页url
     */
    Main.prototype.pushHistory = function () {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    };
    Main.prototype.setos = function () {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            Config.System = "Android";
        }
        else if (u.indexOf('iPhone') > -1) {
            Config.System = "iPhone";
        }
        else if (u.indexOf('Windows Phone') > -1) {
            Config.System = "Windows Phone";
        }
        else if (u.indexOf('Windows') > -1) {
            Config.System = "Windows";
        }
    };
    Main.prototype.resizefun = function (e) {
        if (e === void 0) { e = null; }
        var currWidth = this.stage.stageWidth;
        var currHeight = this.stage.stageHeight;
        trace("Main-resizefun->", currWidth, currHeight);
    };
    /**
     * 此处替换为注册登录逻辑。
     */
    Main.prototype.preloadover = function (e) {
        LoadMgr.Instance.removeEventListener(LoadMgr.LOADOVER_PRELOAD, this.preloadover, this);
        windowui.LoadingInst.Instance.setSkin();
        windowui.LoadingInst.Instance.SetText("正在获取身份信息");
        if (!data.GameData.IsDebug) {
            EgretSDKMgr.Instance.addEventListener(enums.NativeEvent.NATIVEEVENT_GETINITINFO, this.onGetNativeInfo, this);
            EgretSDKMgr.Instance.Init();
        }
        else {
            //测试
            NativeMgr.Instance.addEventListener(enums.NativeEvent.NATIVEEVENT_GETINITINFO, this.onGetNativeInfo, this);
            var txt1 = new egret.TextField();
            txt1.text = "用户id:";
            txt1.textColor = 0xffffff;
            txt1.textAlign = egret.HorizontalAlign.RIGHT;
            txt1.width = 140;
            txt1.x = 0;
            txt1.y = 50;
            var input1 = new egret.TextField();
            input1.type = egret.TextFieldType.INPUT;
            input1.width = 300;
            input1.x = 150;
            input1.y = 50;
            input1.background = true;
            input1.textColor = 0xff0000;
            var debugfun = function () {
                var tempobj = {
                    type: "connect",
                    value: {
                        userid: "userid" + input1.text,
                        nickName: input1.text,
                        avatar: "http://uc.9ria.com/data/avatar/000/06/11/49_avatar_middle.jpg",
                        integral: "0"
                    }
                };
                txt1.parent.removeChild(txt1);
                input1.parent.removeChild(input1);
                var callback = JSON.stringify(tempobj);
                NativeMgr.Instance.Native2JS(callback);
                this.onConnect(null);
            };
            input1.addEventListener(egret.TextEvent.FOCUS_OUT, debugfun, this);
            this.addChild(txt1);
            this.addChild(input1);
            this.onGetNativeInfo(null);
        }
        Main.textlog = new egret.TextField();
        Main.textlog.touchEnabled = false;
        this.addChild(Main.textlog);
    };
    Main.prototype.onGetNativeInfo = function (e) {
        // var playerinfo: any = e.data;
        // if(!data.GameData.IsDebug) {
        //     data.GameData.token = playerinfo.token
        // }  else {
        //     data.GameData.userid = playerinfo.userid;
        //     data.GameData.nickname = playerinfo.nickName;
        //     data.GameData.avatar = playerinfo.avatar;
        // }
        windowui.LoadingInst.Instance.SetText("正在获取服务器地址");
        var url = data.GameData.SERVER_IP;
        var loader = new egret.URLLoader();
        // 设置返回数据格式
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.GET;
        loader.addEventListener(egret.Event.COMPLETE, this.onGetIpOver, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
            if (data.GameData.IsRobot_Offline) {
                return;
            }
            NetMgr.Instance.addEventListener(enums.NetEvent.NETEVENT_CONNECT, this.onConnect, this);
            NetMgr.Instance.showDisTips();
            loader.load(request);
        }, this);
        loader.load(request);
    };
    Main.prototype.onGetIpOver = function (e) {
        var loader = (e.target);
        var ips = loader.data.toString();
        if (ips == "-1") {
            NetMgr.Instance.addEventListener(enums.NetEvent.NETEVENT_CONNECT, this.onConnect, this);
            NetMgr.Instance.showDisTips();
            return;
        }
        data.GameData.SERVER_URL = ips;
        trace("服务器地址获取成功" + ips);
        windowui.LoadingInst.Instance.SetText("正在连接服务器");
        NetMgr.Instance.addEventListener(enums.NetEvent.NETEVENT_CONNECT, this.onConnect, this);
        NetMgr.Instance.Connect();
    };
    Main.prototype.onConnect = function (e) {
        NetMgr.Instance.removeEventListener(enums.NetEvent.NETEVENT_CONNECT, this.onConnect, this);
        var value = {};
        value.time = egret.getTimer();
        value.sign = "sign";
        if (!data.GameData.IsDebug) {
            value.token = data.GameData.token;
            NetMgr.Instance.SendMsg(enums.NetEnum.NET_CSC_LOGIN, value);
        }
        else {
            value.userid = data.GameData.userid;
            value.nickname = data.GameData.nickname;
            value.avatar = data.GameData.avatar;
            NetMgr.Instance.SendMsg(enums.NetEnum.NET_CSC_LOGIN_DEBUG, value);
        }
    };
    Main.prototype.onLogin = function (e) {
        var valueobj = JSON.parse(e.data.value);
        data.GameData.playerGuid = 1; //valueobj.guid;
        data.GameData.money = valueobj.money;
        data.GameData.nickname = valueobj.name;
        data.GameData.avatar = valueobj.pic;
        NetMgr.Instance.removeEventListener(enums.NetEvent.NETEVENT_LOGINSUCESS, this.onLogin, this);
        LoadMgr.Instance.Load("lobby");
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createScene = function (e) {
        LocalMgr.Instance.LoadData();
        LoadMgr.Instance.removeEventListener(LoadMgr.LOADOVER_LOBBY, this.createScene, this);
        windowui.LoadingInst.Instance.Hide();
        SceneMgr.Instance.ShowScene(scene.LobbyScene);
        // 发送成功
        NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_CENTER_LOGIN_OK);
    };
    Main.instance = null;
    /**
     * 加载进度界面
     * loading process interface
     */
    Main.textlog = null;
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map