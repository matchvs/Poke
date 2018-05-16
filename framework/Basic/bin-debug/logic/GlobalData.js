var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalData = (function () {
    function GlobalData() {
    }
    GlobalData.myUser = null;
    return GlobalData;
}());
__reflect(GlobalData.prototype, "GlobalData");
//# sourceMappingURL=GlobalData.js.map