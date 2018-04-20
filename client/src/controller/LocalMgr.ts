/**
 *
 *
 * @author
 *
 */
class LocalMgr {
    public static SoundBG_Volume:string="SoundBG_Volume";                       //游戏背景音量
    public static SoundMusic_Volume:string="SoundMusic_Volume";                 //游戏音效音量
    public static RecordObj:string="RecordObj";                                 //游戏记录

    private _localData:data.LocalData=null;
    private static DATANAME:string = "at20151230_doudizhu";
    private static _instance:LocalMgr = null;
    public constructor() {
        this._localData=new data.LocalData();
    }

    public static get Instance():LocalMgr {
        if (LocalMgr._instance == null) {
            LocalMgr._instance = new LocalMgr();
        }
        return LocalMgr._instance;
    }

    /**
     * 连接服务器
     * @constructor
     */
    public LoadData():void {
        if(egret.localStorage==null)
        {
            return;
        }
        var str:string=egret.localStorage.getItem(LocalMgr.DATANAME);
        var obj:any=JSON.parse(str);
        this._localData.InitThis(obj);
    }

    public SetData(key:string,data:any):void
    {
        if(egret.localStorage==null)
        {
            return;
        }
        this._localData[key]=data;
        var obj:any=this._localData.Clone();
        var str:string=JSON.stringify(obj);
        egret.localStorage.setItem(LocalMgr.DATANAME,str);
    }

    public GetData(key:string):any
    {
        return this._localData[key];
    }


}
