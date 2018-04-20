var scene;
(function (scene) {
    var SceneBase = (function (_super) {
        __extends(SceneBase, _super);
        function SceneBase() {
            _super.call(this);
            this.height = Config.StageHeight;
            this.width = Config.StageWidth;
        }
        var d = __define,c=SceneBase;p=c.prototype;
        p.Release = function () {
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
        p.ResetMin = function () {
        };
        p.Init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        return SceneBase;
    })(egret.Sprite);
    scene.SceneBase = SceneBase;
    egret.registerClass(SceneBase,"scene.SceneBase",["IRelease","IInit"]);
})(scene || (scene = {}));
