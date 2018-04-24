var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var controller;
(function (controller) {
    var game;
    (function (game) {
        var CardListData = (function () {
            function CardListData() {
                this.FromId = -1; //标记发牌玩家
                this.Type = game.Types.Types_Error;
                this.List = []; //原始数据数组,没有与100取余过
                this.AllArr = []; //数据数组,与100取余过
                this.OneArr = []; //所有的数字,只有一个,不会出现重复   与100取余过
                this.SingleArr = []; //数据数组,与100取余过
                this.DoubleArr = []; //数据数组,与100取余过
                this.TripleArr = []; //数据数组,与100取余过
                this.QuadrupleArr = []; //数据数组,与100取余过
            }
            CardListData.prototype.PlaySound = function () {
                var st = "";
                var num;
                var st2 = "_mp3";
                switch (this.Type) {
                    case game.Types.Types_Error:
                        return;
                    case game.Types.Types_Signal:
                        st = "woman_";
                        num = this.SingleArr[0];
                        break;
                    case game.Types.Types_Double:
                        st = "woman_dui";
                        num = this.DoubleArr[0];
                        break;
                    case game.Types.Types_Three:
                        st = "woman_sange";
                        break;
                    case game.Types.Types_Three_Signal:
                        st = "woman_sandaiyi";
                        break;
                    case game.Types.Types_Three_Double:
                        st = "woman_sandaiyidui";
                        break;
                    case game.Types.Types_Four_Signal:
                        st = "woman_sidaier";
                        break;
                    case game.Types.Types_Four_Double:
                        st = "woman_sidailiangdui";
                        break;
                    case game.Types.Types_ThreeN:
                        st = "woman_feiji";
                        break;
                    case game.Types.Types_ThreeN_Signal:
                        st = "woman_feiji";
                        break;
                    case game.Types.Types_ThreeN_Double:
                        st = "woman_feiji";
                        break;
                    case game.Types.Types_List:
                        st = "woman_shunzi";
                        break;
                    case game.Types.Types_DoubleN:
                        st = "woman_liandui";
                        break;
                    case game.Types.Types_Bomb:
                        st = "woman_zhadan";
                        if (this.List.length < 3) {
                            st = "woman_wangzha";
                        }
                        SoundMgr.Instance.PlayEffect("bomb_mp3", true);
                        break;
                    default:
                        break;
                }
                var url;
                if (num == null) {
                    url = st + st2;
                }
                else {
                    url = st + num + st2;
                }
                SoundMgr.Instance.PlayEffect(url);
            };
            //获取大于等于某值的牌的数量
            CardListData.prototype.HasBigTo = function (num) {
                var len = this.List.length;
                var i = 0;
                var value;
                var barr = [];
                for (i = 0; i < len; i++) {
                    value = this.List[i];
                    if (value % 100 >= num) {
                        return true;
                    }
                }
                return false;
            };
            CardListData.prototype.HasBomb = function () {
                if (this.getCountOfNum(98) > 0 && this.getCountOfNum(99) > 0) {
                    return true;
                }
                if (this.QuadrupleArr.length > 0) {
                    return true;
                }
                return false;
            };
            CardListData.prototype.getSingleValueExceptNum = function (numlist) {
                var len1 = this.AllArr.length;
                var len2 = numlist.length;
                var value;
                var barr = [];
                var i = 0;
                var j = 0;
                var has = false;
                for (i = 0; i < len1; i++) {
                    value = this.OneArr[i];
                    has = false;
                    for (j = 0; j < len2; j++) {
                        if (value % 100 == (numlist[j]) % 100) {
                            has = true;
                        }
                    }
                    if (has == false) {
                        barr.push(value);
                    }
                }
                return barr;
            };
            CardListData.prototype.getDoubleValueExceptNum = function (numlist) {
                var list = this.DoubleArr.concat(this.TripleArr);
                var len1 = list.length;
                var len2 = numlist.length;
                var value;
                var barr = [];
                var i = 0;
                var j = 0;
                var has = false;
                for (i = 0; i < len1; i++) {
                    value = list[i];
                    has = false;
                    for (j = 0; j < len2; j++) {
                        if (value % 100 == (numlist[j]) % 100) {
                            has = true;
                        }
                    }
                    if (has == false) {
                        barr.push(value);
                    }
                }
                return barr;
            };
            //根据卡牌数字得到100以上真实值
            CardListData.prototype.getValueByNum = function (num, count, type) {
                if (type === void 0) { type = false; }
                var len = this.List.length;
                var i = 0;
                var value;
                var barr = [];
                for (i = 0; i < len; i++) {
                    value = this.List[i];
                    if (type == false) {
                        if (value % 100 == num % 100) {
                            barr.push(value);
                            count--;
                            if (count <= 0) {
                                break;
                            }
                        }
                    }
                    else {
                        if (value == num) {
                            barr.push(value);
                            break;
                        }
                    }
                }
                return barr;
            };
            CardListData.prototype.ContainList = function (hlist) {
                if (hlist == null || hlist.List == null || hlist.List.length < 1) {
                    return false;
                }
                var barr = hlist.List;
                var len1 = this.List.length;
                var len2 = barr.length;
                var i = 0;
                var j = 0;
                var has = false;
                for (j = 0; j < len2; j++) {
                    has = false;
                    for (i = 0; i < len1; i++) {
                        if (barr[j] == this.List[i]) {
                            has = true;
                        }
                    }
                    if (has == false) {
                        return false;
                    }
                }
                return true;
            };
            /**
             * 根据卡牌数字得到数量,几个3,几个2之类的
             * @param num
             */
            CardListData.prototype.getCountOfNum = function (num) {
                num = num % 100;
                var len = this.AllArr.length;
                var i = 0;
                var count = 0;
                for (i = 0; i < len; i++) {
                    if (this.AllArr[i] == num) {
                        count++;
                    }
                }
                return count;
            };
            return CardListData;
        }());
        game.CardListData = CardListData;
        __reflect(CardListData.prototype, "controller.game.CardListData");
    })(game = controller.game || (controller.game = {}));
})(controller || (controller = {}));
//# sourceMappingURL=CardListData.js.map