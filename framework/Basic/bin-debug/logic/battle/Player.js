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
var battle;
(function (battle) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super.call(this) || this;
            _this._cardList = []; //牌列表
            _this.isLandLord = false; //是否是地主
            _this.seatNo = 0; //座位号
            _this.LocalTableId = 0; //上下家标识 1 上家， 2下家 3 为自己
            _this.IsReady = false;
            _this._cardNumber = 0; //牌数量
            return _this;
        }
        Object.defineProperty(Player.prototype, "cardList", {
            get: function () {
                return this.cardList;
            },
            set: function (cards) {
                if (cards == null) {
                    return;
                }
                for (var i in cards) {
                    this._cardList.push(cards[i]);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "cardNumber", {
            /**
             * 获取牌数量
             */
            get: function () {
                return this._cardList.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 叫地主
         */
        Player.prototype.callLandlord = function (value) {
        };
        /**
         * 出牌
         */
        Player.prototype.playCards = function (arr) {
            if (arr == null) {
                return;
            }
            var i = 0;
            var j = 0;
            var len = arr.length;
            for (i = 0; i < len; i++) {
                for (j = this._cardList.length - 1; j >= 0; j--) {
                    if (this._cardList[j] == arr[i]) {
                        this._cardList.splice(j, 1);
                        break;
                    }
                }
            }
        };
        return Player;
    }(GUser));
    battle.Player = Player;
    __reflect(Player.prototype, "battle.Player");
})(battle || (battle = {}));
//# sourceMappingURL=Player.js.map