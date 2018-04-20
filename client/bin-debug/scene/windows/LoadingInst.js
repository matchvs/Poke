var windowui;
(function (windowui) {
    var LoadingInst = (function (_super) {
        __extends(LoadingInst, _super);
        function LoadingInst() {
            _super.call(this);
            this._progress = null;
            this._mask = new egret.Sprite();
            this.createView();
        }
        var d = __define,c=LoadingInst;p=c.prototype;
        p.createView = function () {
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.y = Config.StageHeight / 2 - 15;
            this.textField.width = 640;
            this.textField.height = 100;
            this.textField.textAlign = "center";
        };
        p.Show = function () {
            LoadMgr.Instance.addEventListener(LoadMgr.LOAD_PROGRESS, this.setProgress, this);
            LayerMgr.TopWindow.addChild(this);
        };
        p.Hide = function () {
            LoadMgr.Instance.removeEventListener(LoadMgr.LOAD_PROGRESS, this.setProgress, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        d(LoadingInst, "Instance"
            ,function () {
                if (LoadingInst._instance == null) {
                    LoadingInst._instance = new LoadingInst();
                }
                return LoadingInst._instance;
            }
        );
        p.setSkin = function () {
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
        p.onTap = function (e) {
        };
        p.SetText = function (txt) {
            this.textField.text = txt;
        };
        p.setProgress = function (current, total) {
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
    })(windowui.WindowsBase);
    windowui.LoadingInst = LoadingInst;
    egret.registerClass(LoadingInst,"windowui.LoadingInst");
})(windowui || (windowui = {}));
