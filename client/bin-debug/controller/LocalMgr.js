/**
 *
 *
 * @author
 *
 */
var LocalMgr = (function () {
    function LocalMgr() {
        this._localData = null;
        this._localData = new data.LocalData();
    }
    var d = __define,c=LocalMgr;p=c.prototype;
    d(LocalMgr, "Instance"
        ,function () {
            if (LocalMgr._instance == null) {
                LocalMgr._instance = new LocalMgr();
            }
            return LocalMgr._instance;
        }
    );
    /**
     * 连接服务器
     * @constructor
     */
    p.LoadData = function () {
        if (egret.localStorage == null) {
            return;
        }
        var str = egret.localStorage.getItem(LocalMgr.DATANAME);
        var obj = JSON.parse(str);
        this._localData.InitThis(obj);
    };
    p.SetData = function (key, data) {
        if (egret.localStorage == null) {
            return;
        }
        this._localData[key] = data;
        var obj = this._localData.Clone();
        var str = JSON.stringify(obj);
        egret.localStorage.setItem(LocalMgr.DATANAME, str);
    };
    p.GetData = function (key) {
        return this._localData[key];
    };
    LocalMgr.SoundBG_Volume = "SoundBG_Volume"; //游戏背景音量
    LocalMgr.SoundMusic_Volume = "SoundMusic_Volume"; //游戏音效音量
    LocalMgr.RecordObj = "RecordObj"; //游戏记录
    LocalMgr.DATANAME = "at20151230_doudizhu";
    LocalMgr._instance = null;
    return LocalMgr;
})();
egret.registerClass(LocalMgr,"LocalMgr");
