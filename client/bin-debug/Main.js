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
                windowui.LoadingInst.Instance.SetText("初始化成功");
                PokesData.engine.registerUser();
            }
            else {
                egret.log("初始化失败，错误码" + status);
            }
        };
        /**
         * 注册用户回调函数
         */
        _this.registerUserResponse = function (userInfo) {
            if (userInfo.status === 0) {
                egret.log("注册用户成功");
                //将ID存储到本地
                data.GameData.userid = userInfo.id;
                egret.localStorage.setItem("userId", String(userInfo.id));
                data.GameData.playerGuid = 1;
                //token
                egret.localStorage.setItem("token", userInfo.token);
                data.GameData.token = userInfo.token;
                //姓名
                egret.localStorage.setItem("name", userInfo.name);
                data.GameData.nickname = userInfo.name;
                this.login(userInfo.id, userInfo.token);
                windowui.LoadingInst.Instance.SetText("注册用户成功");
            }
            else {
                egret.log("注册用户失败,错误码:" + userInfo.status);
            }
        };
        /**
         * 登录回调函数
         */
        _this.loginResponse = function (onLogin) {
            if (onLogin.status === 200) {
                egret.log("登录成功");
                windowui.LoadingInst.Instance.SetText("登录成功");
                LoadMgr.Instance.Load("lobby");
            }
            else {
                egret.log("用户登录失败,错误码:" + onLogin.status);
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
        //初始化
        LoadMgr.Instance.Init();
        var channel = "MatchVS";
        var platform = "alpha";
        this.status = PokesData.engine.init(PokesData.response, channel, platform, PokesData.gameID);
        //回调绑定
        PokesData.response.registerUserResponse = this.registerUserResponse.bind(this);
        PokesData.response.initResponse = this.initResponse.bind(this);
        PokesData.response.loginResponse = this.loginResponse.bind(this);
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
     * 用户登录
     */
    Main.prototype.login = function (userid, token) {
        var gameVersion = 1.0;
        var deviceID = "88888888";
        var getwayID = 1;
        PokesData.engine.login(userid, token, PokesData.gameID, gameVersion, PokesData.appKey, PokesData.secret, deviceID, getwayID);
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