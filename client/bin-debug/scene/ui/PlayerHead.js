/**
 * Created by Administrator on 2015/12/25.
 */
var scene;
(function (scene) {
    var PlayerHead = (function (_super) {
        __extends(PlayerHead, _super);
        function PlayerHead() {
            _super.call(this);
            this._playerData = null;
            this._pInfo = null;
            this._headsp = null;
            this._avatarsp = null;
            this._backCardSp = null; //对手玩家的背面牌
            this._isReady = false;
            this._isAuto = false;
            this._isOwner = false;
            this._loc = 0; //位置 ,1左上,2右上,3下
            this._ready_hand = null;
            this._landflag = null;
            this._cardNumTxt = null;
            this._init = false;
        }
        var d = __define,c=PlayerHead;p=c.prototype;
        p.Init = function (pd) {
            if (this._init) {
                trace("请先执行release");
                return;
            }
            //this.touchChildren=false;
            this.touchEnabled = false;
            this._loc = pd.LocalTableId;
            this._playerData = pd;
            this.setReady();
            this.setHead();
            this.setBackCard();
            this.setTapInfo();
            this.Ready = true;
            this.ShowCard = false;
            this._headsp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this._headsp.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this._headsp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this._init = true;
        };
        p.setHead = function () {
            this._headsp = new scene.PlayerHeadFrame();
            this._headsp.Init(this._playerData.avatar);
            this.addChild(this._headsp);
            this._headsp.touchEnabled = true;
        };
        p.setTapInfo = function () {
            this._pInfo = new scene.PlayerInfo();
            this._pInfo.Init(this._playerData);
            this.addChild(this._pInfo);
            if (this._loc == 1) {
                this._pInfo.x = 100;
                this._pInfo.y = 0;
            }
            else if (this._loc == 2) {
                this._pInfo.x = -202;
                this._pInfo.y = 0;
            }
            else if (this._loc == 3) {
                this._pInfo.x = 100;
                this._pInfo.y = -125;
            }
            this._pInfo.touchChildren = false;
            this._pInfo.touchEnabled = false;
            this._pInfo.visible = false;
        };
        p.setReady = function () {
            this._ready_hand = new egret.Bitmap(RES.getRes("ui_ready_hand"));
            this.addChild(this._ready_hand);
            this._ready_hand.x = -45;
            this._ready_hand.y = 0;
            this._ready_hand.visible = false;
        };
        p.setBackCard = function () {
            if (this._loc == 3) {
                return;
            }
            this._backCardSp = new egret.Sprite();
            this.addChild(this._backCardSp);
            var i = 0;
            for (i = 0; i < 1; i++) {
                var card = MandPool.getInsByParm(scene.Card, 0);
                this._backCardSp.addChild(card);
                card.x = 0 + i * 10;
                card.y = 0;
            }
            this._backCardSp.scaleX = this._backCardSp.scaleY = 0.5;
            this._cardNumTxt = new egret.TextField();
            this._cardNumTxt.width = 200; //120;
            this._cardNumTxt.size = 100; //90
            this._cardNumTxt.textColor = 0xffff33; //0x00ffff;//0x3abdff;
            this._cardNumTxt.stroke = 5;
            this._cardNumTxt.strokeColor = 0x990000;
            this._cardNumTxt.textAlign = egret.HorizontalAlign.CENTER;
            this._backCardSp.addChild(this._cardNumTxt);
            this._cardNumTxt.text = "17";
            this._cardNumTxt.x = -35;
            this._cardNumTxt.y = 50;
            if (this._loc == 1) {
                this._backCardSp.x = 100; //45;
            }
            else if (this._loc == 2) {
                this._backCardSp.x = -70;
            }
            this._backCardSp.y = 10;
            this._backCardSp.cacheAsBitmap = true;
        };
        d(p, "ShowCard",undefined
            ,function (isshow) {
                if (this._backCardSp) {
                    this._backCardSp.visible = isshow;
                    if (isshow == false) {
                        this._cardNumTxt.text = "";
                    }
                }
            }
        );
        p.UpdateCardNum = function () {
            if (this._cardNumTxt) {
                this._cardNumTxt.text = "" + this._playerData.ShowCardNum;
            }
        };
        p.onTouchBegin = function (e) {
            this._pInfo.visible = true;
            this._pInfo.ReSet();
        };
        p.onTouchEnd = function (e) {
            this._pInfo.visible = false;
        };
        d(p, "Ready",undefined
            ,function (ready) {
                if (this._isReady == ready) {
                    return;
                }
                this._isReady = ready;
                this._ready_hand.visible = this._isReady;
                if (this._loc == 1) {
                    this._ready_hand.x = 100;
                }
                else if (this._loc == 2) {
                    this._ready_hand.x = -45;
                }
            }
        );
        d(p, "IsLandOwner",undefined
            ,function (isowner) {
                this._isOwner = isowner;
                if (this._landflag && this._landflag.parent) {
                    this._landflag.parent.removeChild(this._landflag);
                }
                if (this._isOwner) {
                    this._landflag = new egret.Bitmap(RES.getRes("ui_flag_landowner"));
                }
                else {
                    this._landflag = new egret.Bitmap(RES.getRes("ui_flag_farmer"));
                }
                this.addChild(this._landflag);
                if (this._headsp) {
                    this._headsp.visible = false;
                }
                this._landflag.x = 0;
                this._landflag.y = -90;
            }
        );
        //是否显示地主图片,是否地主
        p.LandFlagVisible = function (isshow, island) {
            if (this._landflag) {
                this._landflag.visible = isshow;
            }
            if (this._headsp) {
                this._headsp.visible = !isshow;
            }
            if (isshow) {
                this.IsLandOwner = island;
            }
        };
        p.Release = function () {
            if (this._headsp) {
                this._headsp.removeChildren();
                this._headsp.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this._headsp.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this._headsp.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            }
            if (this._landflag) {
                egret.Tween.removeTweens(this._landflag);
            }
            this._playerData = null;
            this._pInfo = null;
            this._headsp = null;
            this._avatarsp = null;
            this._backCardSp = null; //对手玩家的背面牌
            this._isReady = false;
            this._isOwner = false;
            this._isAuto = false;
            this._loc = 0; //位置 ,1左上,2右上,3下
            this._ready_hand = null;
            this._landflag = null;
            this._cardNumTxt = null;
            this.removeChildren();
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this._init = false;
        };
        return PlayerHead;
    })(egret.Sprite);
    scene.PlayerHead = PlayerHead;
    egret.registerClass(PlayerHead,"scene.PlayerHead",["IInit","IRelease"]);
})(scene || (scene = {}));
