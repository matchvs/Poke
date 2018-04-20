var windowui;
(function (windowui) {
    /**
     * 系统提示框
     * Created by Administrator on 2015/12/23.
     */
    var WindowsBase = (function (_super) {
        __extends(WindowsBase, _super);
        function WindowsBase() {
            _super.call(this);
            this._bgshap = null;
            this.IsShow = false;
            this.createBaseView();
        }
        var d = __define,c=WindowsBase;p=c.prototype;
        p.createBaseView = function () {
            this._bgshap = new egret.Shape();
            this._bgshap.graphics.beginFill(0x000000, 0.35);
            this._bgshap.graphics.drawRect(0, 0, Config.StageWidth, Config.StageHeight);
            this._bgshap.graphics.endFill();
            this._bgshap.touchEnabled = true;
            this.addChild(this._bgshap);
        };
        p.Show = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.IsShow = true;
        };
        p.Hide = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.IsShow = false;
        };
        return WindowsBase;
    })(egret.Sprite);
    windowui.WindowsBase = WindowsBase;
    egret.registerClass(WindowsBase,"windowui.WindowsBase",["IWindow"]);
})(windowui || (windowui = {}));
