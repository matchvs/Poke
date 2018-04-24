var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var sceneproxy;
(function (sceneproxy) {
    var SceneProxyBase = (function () {
        function SceneProxyBase() {
        }
        SceneProxyBase.prototype.Init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        SceneProxyBase.prototype.Release = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        return SceneProxyBase;
    }());
    sceneproxy.SceneProxyBase = SceneProxyBase;
    __reflect(SceneProxyBase.prototype, "sceneproxy.SceneProxyBase", ["IInit", "IRelease"]);
})(sceneproxy || (sceneproxy = {}));
//# sourceMappingURL=SceneProxyBase.js.map