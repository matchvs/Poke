/**
 * Created by yjtx on 15-10-19.
 */

class Login extends egret.EventDispatcher{
    constructor() {
        super();
    }

    login(data?:string|nest.user.LoginCallbackInfo):void {
        if (data == null || typeof data == "string") {
            var loginInfo: nest.user.LoginInfo = data ? {"loginType":<string>data} : {};
            egret.log("login start");
            egret.log(JSON.stringify(loginInfo));
            nest.user.login(loginInfo,this.onLoginCallback.bind(this));
        }
        else {
            this.onLoginCallback(<nest.user.LoginCallbackInfo>data);
        }
    }

    private onLoginCallback(data:nest.user.LoginCallbackInfo):void{
        egret.log(JSON.stringify(data));
        egret.log("login end");
        if (data.result == 0){
            //为了保证安全性，这段代码请务必放在服务器端实现
            utils.addLog("正在获取用户信息...");
            this.getUserInfo(data, this.onGetUserInfoCallback);
        }
        else{
            //登录失败
            utils.addLog("获取信息失败");
        }
    }

    private getUserInfo(data:nest.user.LoginCallbackInfo,onGetUserInfoCallback:Function){
        var appId: number = 336;
        var appkey: string = "r83RydQxkjhjOsqFVs2OD";
        var token = data.token;
        var requestParams:any = {
            action: "user.getInfo",
            appId: appId,
            serverId: 1,
            time: Date.now(),
            token: token

        };
        var signStr = "";
        for (var key in requestParams){
            signStr += key + "=" + requestParams[key];
        }
        signStr += appkey;
        requestParams.sign = new md5().hex_md5(signStr);;

        var urlLoader: egret.URLLoader = new egret.URLLoader();
        var request: egret.URLRequest = new egret.URLRequest();
        request.url = "http://api.egret-labs.org/games/api.php";

        var variable: egret.URLVariables = new egret.URLVariables();
        variable.variables = requestParams;
        request.data = variable;

        request.method = egret.URLRequestMethod.POST;
        urlLoader.load(request);
        urlLoader.addEventListener(egret.Event.COMPLETE,function(e:egret.Event) {
            var data = JSON.parse(urlLoader.data);
            onGetUserInfoCallback.call(this,data);
        },this);
    }

    private onGetUserInfoCallback(data:any){
        console.log(data);

        utils.addLog("\n正在进入游戏...");
        utils.UIStage.dispatchEvent(new GameEvent(GameEvent.LOGIN_IN_SUCCESS));
    }

}