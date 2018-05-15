var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GUser = (function () {
    function GUser() {
        this._nickName = "";
        this._userID = 0;
        this._token = "";
        this._avator = "";
        this._pointValue = 0;
        this._rank = 0;
    }
    Object.defineProperty(GUser.prototype, "nickName", {
        get: function () {
            return this._nickName;
        },
        set: function (_name) {
            this._nickName = _name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUser.prototype, "token", {
        get: function () {
            return this._token;
        },
        set: function (tok) {
            this._token = tok;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUser.prototype, "avator", {
        get: function () {
            return this._avator;
        },
        set: function (ava) {
            this._avator = ava;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUser.prototype, "pointValue", {
        get: function () {
            return this._pointValue;
        },
        set: function (value) {
            this._pointValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUser.prototype, "rank", {
        get: function () {
            return this._rank;
        },
        set: function (rk) {
            this._rank = rk;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUser.prototype, "userID", {
        get: function () {
            return this._userID;
        },
        set: function (id) {
            this._userID = id;
        },
        enumerable: true,
        configurable: true
    });
    return GUser;
}());
__reflect(GUser.prototype, "GUser");
//# sourceMappingURL=GUser.js.map