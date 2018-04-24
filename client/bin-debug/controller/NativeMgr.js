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
/**
 *
 * 原生交互类
 * @author
 *
 */
var NativeMgr = (function (_super) {
    __extends(NativeMgr, _super);
    function NativeMgr() {
        return _super.call(this) || this;
    }
    Object.defineProperty(NativeMgr, "Instance", {
        get: function () {
            if (NativeMgr._instance == null) {
                NativeMgr._instance = new NativeMgr();
            }
            return NativeMgr._instance;
        },
        enumerable: true,
        configurable: true
    });
    NativeMgr.prototype.JS2Native = function (obj) {
        var str = JSON.stringify(obj);
        var backstr = window["js2native"](str);
        //var obj:any=JSON.parse(backstr);
        return backstr;
    };
    NativeMgr.prototype.Native2JS = function (str) {
        var backobj = JSON.parse(str);
        trace("native->js", str);
        if (backobj == null) {
            trace("Json解析失败" + str);
            return null;
        }
        trace("native->js", str);
        switch (backobj.type) {
            case "getInitInfo":
                this.dispatchEvent(new egret.Event(enums.NativeEvent.NATIVEEVENT_GETINITINFO, false, false, backobj.value));
                break;
            case "stopsound":
                SoundMgr.Instance.StopSound();
                break;
            //ios专用
            case "min":
                if (backobj.value && backobj.value.reslt) {
                    if (SceneMgr.Instance.GetCurrentScene() instanceof scene.GameScene) {
                        SceneMgr.Instance.GetCurrentScene().ResetMin();
                    }
                }
                break;
            //ios专用
            case "max":
                if (backobj.value && backobj.value.reslt) {
                    if (SceneMgr.Instance.GetCurrentScene() instanceof scene.GameScene) {
                        SceneMgr.Instance.GetCurrentScene().ResetMin();
                    }
                }
                break;
            case "isTouchBG":
                var obj = {};
                var jstr = "";
                obj.type = "isTouchBG";
                obj.value = Config.IsBgTouch;
                jstr = JSON.stringify(obj);
                return jstr;
            case "disConnect"://ios进入后台调用
                NetMgr.Instance.Exit();
                if (SceneMgr.Instance.GetCurrentScene() instanceof scene.GameScene) {
                    (SceneMgr.Instance.GetCurrentScene()).ReStart();
                }
                break;
            case "connect"://ios进入前台调用
                NetMgr.Instance.Connect();
                break;
            default:
                break;
        }
        return "{'js':'null'}";
    };
    NativeMgr.prototype.MinWindow = function () {
        var obj = {};
        obj.type = "min";
        //test
        if (!data.GameData.IsInNative) {
            if (SceneMgr.Instance.GetCurrentScene() instanceof scene.GameScene) {
                SceneMgr.Instance.GetCurrentScene().ResetMin();
            }
        }
        //testover
        var callback = this.JS2Native(obj);
        if (callback == null) {
            return;
        }
        var backobj = JSON.parse(callback);
        if (backobj && backobj.value) {
            var value = JSON.parse(backobj.value);
            if (value.reslt) {
                SceneMgr.Instance.GetCurrentScene().ResetMin();
            }
        }
    };
    NativeMgr.prototype.MaxWindow = function () {
        var obj = {};
        obj.type = "max";
        //test
        if (!data.GameData.IsInNative) {
            if (SceneMgr.Instance.GetCurrentScene() instanceof scene.GameScene) {
                SceneMgr.Instance.GetCurrentScene().ResetMin();
            }
        }
        //testover
        var callback = this.JS2Native(obj);
        trace("native->js:" + callback);
        if (callback == null) {
            return;
        }
        var backobj = JSON.parse(callback);
        if (backobj && backobj.value) {
            var value = JSON.parse(backobj.value);
            if (value.reslt) {
                SceneMgr.Instance.GetCurrentScene().ResetMin();
            }
        }
    };
    NativeMgr.prototype.ExitWindow = function () {
        var obj = {};
        obj.type = "exit";
        var value = {};
        value.integral = data.GameData.integral;
        value.money = data.GameData.money;
        var valuestr = JSON.stringify(value);
        obj.value = valuestr;
        NetMgr.Instance.Exit();
        var callback = this.JS2Native(obj);
        if (callback == null) {
            return;
        }
        var backobj = JSON.parse(callback);
        if (backobj && backobj.value) {
            var value = JSON.parse(backobj.value);
            if (value.reslt) {
                //Config.IsMin=false;
                //SceneMgr.Instance.GetCurrentScene().ResetMin();
            }
        }
    };
    NativeMgr.prototype.GetInitInfo = function () {
        //var obj:any = {};
        //obj.type = "getInitInfo";
        //var callback = this.JS2Native(obj);
        //if(callback==null)
        //{
        //    return;
        //}
        //var backobj:any=JSON.parse(callback);
        //if(backobj&&backobj.value)
        //{
        //    var value:any=JSON.parse(backobj.value);
        //    this.dispatchEvent(new egret.Event(enums.NativeEvent.NATIVEEVENT_GETINITINFO,false,false,value));
        //}
        //
        //var request:egret.URLRequest=new egret.URLRequest("http://api.egret-labs.org/v2/user/getInfo");
        //request.method=egret.URLRequestMethod.POST;
        //request.data={token:"",time:,appId:90052,sign:};
        //var loader:egret.URLLoader=new egret.URLLoader();
    };
    NativeMgr.prototype.waitPlayer = function () {
        var obj = {};
        obj.type = "waitPlayer";
        var value = {};
        value.groupid = data.GameData.groupid;
        var valuestr = JSON.stringify(value);
        obj.value = valuestr;
        var callback = this.JS2Native(obj);
        if (callback == null) {
            return;
        }
        var backobj = JSON.parse(callback);
        if (backobj && backobj.value) {
            var value = JSON.parse(backobj.value);
        }
    };
    NativeMgr._instance = null;
    return NativeMgr;
}(egret.EventDispatcher));
__reflect(NativeMgr.prototype, "NativeMgr");
//# sourceMappingURL=NativeMgr.js.map