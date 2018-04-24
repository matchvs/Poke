var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    Config.IsHide = false;
    Config.System = "Windows"; //Android,iPhone,Windows Phone, Windows
    Config.StageWidth = 640;
    Config.StageHeight = 800;
    Config.MinStageHeight = 585;
    Config.MinStageY = 1;
    Config.IsBgTouch = false;
    return Config;
}());
__reflect(Config.prototype, "Config");
//# sourceMappingURL=Config.js.map