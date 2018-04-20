/**
 *
 * 原生交互类
 * @author
 *
 */
class NativeMgr extends egret.EventDispatcher {
    private static _instance: NativeMgr = null;

    public constructor() {
        super();
    }

    public static get Instance(): NativeMgr {
        if (NativeMgr._instance == null) {
            NativeMgr._instance = new NativeMgr();
        }
        return NativeMgr._instance;
    }

    public JS2Native(obj: any): string {
        var str: string = JSON.stringify(obj);
        var backstr: string = window["js2native"](str);
        //var obj:any=JSON.parse(backstr);
        return backstr;
    }

    public Native2JS(str: string): string {
        var backobj: any = JSON.parse(str);
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
                var obj: any = {};
                var jstr: string = "";
                obj.type = "isTouchBG";
                obj.value = Config.IsBgTouch;
                jstr = JSON.stringify(obj);
                return jstr;
            case "disConnect":          //ios进入后台调用
                NetMgr.Instance.Exit();
                if (SceneMgr.Instance.GetCurrentScene() instanceof scene.GameScene) {
                    (<scene.GameScene>(SceneMgr.Instance.GetCurrentScene())).ReStart();
                }
                break;
            case "connect":          //ios进入前台调用
                NetMgr.Instance.Connect();
                break;
            default:
                break;

        }
        return "{'js':'null'}";
    }
    public MinWindow(): string {
        var obj: any = {};
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
        var backobj: any = JSON.parse(callback);
        if (backobj && backobj.value) {
            var value: any = JSON.parse(backobj.value);
            if (value.reslt) {

                SceneMgr.Instance.GetCurrentScene().ResetMin();
            }
        }
    }

    public MaxWindow(): string {
        var obj: any = {};
        obj.type = "max";

        //test
        if (!data.GameData.IsInNative) {
            if (SceneMgr.Instance.GetCurrentScene() instanceof scene.GameScene) {
                SceneMgr.Instance.GetCurrentScene().ResetMin();
            }
        }
        //testover

        var callback = this.JS2Native(obj);
        trace("native->js:" + callback)
        if (callback == null) {
            return;
        }
        var backobj: any = JSON.parse(callback);
        if (backobj && backobj.value) {
            var value: any = JSON.parse(backobj.value);
            if (value.reslt) {
                SceneMgr.Instance.GetCurrentScene().ResetMin();
            }
        }
    }

    public ExitWindow(): string {
        var obj: any = {};
        obj.type = "exit";
        var value: any = {};
        value.integral = data.GameData.integral;
        value.money = data.GameData.money;

        var valuestr: string = JSON.stringify(value);
        obj.value = valuestr;

        NetMgr.Instance.Exit();

        var callback = this.JS2Native(obj);

        if (callback == null) {
            return;
        }
        var backobj: any = JSON.parse(callback);
        if (backobj && backobj.value) {
            var value: any = JSON.parse(backobj.value);
            if (value.reslt) {
                //Config.IsMin=false;
                //SceneMgr.Instance.GetCurrentScene().ResetMin();
            }
        }
    }

    public GetInitInfo(): void {
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
    }


    public waitPlayer(): void {
        var obj: any = {};
        obj.type = "waitPlayer";
        var value: any = {};
        value.groupid = data.GameData.groupid;
        var valuestr: string = JSON.stringify(value);
        obj.value = valuestr;
        var callback = this.JS2Native(obj);
        if (callback == null) {
            return;
        }
        var backobj: any = JSON.parse(callback);
        if (backobj && backobj.value) {
            var value: any = JSON.parse(backobj.value);
        }
    }
}
