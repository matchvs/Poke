/**
 * Created by Administrator on 2015/12/25.
 */
// 倒计时'闹钟'
var scene;
(function (scene) {
    var PlayerTime = (function (_super) {
        __extends(PlayerTime, _super);
        function PlayerTime() {
            _super.call(this);
            this._contain = null;
            this._loc = 0;
            this.PlayerTime = 25000;
            this._bg = null;
            this._startTime = 0;
            this._alert = false;
            this._flashTime = 0;
            this._txt = null;
        }
        var d = __define,c=PlayerTime;p=c.prototype;
        p.Init = function () {
            this._contain = new egret.Sprite();
            this.addChild(this._contain);
            this._bg = new egret.Sprite();
            this._contain.addChild(this._bg);
            var bg = new egret.Bitmap(RES.getRes("ui_clock"));
            this._bg.addChild(bg);
            bg.x = 0;
            bg.y = 0;
            this._txt = new egret.TextField();
            this._txt.text = "";
            this._txt.width = 50;
            this._txt.textColor = 0xff0000;
            this._contain.addChild(this._txt);
            this._txt.textAlign = egret.HorizontalAlign.CENTER;
            this._txt.x = 12;
            this._txt.y = 23;
            this._alert = false;
            this._contain.visible = true;
        };
        p.SetPoint = function (loc, delaytime) {
            if (loc == 1) {
                this.x = 60;
                this.y = 250;
            }
            else if (loc == 2) {
                this.x = 500;
                this.y = 250;
            }
            else if (loc == 3) {
                this.x = 147;
                this.y = 540;
            }
            this._loc = loc;
            this.PlayerTime = delaytime;
            this._startTime = egret.getTimer();
            this._alert = false;
            this._contain.visible = true;
        };
        p.Update = function () {
            var ntimer = egret.getTimer();
            var pstimer = ntimer - this._startTime;
            var progree = pstimer / this.PlayerTime;
            if (progree > 1) {
                progree = 1;
            }
            var hastime = Math.floor((this.PlayerTime - pstimer) / 1000);
            if (hastime < 0) {
                hastime = 0;
            }
            ;
            var hasstr = "" + hastime;
            if (hasstr != this._txt.text) {
                this._txt.text = hasstr;
            }
            if (this._loc != 3) {
                return;
            }
            if (progree > 0.5 && this._alert == false && this.visible) {
                this._alert = true;
                SoundMgr.Instance.PlayEffect("alert_mp3");
            }
            if (this._alert) {
                if (hastime <= 0) {
                    this._contain.visible = true;
                }
                else if ((ntimer - this._flashTime) > PlayerTime.FlashDelay) {
                    this._flashTime = ntimer;
                    this._contain.visible = !this._contain.visible;
                }
            }
        };
        p.Release = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        PlayerTime.FlashDelay = 500; //闪动间隔
        return PlayerTime;
    })(egret.Sprite);
    scene.PlayerTime = PlayerTime;
    egret.registerClass(PlayerTime,"scene.PlayerTime",["IInit","IRelease"]);
})(scene || (scene = {}));
