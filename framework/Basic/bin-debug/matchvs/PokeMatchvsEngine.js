var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PokeMatchvsEngine = (function () {
    function PokeMatchvsEngine() {
        this.engine = new MatchvsEngine;
        this.response = new MatchvsResponse;
    }
    /**
     * 初始化
     */
    PokeMatchvsEngine.prototype.init = function (pChannel, pPlatform, gameID) {
        var result = this.engine.init(new MatchvsResponse, pChannel, pPlatform, gameID);
        egret.log("初始化result：" + result);
        return result;
    };
    /**
     * 注册
     */
    PokeMatchvsEngine.prototype.registerUser = function () {
        var result = this.engine.registerUser();
        egret.log("注册result：" + result);
        return result;
    };
    /**
     * 登录
     */
    PokeMatchvsEngine.prototype.login = function (pUserID, pToken) {
        var result = this.engine.login(pUserID, pToken, MatchvsData.gameID, MatchvsData.gameVision, MatchvsData.appKey, MatchvsData.secret, MatchvsData.DeviceID, MatchvsData.gatewayID);
        egret.log("登录result：" + result);
        return result;
    };
    return PokeMatchvsEngine;
}());
__reflect(PokeMatchvsEngine.prototype, "PokeMatchvsEngine");
//# sourceMappingURL=PokeMatchvsEngine.js.map