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
    /**
     * 卡牌
     */
    var CardUI = (function (_super) {
        __extends(CardUI, _super);
        function CardUI(value) {
            var _this = _super.call(this) || this;
            _this._value = 0;
            _this._isselect = false;
            _this._isjump = false;
            _this._bg = null;
            _this._mask = null;
            _this._backbg = null;
            _this._typeimg1 = null;
            _this._typeimg2 = null;
            _this._numimg = null;
            _this._landimg = null;
            _this._value = value;
            if (value == 0) {
                _this.initBack();
            }
            else {
                _this.init();
            }
            return _this;
        }
        CardUI.prototype.addLand = function () {
            if (this._landimg == null) {
                this._landimg = new egret.Bitmap(RES.getRes("ui_flag_card"));
            }
            this.addChild(this._landimg);
        };
        CardUI.prototype.initBack = function () {
            this.touchEnabled = false;
            this.touchChildren = false;
            if (this._backbg == null) {
                this._backbg = new egret.Bitmap(RES.getRes("ui_cardback"));
            }
            this.addChild(this._backbg);
        };
        Object.defineProperty(CardUI.prototype, "Value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        CardUI.prototype.init = function () {
            this.touchEnabled = true;
            this.touchChildren = false;
            if (this._bg == null) {
                this._bg = new egret.Bitmap(RES.getRes("ui_card"));
            }
            if (this._mask == null) {
                this._mask = new egret.Bitmap(RES.getRes("ui_cardselect"));
            }
            this.addChild(this._bg);
            var type = Math.floor(this._value / 100);
            if (type < 5) {
                if (this._typeimg1 == null) {
                    this._typeimg1 = new egret.Bitmap(RES.getRes("ui_cardtype_" + type));
                }
                this.addChild(this._typeimg1);
                this._typeimg1.scaleX = this._typeimg1.scaleY = 1;
                this._typeimg1.x = 50;
                this._typeimg1.y = 75;
                if (this._typeimg2 == null) {
                    this._typeimg2 = new egret.Bitmap(RES.getRes("ui_cardtype_" + type));
                }
                this.addChild(this._typeimg2);
                this._typeimg2.scaleX = this._typeimg2.scaleY = 0.5;
                this._typeimg2.x = 11;
                this._typeimg2.y = 55;
            }
            else if (type == 9) {
                if (this._value == 999) {
                    if (this._typeimg1 == null) {
                        this._typeimg1 = new egret.Bitmap(RES.getRes("ui_cardnum9_99_dec"));
                    }
                    this.addChild(this._typeimg1);
                    this._typeimg1.x = 25;
                    this._typeimg1.y = 45;
                }
                else if (this._value == 998) {
                    if (this._typeimg1 == null) {
                        this._typeimg1 = new egret.Bitmap(RES.getRes("ui_cardnum9_98_dec"));
                    }
                    this.addChild(this._typeimg1);
                    this._typeimg1.x = 25;
                    this._typeimg1.y = 45;
                }
            }
            var color = 1;
            if (type == 2 || type == 4) {
                color = 2;
            }
            else if (type == 9) {
                color = 9;
            }
            var num = Math.floor(this._value % 100);
            if (this._numimg == null) {
                this._numimg = new egret.Bitmap(RES.getRes("ui_cardnum" + color + "_" + num));
            }
            this.addChild(this._numimg);
            this._numimg.x = 16;
            this._numimg.y = 9;
            this.addChild(this._mask);
            this._mask.visible = false;
        };
        Object.defineProperty(CardUI.prototype, "Select", {
            get: function () {
                return this._isselect;
            },
            set: function (isselect) {
                if (this._isselect == isselect) {
                    this._mask.visible = this._isselect;
                    if (this._isjump) {
                        this._mask.visible = true;
                    }
                    return;
                }
                this._isselect = isselect;
                this._mask.visible = this._isselect;
                if (this._isjump) {
                    this._mask.visible = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CardUI.prototype, "Jump", {
            get: function () {
                return this._isjump;
            },
            set: function (isjump) {
                if (this._isjump == isjump) {
                    this._mask.visible = this._isjump;
                    return;
                }
                this._isjump = isjump;
                if (this._isjump) {
                    this.y -= 20;
                }
                else {
                    this.y += 20;
                }
                this._mask.visible = this._isjump;
                if (this._isjump) {
                    this._isselect = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        CardUI.prototype.Release = function () {
            if (this._landimg && this._landimg.parent) {
                this._landimg.parent.removeChild(this._landimg);
            }
            this._isselect = false;
            this._isjump = false;
            this._mask.visible = false;
            this.scaleX = this.scaleY = 1;
            this.alpha = 1;
            if (this.parent) {
                this.parent.removeChild(this);
            }
            // MandPool.remand(this);
        };
        CardUI.CARDWIDTH = 135;
        CardUI.CARDHEIGHT = 179;
        return CardUI;
    }(egret.Sprite));
    battle.CardUI = CardUI;
    __reflect(CardUI.prototype, "battle.CardUI");
})(battle || (battle = {}));
//# sourceMappingURL=CardUI.js.map