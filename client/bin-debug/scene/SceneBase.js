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
var scene;
(function (scene) {
    var SceneBase = (function (_super) {
        __extends(SceneBase, _super);
        function SceneBase() {
            var _this = _super.call(this) || this;
            _this.height = Config.StageHeight;
            _this.width = Config.StageWidth;
            return _this;
        }
        SceneBase.prototype.Release = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            LayerMgr.Scene.removeChildren();
            LayerMgr.Window.removeChildren();
            LayerMgr.TopUI.removeChildren();
            LayerMgr.MinTop.removeChildren();
            LayerMgr.TopWindow.removeChildren();
            LayerMgr.SysTip.removeChildren();
        };
        SceneBase.prototype.ResetMin = function () {
        };
        SceneBase.prototype.Init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        return SceneBase;
    }(egret.Sprite));
    scene.SceneBase = SceneBase;
    __reflect(SceneBase.prototype, "scene.SceneBase", ["IRelease", "IInit"]);
})(scene || (scene = {}));
//# sourceMappingURL=SceneBase.js.map