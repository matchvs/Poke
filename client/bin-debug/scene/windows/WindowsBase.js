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
    /**
     * 系统提示框
     * Created by Administrator on 2015/12/23.
     */
    var WindowsBase = (function (_super) {
        __extends(WindowsBase, _super);
        function WindowsBase() {
            var _this = _super.call(this) || this;
            _this._bgshap = null;
            _this.IsShow = false;
            _this.createBaseView();
            return _this;
        }
        WindowsBase.prototype.createBaseView = function () {
            this._bgshap = new egret.Shape();
            this._bgshap.graphics.beginFill(0x000000, 0.35);
            this._bgshap.graphics.drawRect(0, 0, Config.StageWidth, Config.StageHeight);
            this._bgshap.graphics.endFill();
            this._bgshap.touchEnabled = true;
            this.addChild(this._bgshap);
        };
        WindowsBase.prototype.Show = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.IsShow = true;
        };
        WindowsBase.prototype.Hide = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.IsShow = false;
        };
        return WindowsBase;
    }(egret.Sprite));
    windowui.WindowsBase = WindowsBase;
    __reflect(WindowsBase.prototype, "windowui.WindowsBase", ["IWindow"]);
})(windowui || (windowui = {}));
//# sourceMappingURL=WindowsBase.js.map