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
var battle;
(function (battle) {
    var HouseRunning = (function (_super) {
        __extends(HouseRunning, _super);
        function HouseRunning() {
            var _this = _super.call(this) || this;
            _this._strList = null;
            _this._txt = null;
            _this._bgSprite = null;
            _this._scrollRect = null;
            return _this;
        }
        HouseRunning.prototype.Init = function () {
            this.touchChildren = false;
            this.touchEnabled = false;
            this.cacheAsBitmap = true;
            this._strList = new Array();
            this._bgSprite = new egret.Shape();
            this.addChild(this._bgSprite);
            this.drawBg();
            this._txt = new egret.TextField();
            this._txt.textColor = 0xffff00;
            this._txt.y = 10;
            this._txt.x = HouseRunning.BGWidth;
            this._txt.size = 30;
            this.addChild(this._txt);
            this._scrollRect = new egret.Rectangle(0, 0, HouseRunning.BGWidth, HouseRunning.BGHeight);
            this.scrollRect = this._scrollRect;
        };
        HouseRunning.prototype.Push = function (str) {
            if (this._strList.length > HouseRunning.MaxLen) {
                this._strList.shift();
            }
            this._strList.push(str);
            this.visible = true;
            if (this._strList.length == 1) {
                this._scrollRect.x = 0;
                this._txt.text = this._strList[0];
                this._scrollRect.width = (HouseRunning.BGWidth + this._txt.textWidth);
                this.drawBg();
            }
            this.scrollRect = this._scrollRect;
        };
        HouseRunning.prototype.drawBg = function () {
            if (this._scrollRect == null) {
                return;
            }
            this._bgSprite.graphics.clear();
            this._bgSprite.graphics.beginFill(HouseRunning.BGCOLOR, 0.4);
            this._bgSprite.graphics.drawRect(0, 0, this._scrollRect.width + HouseRunning.BGWidth, HouseRunning.BGHeight);
            this._bgSprite.graphics.endFill();
        };
        HouseRunning.prototype.Update = function () {
            if (this._strList.length < 1) {
                return;
            }
            this._scrollRect.x += 1;
            if (this.scrollRect.x > (HouseRunning.BGWidth + this._txt.textWidth)) {
                this._strList.shift();
                if (this._strList.length < 1) {
                    this.visible = false;
                    return;
                }
                this._scrollRect.x = 0;
                this._txt.text = this._strList[0];
                this._scrollRect.width = (HouseRunning.BGWidth + this._txt.textWidth);
                this.drawBg();
            }
            this.scrollRect = this._scrollRect;
        };
        HouseRunning.BGCOLOR = 0x000000;
        HouseRunning.BGHeight = 45;
        HouseRunning.BGWidth = 400;
        HouseRunning.MaxLen = 3;
        return HouseRunning;
    }(egret.Sprite));
    battle.HouseRunning = HouseRunning;
    __reflect(HouseRunning.prototype, "battle.HouseRunning");
})(battle || (battle = {}));
//# sourceMappingURL=HouseRunning.js.map