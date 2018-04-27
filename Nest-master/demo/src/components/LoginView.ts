/**
 *
 * @author
 *
 */
class LoginView extends egret.gui.SkinnableComponent {


    public info_txt:egret.gui.Label;

    public login_button:egret.gui.Button;

    public constructor() {
        super();
        this.skinName = skins.LoginViewSkin;
    }


    public createChildren() {
        super.createChildren();
        this.login_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
    }

    private onTouchTapHandler(e:egret.TouchEvent):void {
        this.checkLogin();
    }

    private checkLogin():void {
        this.info_txt.text = "正在检查是否已登录...";
//        var loginInfo: nest.user.LoginInfo = {};

        var loginInfo:any = {}


        nest.user.checkLogin(loginInfo, this.onCheckLoginCallback.bind(this));
    }


    private onCheckLoginCallback(data:nest.user.LoginCallbackInfo):void {

        if (!data.token) {
            this.info_txt.text += "\n正在登录...";
            var loginInfo:nest.user.LoginInfo = {};
            nest.user.login(loginInfo, this.onLoginCallback.bind(this));
        }
        else {
            this.onLoginCallback(data);
        }

    }

    private onLoginCallback(data:nest.user.LoginCallbackInfo):void {

        if (data.result == 0) {
            this.getUserInfo(data, this.onGetUserInfoCallback);
        }
        else {
            //登录失败
            this.info_txt.text += "\n正在获取用户信息...";
        }

    }

    private onGetUserInfoCallback(data:any) {
        console.log(data);
        this.info_txt.text += "\n正在进入游戏...";
        this.dispatchEvent(new GameEvent(GameEvent.LOGIN_SUCCESS));
    }

    private getUserInfo(data:nest.user.LoginCallbackInfo, onGetUserInfoCallback:Function) {

        //为了保证安全性，这段代码请务必放在服务器端实现
        this.info_txt.text += "\n正在获取用户信息...";
        var appId:number = 336;
        var appkey:string = "r83RydQxkjhjOsqFVs2OD";
        var token = data.token;
        //注意,这里参数顺序请保持按字母顺序排列
        //签名生成规则可以参考文档:http://open.egret.com/Wiki?mid=2&cid=17
        var requestParams:any = {
            action: "user.getInfo",
            appId: appId,
            serverId: 1,
            time: Date.now(),
            token: token

        };
        var signStr = "";
        for (var key in requestParams) {
            signStr += key + "=" + requestParams[key];
        }
        signStr += appkey;
        requestParams.sign = new md5().hex_md5(signStr);
        ;

        var urlLoader:egret.URLLoader = new egret.URLLoader();
        var request:egret.URLRequest = new egret.URLRequest();
        request.url = "http://api.egret-labs.org/v2/user/getInfo";

        var variable:egret.URLVariables = new egret.URLVariables();
        variable.variables = requestParams;
        request.data = variable;


        request.method = egret.URLRequestMethod.POST;
        urlLoader.load(request);
        urlLoader.addEventListener(egret.Event.COMPLETE, function (e:egret.Event) {
            var data = JSON.parse(urlLoader.data);
            onGetUserInfoCallback.call(this, data);
        }, this);


    }
}
