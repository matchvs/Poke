var sceneproxy;
(function (sceneproxy) {
    var SceneProxyBase = (function () {
        function SceneProxyBase() {
        }
        var d = __define,c=SceneProxyBase;p=c.prototype;
        p.Init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        p.Release = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        return SceneProxyBase;
    })();
    sceneproxy.SceneProxyBase = SceneProxyBase;
    egret.registerClass(SceneProxyBase,"sceneproxy.SceneProxyBase",["IInit","IRelease"]);
})(sceneproxy || (sceneproxy = {}));
