var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    var Player = (function () {
        function Player(obj) {
            if (obj === void 0) { obj = null; }
            this.userid = "";
            this.nickname = "";
            this.avatar = "";
            this.integral = 0; //积分
            this.money = 0;
            this.playerGuid = 1; //游戏服guid
            this.ResoultScore = 0; //战斗结果;
            this.TableId = 0; //桌子上的id;   0,1,2
            this.LocalTableId = 0; //与MainPlayer的相对tableid ,用于界面显示..左上1,右上2,下方自己3
            this.IsReady = false; //是否准备
            this.IsAuto = false; //是否是机器人
            this.ShowCardNum = 0; //用于显示的卡牌数量.
            this.CardArr = []; //手牌数组
            this.LandOwnerScore = 0; //叫地主的分数
            this.IsLandOwner = false; //是否地主
            this.IsRobot = false;
            for (var i in obj) {
                if (this[i] != undefined) {
                    this[i] = obj[i];
                }
            }
        }
        Player.prototype.Reset = function (obj) {
            if (obj === void 0) { obj = null; }
            for (var i in obj) {
                if (this[i] != undefined) {
                    this[i] = obj[i];
                }
            }
        };
        Object.defineProperty(Player.prototype, "CardNum", {
            get: function () {
                return this.CardArr.length;
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.removeCards = function (arr) {
            if (arr == null) {
                return;
            }
            var i = 0;
            var j = 0;
            var len = arr.length;
            for (i = 0; i < len; i++) {
                for (j = this.CardArr.length - 1; j >= 0; j--) {
                    if (this.CardArr[j] == arr[i]) {
                        this.CardArr.splice(j, 1);
                        break;
                    }
                }
            }
        };
        Player.prototype.AddCards = function (arr) {
            if (arr == null) {
                return;
            }
            for (var i in arr) {
                this.CardArr.push(arr[i]);
            }
        };
        return Player;
    }());
    data.Player = Player;
    __reflect(Player.prototype, "data.Player");
})(data || (data = {}));
//# sourceMappingURL=Player.js.map