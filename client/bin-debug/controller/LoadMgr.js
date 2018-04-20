/**
 * Created by Administrator on 2015/12/17.
 */
var LoadMgr = (function (_super) {
    __extends(LoadMgr, _super);
    function LoadMgr() {
        _super.call(this);
    }
    var d = __define,c=LoadMgr;p=c.prototype;
    d(LoadMgr, "Instance"
        ,function () {
            if (LoadMgr._instance == null) {
                LoadMgr._instance = new LoadMgr();
            }
            return LoadMgr._instance;
        }
    );
    p.Init = function () {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * Loading of configuration file is complete, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        this.Load("preload");
    };
    p.Load = function (groupname) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(groupname);
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        if (event.groupName == "preload") {
            this.dispatchEvent(new egret.Event(LoadMgr.LOADOVER_PRELOAD));
        }
        else if (event.groupName == "lobby") {
            egret.setTimeout(function () {
                this.dispatchEvent(new egret.Event(LoadMgr.LOADOVER_LOBBY));
            }, this, 200);
        }
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    p.onResourceProgress = function (event) {
        this.ItemsLoaded = event.itemsLoaded;
        this.ItemsTotal = event.itemsTotal;
        this.dispatchEvent(new egret.Event(LoadMgr.LOAD_PROGRESS));
    };
    LoadMgr.LOADOVER_PRELOAD = "LOADOVER_PRELOAD";
    LoadMgr.LOADOVER_LOBBY = "LOADOVER_LOBBY";
    LoadMgr.LOAD_PROGRESS = "LOAD_PROGRESS";
    LoadMgr._instance = null;
    return LoadMgr;
})(egret.EventDispatcher);
egret.registerClass(LoadMgr,"LoadMgr");
