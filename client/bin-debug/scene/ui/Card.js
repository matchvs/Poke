/**
 *
 * @author
 *
 */
var scene;
(function (scene) {
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card(value) {
            _super.call(this);
            this._value = 0;
            this._isselect = false;
            this._isjump = false;
            this._bg = null;
            this._mask = null;
            this._backbg = null;
            this._typeimg1 = null;
            this._typeimg2 = null;
            this._numimg = null;
            this._landimg = null;
            this._value = value;
            if (value == 0) {
                this.initBack();
            }
            else {
                this.init();
            }
        }
        var d = __define,c=Card;p=c.prototype;
        p.addLand = function () {
            if (this._landimg == null) {
                this._landimg = new egret.Bitmap(RES.getRes("ui_flag_card"));
            }
            this.addChild(this._landimg);
        };
        p.initBack = function () {
            this.touchEnabled = false;
            this.touchChildren = false;
            if (this._backbg == null) {
                this._backbg = new egret.Bitmap(RES.getRes("ui_cardback"));
            }
            this.addChild(this._backbg);
        };
        d(p, "Value"
            ,function () {
                return this._value;
            }
        );
        p.init = function () {
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
        d(p, "Select"
            ,function () {
                return this._isselect;
            }
            ,function (isselect) {
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
            }
        );
        d(p, "Jump"
            ,function () {
                return this._isjump;
            }
            ,function (isjump) {
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
            }
        );
        p.Release = function () {
            //if(this._typeimg1&&this._typeimg1.parent){this._typeimg1.parent.removeChild(this._typeimg1);}
            //if(this._typeimg2&&this._typeimg2.parent){this._typeimg2.parent.removeChild(this._typeimg2);}
            //if(this._backbg&&this._backbg.parent){this._backbg.parent.removeChild(this._backbg);}
            //if(this._bg&&this._bg.parent){this._bg.parent.removeChild(this._bg);}
            //if(this._mask&&this._mask.parent){this._mask.parent.removeChild(this._mask);}
            //if(this._numimg&&this._numimg.parent){this._numimg.parent.removeChild(this._numimg);}
            //MandPool.remand(this._typeimg1);
            //MandPool.remand(this._typeimg2);
            //MandPool.remand(this._backbg);
            //MandPool.remand(this._bg);
            //MandPool.remand(this._mask);
            //MandPool.remand(this._numimg);
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
            MandPool.remand(this);
        };
        Card.CARDWIDTH = 135;
        Card.CARDHEIGHT = 179;
        return Card;
    })(egret.Sprite);
    scene.Card = Card;
    egret.registerClass(Card,"scene.Card",["IRelease"]);
})(scene || (scene = {}));
