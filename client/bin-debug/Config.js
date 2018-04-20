var Config = (function () {
    function Config() {
    }
    var d = __define,c=Config;p=c.prototype;
    Config.IsHide = false;
    Config.System = "Windows"; //Android,iPhone,Windows Phone, Windows
    Config.StageWidth = 640;
    Config.StageHeight = 800;
    Config.MinStageHeight = 585;
    Config.MinStageY = 1;
    Config.IsBgTouch = false;
    return Config;
})();
egret.registerClass(Config,"Config");
