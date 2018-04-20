/**
 * Created by Administrator on 2016/2/14.跑马灯
 */
var scene;
(function (scene) {
    var HouseRunning = (function (_super) {
        __extends(HouseRunning, _super);
        function HouseRunning() {
            _super.call(this);
            this._strList = null;
            this._txt = null;
            this._bgSprite = null;
            this._scrollRect = null;
        }
        var d = __define,c=HouseRunning;p=c.prototype;
        p.Init = function () {
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
        p.Push = function (str) {
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
        p.drawBg = function () {
            if (this._scrollRect == null) {
                return;
            }
            this._bgSprite.graphics.clear();
            this._bgSprite.graphics.beginFill(HouseRunning.BGCOLOR, 0.4);
            this._bgSprite.graphics.drawRect(0, 0, this._scrollRect.width + HouseRunning.BGWidth, HouseRunning.BGHeight);
            this._bgSprite.graphics.endFill();
        };
        p.Update = function () {
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
    })(egret.Sprite);
    scene.HouseRunning = HouseRunning;
    egret.registerClass(HouseRunning,"scene.HouseRunning",["IInit","IUpdate"]);
})(scene || (scene = {}));
