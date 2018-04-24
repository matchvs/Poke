/**
 * Created by Administrator on 2016/4/30.
 */
/**
 * Created by yjtx on 15-10-19.
 */
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
var EgretSDKMgr = (function (_super) {
    __extends(EgretSDKMgr, _super);
    function EgretSDKMgr() {
        return _super.call(this) || this;
    }
    Object.defineProperty(EgretSDKMgr, "Instance", {
        get: function () {
            if (EgretSDKMgr._instance == null) {
                EgretSDKMgr._instance = new EgretSDKMgr();
            }
            return EgretSDKMgr._instance;
        },
        enumerable: true,
        configurable: true
    });
    EgretSDKMgr.prototype.Init = function () {
        var info = {}; //设置游戏id，这里是在测试步骤1中获取的游戏appId
        info.egretAppId = 90052; //设置使用 Nest 版本。默认为1，新版请传递2
        info.version = 2; //在debug模式下，请求nest接口会有日志输出。建议调试时开启
        info.debug = true;
        var tth = this;
        nest.core.startup(info, function (data) {
            if (data.result == 0) {
                tth.checkLogin();
            }
        });
    };
    EgretSDKMgr.prototype.checkLogin = function () {
        trace("正在检查是否已登录...");
        //        var loginInfo: nest.user.LoginInfo = {};
        if (data.GameData.playerGuid != 0) {
            location.reload();
        }
        var loginInfo = {};
        nest.user.checkLogin(loginInfo, this.onCheckLoginCallback.bind(this));
    };
    EgretSDKMgr.prototype.onCheckLoginCallback = function (data) {
        if (!data.token) {
            trace("\n正在登录...");
            var loginInfo = {};
            nest.user.login(loginInfo, this.onLoginCallback.bind(this));
        }
        else {
            this.onLoginCallback(data);
        }
    };
    EgretSDKMgr.prototype.onLoginCallback = function (data) {
        if (data.result == 0) {
            this.getUserInfo(data, this.onGetUserInfoCallback);
        }
        else {
            //登录失败
            trace("登陆失败...");
        }
    };
    EgretSDKMgr.prototype.getUserInfo = function (data, onGetUserInfoCallback) {
        onGetUserInfoCallback.call(this, data);
    };
    EgretSDKMgr.prototype.onGetUserInfoCallback = function (data) {
        this.dispatchEvent(new egret.Event(enums.NativeEvent.NATIVEEVENT_GETINITINFO, false, false, data));
        //        console.log(data);
        //        if(data.msg=="success")
        //        {
        //            trace("登陆成功...");
        //            var backobj= {
        //                userid : data.data.id,
        //                nickName : data.data.name,
        //                avatarUrl : data.data.pic,
        //                sex : data.data.sex,
        //                serverInfo : data.data.serverInfo,//sgId startServerId
        //            }
        //            this.dispatchEvent(new egret.Event(enums.NativeEvent.NATIVEEVENT_GETINITINFO,false,false,backobj));
        //        }
    };
    EgretSDKMgr._instance = null;
    return EgretSDKMgr;
}(egret.EventDispatcher));
__reflect(EgretSDKMgr.prototype, "EgretSDKMgr");
//# sourceMappingURL=EgretSDKMgr.js.map