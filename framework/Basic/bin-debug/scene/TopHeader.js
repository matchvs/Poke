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
var TopHeader = (function (_super) {
    __extends(TopHeader, _super);
    function TopHeader() {
        var _this = _super.call(this) || this;
        _this.allChildren = [];
        _this._headerImg = null;
        _this._nickName = null;
        _this._pointValue = null;
        return _this;
    }
    /**
     * 获取Exml 文件内容
     */
    TopHeader.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        this.allChildren[partName] = instance;
    };
    TopHeader.prototype.init = function () {
        this._headerImg = this.allChildren["headImg"];
        this._nickName = this.allChildren["nickName"];
        this._pointValue = this.allChildren["pointValue"];
    };
    /**
     * 设置头像
     */
    TopHeader.prototype.ShowAvator = function (avator) {
        if (this._headerImg) {
            this._headerImg.source = avator;
        }
    };
    /**
     * 设置昵称
     */
    TopHeader.prototype.SetNickName = function (name) {
        if (this._nickName) {
            this._nickName.text = name;
        }
    };
    /**
     * 设置积分
     */
    TopHeader.prototype.SetPointValue = function (value) {
        if (this._pointValue) {
            this._pointValue.text = value.toString();
        }
    };
    return TopHeader;
}(eui.Component));
__reflect(TopHeader.prototype, "TopHeader", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=TopHeader.js.map