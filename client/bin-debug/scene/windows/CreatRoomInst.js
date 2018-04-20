var windowui;
(function (windowui) {
    /**
     * 系统提示框
     * Created by Administrator on 2015/12/23.
     */
    var CreatRoomInst = (function (_super) {
        __extends(CreatRoomInst, _super);
        function CreatRoomInst() {
            _super.call(this);
            this._iscreat = false;
            this._okfun = null;
            this._okObj = null;
            this._txtInput = null;
            this._okBtn = null;
            this._btn_close = null;
            this._bg = null;
            this.touchChildren = true;
            this.touchEnabled = true;
        }
        var d = __define,c=CreatRoomInst;p=c.prototype;
        p.createView = function () {
            if (this._iscreat) {
                return;
            }
            var aa = RES.getRes("ui_tips_bg");
            this._bg = new egret.Bitmap(aa);
            this._bg.scale9Grid = new egret.Rectangle(50, 20, 20, 15);
            this.addChild(this._bg);
            this._bg.width = 480;
            this._bg.height = 250;
            this._bg.x = 90;
            this._bg.y = 440;
            this._btn_close = new scene.SButton("btn_close");
            this._btn_close.x = 515;
            this._btn_close.y = 400;
            this.addChild(this._btn_close);
            var aa = RES.getRes("ui_panel_txt");
            var tbg = new egret.Bitmap(aa);
            tbg.scale9Grid = new egret.Rectangle(13, 16, 6, 7);
            this.addChild(tbg);
            tbg.width = 400;
            tbg.height = 35;
            tbg.x = 130;
            tbg.y = 488;
            this._txtInput = new egret.TextField();
            this._txtInput.type = egret.TextFieldType.INPUT;
            this._txtInput.width = 390;
            this._txtInput.height = 35;
            this._txtInput.x = 135;
            this._txtInput.y = 490;
            this._txtInput.size = 30;
            this._txtInput.textColor = 0xAA4931;
            this._txtInput.maxChars = 20;
            this._txtInput.text = "请输入要创建或加入的房间名";
            this.addChild(this._txtInput);
            var aa = RES.getRes("title3");
            var tbg = new egret.Bitmap(aa);
            this.addChild(tbg);
            tbg.x = 300;
            tbg.y = 425;
            this._okBtn = new scene.SButton("btn_queding_no");
            this._okBtn.x = 260;
            this._okBtn.y = 600;
            this.addChild(this._okBtn);
            this._okBtn.touchEnabled = false;
            this._btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._txtInput.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusin, this);
            this._txtInput.addEventListener(egret.TextEvent.CHANGE, this.onChange, this);
            this._iscreat = true;
        };
        p.onChange = function (e) {
            if (this._txtInput.text == "请输入要创建或加入的房间名" || this._txtInput.text == "") {
                this._okBtn.SetBit("btn_queding_no");
                this._okBtn.touchEnabled = false;
            }
            else {
                this._okBtn.SetBit("btn_queding");
                this._okBtn.touchEnabled = true;
            }
        };
        p.onFocusin = function (e) {
            if (this._txtInput.text == "请输入要创建或加入的房间名") {
                this._txtInput.text = "";
            }
        };
        p.Show = function () {
            _super.prototype.Show.call(this);
            this.createView();
            LayerMgr.TopWindow.addChild(this);
        };
        p.onTap = function (e) {
            if (e.target == this._okBtn) {
                if (this._txtInput.text == "" || this._txtInput.text == "请输入要创建或加入的房间名" || this._txtInput.text.length > 20) {
                    this._okBtn.SetBit("btn_queding_no");
                    this._okBtn.touchEnabled = false;
                    return;
                }
                data.GameData.flag = data.GameData.GameFlag_Group;
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_CENTER_REQ_BATTLE, { flagId: data.GameData.GameFlag_Group, groupId: this._txtInput.text });
                SceneMgr.Instance.ShowScene(scene.GameScene);
            }
            else if (e.target == this._btn_close) {
                this.Hide();
            }
        };
        p.Hide = function () {
            _super.prototype.Hide.call(this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        d(CreatRoomInst, "Instance"
            ,function () {
                if (CreatRoomInst._instance == null) {
                    CreatRoomInst._instance = new CreatRoomInst();
                }
                return CreatRoomInst._instance;
            }
        );
        CreatRoomInst._instance = null;
        return CreatRoomInst;
    })(windowui.WindowsBase);
    windowui.CreatRoomInst = CreatRoomInst;
    egret.registerClass(CreatRoomInst,"windowui.CreatRoomInst");
})(windowui || (windowui = {}));
