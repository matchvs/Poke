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
        var _this = _super.call(this) || this;
        _this._topHeader = null; //顶部用户自己的头像和积分位置
        _this._battleControl = null; //对战控制
        _this._battleSprite = null; //对战控制舞台
        return _this;
    }
    BattleStageUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (partName == "topHeader") {
            this._topHeader = instance;
        }
    };
    /**
     * 添加几个假的用户
     */
    BattleStageUI.prototype.explameAddPlayer = function () {
        GlobalData.myUser = new GUser();
        GlobalData.myUser.avator = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526393669326&di=835161a2290b3b6ae1740bd39eb52f3e&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201609%2F16%2F20160916214658_UcHjJ.jpeg";
        GlobalData.myUser.nickName = "vv";
        GlobalData.myUser.userID = 85642;
        GlobalData.myUser.pointValue = 12535;
    };
    BattleStageUI.prototype.showTopUserInfo = function (user) {
        if (user) {
            this._topHeader.init();
            this._topHeader.ShowAvator(user.avator);
            this._topHeader.SetNickName(user.nickName);
            this._topHeader.SetPointValue(user.pointValue);
        }
    };
    BattleStageUI.prototype.init = function () {
        this.explameAddPlayer();
        this.showTopUserInfo(GlobalData.myUser);
        this._battleSprite = new egret.Sprite();
        this.addChild(this._battleSprite);
        this._battleControl = new battle.BattleStageControl(this);
        this._battleControl.init();
    };
    //添加用户
    BattleStageUI.prototype.addPlayer = function (user) {
        this._battleControl.addPlayer(user);
    };
    return BattleStageUI;
}(eui.Component));
__reflect(BattleStageUI.prototype, "BattleStageUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BattleStageUI.js.map