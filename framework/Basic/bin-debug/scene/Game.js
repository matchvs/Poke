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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        return _super.call(this) || this;
    }
    Game.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            Toast.show("click:" + partName);
            if (partName == "back") {
                // SceneManager.back();
                instance.value = RES.getRes("button_up_png");
                // instance.touchEnabled =false;
                // instance.source = "button_up_png";
                Toast.show("ceshi");
            }
            else if (partName == "bg") {
                SceneManager.showScene(new Game());
            }
        }, this);
    };
    Game.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Game.js.map