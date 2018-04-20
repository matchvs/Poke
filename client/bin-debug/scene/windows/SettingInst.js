var windowui;
(function (windowui) {
    /**
     * 游戏记录列表
     * Created by Administrator on 2015/12/23.
     */
    var SettingInst = (function (_super) {
        __extends(SettingInst, _super);
        function SettingInst() {
            _super.call(this);
            this._btn_close = null;
            this._bg = null;
            this._yinxiao = null;
            this._yinyue = null;
            this.createView();
        }
        var d = __define,c=SettingInst;p=c.prototype;
        d(SettingInst, "Instance"
            ,function () {
                if (SettingInst._instance == null) {
                    SettingInst._instance = new SettingInst();
                }
                return SettingInst._instance;
            }
        );
        p.createView = function () {
            var aa = RES.getRes("ui_tips_bg");
            this._bg = new egret.Bitmap(aa);
            this._bg.scale9Grid = new egret.Rectangle(50, 20, 20, 15);
            this.addChild(this._bg);
            this._bg.width = 450;
            this._bg.height = 362;
            this._bg.x = 100;
            this._bg.y = 418;
            var aa = RES.getRes("title2");
            var tbg = new egret.Bitmap(aa);
            this.addChild(tbg);
            tbg.x = 270;
            tbg.y = 395;
            var aa = RES.getRes("ui_set_yinxiao");
            var tbg = new egret.Bitmap(aa);
            this.addChild(tbg);
            tbg.x = 142;
            tbg.y = 495;
            var aa = RES.getRes("ui_set_yinyue");
            var tbg = new egret.Bitmap(aa);
            this.addChild(tbg);
            tbg.x = 332;
            tbg.y = 495;
            this._yinxiao = new scene.SRadio("radio_prompt_up", "radio_prompt_down", function (isselect) {
                if (isselect) {
                    SoundMgr.Instance.SetEffectVolume(0.5);
                }
                else {
                    SoundMgr.Instance.SetEffectVolume(0);
                }
            });
            this._yinxiao.SetSelect(SoundMgr.Instance.SoundVolume != 0);
            this.addChild(this._yinxiao);
            this._yinxiao.x = 231;
            this._yinxiao.y = 497;
            this._yinyue = new scene.SRadio("radio_prompt_up", "radio_prompt_down", function (isselect) {
                if (isselect) {
                    SoundMgr.Instance.SetSoundVolume(0.5);
                }
                else {
                    SoundMgr.Instance.SetSoundVolume(0);
                }
            });
            this._yinyue.SetSelect(SoundMgr.Instance.EffectVolume != 0);
            this.addChild(this._yinyue);
            this._yinyue.x = 417;
            this._yinyue.y = 497;
            this._btn_close = new scene.SButton("btn_close");
            this._btn_close.x = 495;
            this._btn_close.y = 385;
            this.addChild(this._btn_close);
            this._btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this._bgshap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        p.onTouchTap = function (e) {
            if (e.currentTarget == this._bgshap) {
                this.Hide();
            }
            else if (e.currentTarget == this._btn_close) {
                this.Hide();
            }
        };
        p.Show = function () {
            LayerMgr.SysTip.addChild(this);
        };
        p.Hide = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        SettingInst._instance = null;
        return SettingInst;
    })(windowui.WindowsBase);
    windowui.SettingInst = SettingInst;
    egret.registerClass(SettingInst,"windowui.SettingInst");
})(windowui || (windowui = {}));
