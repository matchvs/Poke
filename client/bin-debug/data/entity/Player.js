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
            this.IsReady = false;
            this.IsAuto = false;
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
        var d = __define,c=Player;p=c.prototype;
        p.Reset = function (obj) {
            if (obj === void 0) { obj = null; }
            for (var i in obj) {
                if (this[i] != undefined) {
                    this[i] = obj[i];
                }
            }
        };
        d(p, "CardNum"
            ,function () {
                return this.CardArr.length;
            }
        );
        p.removeCards = function (arr) {
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
        p.AddCards = function (arr) {
            if (arr == null) {
                return;
            }
            for (var i in arr) {
                this.CardArr.push(arr[i]);
            }
        };
        return Player;
    })();
    data.Player = Player;
    egret.registerClass(Player,"data.Player");
})(data || (data = {}));
