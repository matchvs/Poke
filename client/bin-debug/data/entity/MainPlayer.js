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
var data;
(function (data) {
    var MainPlayer = (function (_super) {
        __extends(MainPlayer, _super);
        function MainPlayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MainPlayer;
    }(data.Player));
    data.MainPlayer = MainPlayer;
    __reflect(MainPlayer.prototype, "data.MainPlayer");
})(data || (data = {}));
//# sourceMappingURL=MainPlayer.js.map