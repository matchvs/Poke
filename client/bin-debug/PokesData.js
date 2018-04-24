var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 常量定义
 */
var PokesData = (function () {
    function PokesData() {
    }
    PokesData.engine = new MatchvsEngine();
    PokesData.response = new MatchvsResponse();
    PokesData.gameID = 201220;
    PokesData.appKey = "00f6f33ee17d48e8b7d6731bb5a71ef7";
    PokesData.secret = "a8c6f99cb17745efaee615f052547dee";
    return PokesData;
}());
__reflect(PokesData.prototype, "PokesData");
//# sourceMappingURL=PokesData.js.map