var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
    Object.defineProperty(LocalMgr, "Instance", {
        get: function () {
            if (LocalMgr._instance == null) {
                LocalMgr._instance = new LocalMgr();
            }
            return LocalMgr._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 连接服务器
     * @constructor
     */
    LocalMgr.prototype.LoadData = function () {
        if (egret.localStorage == null) {
            return;
        }
        var str = egret.localStorage.getItem(LocalMgr.DATANAME);
        var obj = JSON.parse(str);
        this._localData.InitThis(obj);
    };
    LocalMgr.prototype.SetData = function (key, data) {
        if (egret.localStorage == null) {
            return;
        }
        this._localData[key] = data;
        var obj = this._localData.Clone();
        var str = JSON.stringify(obj);
        egret.localStorage.setItem(LocalMgr.DATANAME, str);
    };
    LocalMgr.prototype.GetData = function (key) {
        return this._localData[key];
    };
    LocalMgr.SoundBG_Volume = "SoundBG_Volume"; //游戏背景音量
    LocalMgr.SoundMusic_Volume = "SoundMusic_Volume"; //游戏音效音量
    LocalMgr.RecordObj = "RecordObj"; //游戏记录
    LocalMgr.DATANAME = "at20151230_doudizhu";
    LocalMgr._instance = null;
    return LocalMgr;
}());
__reflect(LocalMgr.prototype, "LocalMgr");
//# sourceMappingURL=LocalMgr.js.map