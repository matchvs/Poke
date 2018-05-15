var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BattleStageUI = (function (_super) {
    __extends(BattleStageUI, _super);
    function BattleStageUI() {
        return _super.call(this) || this;
    }
    BattleStageUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    return BattleStageUI;
}(eui.Component));
__reflect(BattleStageUI.prototype, "BattleStageUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BattleStageUI.js.map