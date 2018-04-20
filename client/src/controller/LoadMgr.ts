/**
 * Created by Administrator on 2015/12/17.
 */
class LoadMgr extends egret.EventDispatcher {
    public static LOADOVER_PRELOAD:string = "LOADOVER_PRELOAD";
    public static LOADOVER_LOBBY:string = "LOADOVER_LOBBY";
    public static LOAD_PROGRESS:string = "LOAD_PROGRESS";

    public ItemsLoaded:number;
    public ItemsTotal:number;

    private static _instance:LoadMgr = null;

    public constructor() {
        super();
    }

    public static get Instance():LoadMgr {
        if (LoadMgr._instance == null) {
            LoadMgr._instance = new LoadMgr();
        }
        return LoadMgr._instance;
    }

    public Init():void {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * Loading of configuration file is complete, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        this.Load("preload")
    }

    public Load(groupname:string):void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(groupname);
    }

    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        if (event.groupName == "preload") {
            this.dispatchEvent(new egret.Event(LoadMgr.LOADOVER_PRELOAD));
        }
        else if (event.groupName == "lobby") {
            egret.setTimeout(function()
            {
                this.dispatchEvent(new egret.Event(LoadMgr.LOADOVER_LOBBY));
            },this,200)


        }
    }


    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }


    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        this.ItemsLoaded = event.itemsLoaded;
        this.ItemsTotal = event.itemsTotal;
        this.dispatchEvent(new egret.Event(LoadMgr.LOAD_PROGRESS));
    }

}