import numberToBlendMode = egret.sys.numberToBlendMode;

class Main extends egret.DisplayObjectContainer {

    private static instance: Main = null;
    private status:Number;

    public static reconnect(): void {
        Main.instance.preloadover(null);
    }
    
    /**
     * 加载进度界面
     * loading process interface
     */
    public static textlog: egret.TextField = null;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        
    }

    private onAddToStage(event: egret.Event) {
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
        let channel = "MatchVS";
        let platform = "alpha"
        this.status = PokesData.engine.init(PokesData.response,channel,platform,PokesData.gameID);
        //回调绑定
        PokesData.response.registerUserResponse = this.registerUserResponse.bind(this);
        PokesData.response.initResponse = this.initResponse.bind(this);
        PokesData.response.loginResponse = this.loginResponse.bind(this);

        LoadMgr.Instance.addEventListener(LoadMgr.LOADOVER_PRELOAD,this.preloadover,this);
        LoadMgr.Instance.addEventListener(LoadMgr.LOADOVER_LOBBY,this.createScene,this);
        this.stage.addEventListener(egret.Event.RESIZE,this.resizefun,this);
        Main.instance = this;

        this.pushHistory();
        window.addEventListener("popstate",function(e) {
            alert("离开将开启自动托管");//根据自己的需求实现自己的功能 
        },false);

    }

    /**
     * 引擎初始化回调
     */
    initResponse = function(status) {
        if(status === 200) {
            windowui.LoadingInst.Instance.SetText("初始化成功");
            PokesData.engine.registerUser();
        } else{
            egret.log("初始化失败，错误码"+status);
        }
    }

    /**
     * 注册用户回调函数
     */
    registerUserResponse = function (userInfo) {
        if (userInfo.status === 0) {
            egret.log("注册用户成功");
            //将ID存储到本地
            data.GameData.userid = userInfo.id;
            egret.localStorage.setItem("userId",String(userInfo.id));
            data.GameData.playerGuid = 1;
            //token
            egret.localStorage.setItem("token",userInfo.token);
            data.GameData.token = userInfo.token;
            //姓名
            egret.localStorage.setItem("name",userInfo.name);
            data.GameData.nickname = userInfo.name;
            this.login(userInfo.id,userInfo.token);
            windowui.LoadingInst.Instance.SetText("注册用户成功");
        } else {
            egret.log("注册用户失败,错误码:"+userInfo.status)
        }
    }

    /**
     * 用户登录
     */
    private login(userid :number ,token:string) {
        let gameVersion:number = 1.0;
        let deviceID = "88888888";
        let getwayID = 1;
        PokesData.engine.login(userid,token,PokesData.gameID,gameVersion,PokesData.appKey,PokesData.secret,deviceID,getwayID);
    }

    /**
     * 登录回调函数
     */
    loginResponse = function(onLogin) {
        if(onLogin.status === 200) {
            egret.log("登录成功");
            windowui.LoadingInst.Instance.SetText("登录成功");
            LoadMgr.Instance.Load("lobby");
        } else {
            egret.log("用户登录失败,错误码:"+onLogin.status)
        }
    }

    /**
     * 修改网页url
     */
    private pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state,"title","#");
    }
    
    private setos(): void {
        var u = navigator.userAgent;
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
            Config.System = "Android";
        }
        else if(u.indexOf('iPhone') > -1) {//苹果手机
            Config.System = "iPhone";
        }
        else if(u.indexOf('Windows Phone') > -1) {//winphone手机
            Config.System = "Windows Phone";
        }
        else if(u.indexOf('Windows') > -1) {
            Config.System = "Windows";
        }
    }

    private resizefun(e: egret.Event = null): void {
        var currWidth = this.stage.stageWidth;
        var currHeight = this.stage.stageHeight;
        trace("Main-resizefun->",currWidth,currHeight);
    }


    /**
     * 此处替换为注册登录逻辑。
     */
    private preloadover(e: egret.Event): void {
        LoadMgr.Instance.removeEventListener(LoadMgr.LOADOVER_PRELOAD,this.preloadover,this);
        windowui.LoadingInst.Instance.setSkin();
    }

    
    /**
     * 创建场景界面
     * Create scene interface
     */
    private createScene(e: egret.Event): void {
        LocalMgr.Instance.LoadData();
        LoadMgr.Instance.removeEventListener(LoadMgr.LOADOVER_LOBBY,this.createScene,this);
        windowui.LoadingInst.Instance.Hide();
        SceneMgr.Instance.ShowScene(scene.LobbyScene);
        // 发送成功
        NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_CENTER_LOGIN_OK);
    }


}