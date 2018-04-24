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
var windowui;
(function (windowui) {
    var LoadingInst = (function (_super) {
        __extends(LoadingInst, _super);
        function LoadingInst() {
            var _this = _super.call(this) || this;
            _this._progress = null;
            _this._mask = new egret.Sprite();
            _this.createView();
            return _this;
        }
        LoadingInst.prototype.createView = function () {
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.y = Config.StageHeight / 2 - 15;
            this.textField.width = 640;
            this.textField.height = 100;
            this.textField.textAlign = "center";
        };
        LoadingInst.prototype.Show = function () {
            LoadMgr.Instance.addEventListener(LoadMgr.LOAD_PROGRESS, this.setProgress, this);
            LayerMgr.TopWindow.addChild(this);
        };
        LoadingInst.prototype.Hide = function () {
            LoadMgr.Instance.removeEventListener(LoadMgr.LOAD_PROGRESS, this.setProgress, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        Object.defineProperty(LoadingInst, "Instance", {
            get: function () {
                if (LoadingInst._instance == null) {
                    LoadingInst._instance = new LoadingInst();
                }
                return LoadingInst._instance;
            },
            enumerable: true,
            configurable: true
        });
        LoadingInst.prototype.setSkin = function () {
            this.removeChildren();
            var bg = new egret.Bitmap(RES.getRes("bg_loading_jpg"));
            this.addChild(bg);
            this._progress = new scene.ProgressBar("ui_loading_top");
            this.addChild(this._progress);
            this._progress.x = 87;
            this._progress.y = 969;
            this._progress.setProgress(0);
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.y = 974;
            this.textField.size = 18;
            this.textField.width = 640;
            this.textField.textAlign = "center";
            this.textField.stroke = 2;
            this.textField.strokeColor = 0x131313;
        };
        LoadingInst.prototype.onTap = function (e) {
        };
        LoadingInst.prototype.SetText = function (txt) {
            this.textField.text = txt;
        };
        LoadingInst.prototype.setProgress = function (current, total) {
            var per = LoadMgr.Instance.ItemsLoaded / LoadMgr.Instance.ItemsTotal;
            if (per < 0) {
                per = 0;
            }
            if (per > 1) {
                per = 1;
            }
            var sper = Math.ceil(per * 100);
            this.textField.text = sper + "%";
            if (this._progress) {
                this._progress.setProgress(per);
            }
        };
        LoadingInst._instance = null;
        return LoadingInst;
    }(windowui.WindowsBase));
    windowui.LoadingInst = LoadingInst;
    __reflect(LoadingInst.prototype, "windowui.LoadingInst");
})(windowui || (windowui = {}));
//# sourceMappingURL=LoadingInst.js.map