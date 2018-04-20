/**
 *
 * 原生交互类
 * @author
 *
 */
var NativeMgr = (function (_super) {
    __extends(NativeMgr, _super);
    function NativeMgr() {
        _super.call(this);
    }
    var d = __define,c=NativeMgr;p=c.prototype;
    d(NativeMgr, "Instance"
        ,function () {
            if (NativeMgr._instance == null) {
                NativeMgr._instance = new NativeMgr();
            }
            return NativeMgr._instance;
        }
    );
    p.JS2Native = function (obj) {
        var str = JSON.stringify(obj);
        var backstr = window["js2native"](str);
        //var obj:any=JSON.parse(backstr);
        return backstr;
    };
    p.Native2JS = function (str) {
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
            case "disConnect":
                NetMgr.Instance.Exit();
                if (SceneMgr.Instance.GetCurrentScene() instanceof scene.GameScene) {
                    (SceneMgr.Instance.GetCurrentScene()).ReStart();
                }
                break;
            case "connect":
                NetMgr.Instance.Connect();
                break;
            default:
                break;
        }
        return "{'js':'null'}";
    };
    p.MinWindow = function () {
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
    p.MaxWindow = function () {
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
    p.ExitWindow = function () {
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
            }
        }
    };
    p.GetInitInfo = function () {
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
    p.waitPlayer = function () {
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
})(egret.EventDispatcher);
egret.registerClass(NativeMgr,"NativeMgr");
