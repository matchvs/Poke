var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var battle;
(function (battle) {
    var BattleStageControl = (function () {
        function BattleStageControl() {
            this._playerList = new Array(); //用户列表
            this._cardControl = new battle.CardControl(); //牌控制
        }
        return BattleStageControl;
    }());
    battle.BattleStageControl = BattleStageControl;
    __reflect(BattleStageControl.prototype, "battle.BattleStageControl");
})(battle || (battle = {}));
//# sourceMappingURL=BattleStageControl.js.map