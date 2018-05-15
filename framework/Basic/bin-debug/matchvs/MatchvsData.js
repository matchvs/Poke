var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Matchvs常量定义
 */
var MatchvsData = (function () {
    function MatchvsData() {
    }
    MatchvsData.gameID = 200787;
    MatchvsData.appKey = "de7c4a439d2948d880451c25c910b239";
    MatchvsData.secret = "5667067032b644c687c0a86ca9faa2d6";
    MatchvsData.gameVision = 1.0;
    MatchvsData.DeviceID = "0";
    MatchvsData.gatewayID = 1;
    MatchvsData.pChannel = "MatchVS";
    MatchvsData.pPlatform = "release";
    return MatchvsData;
}());
__reflect(MatchvsData.prototype, "MatchvsData");
//# sourceMappingURL=MatchvsData.js.map