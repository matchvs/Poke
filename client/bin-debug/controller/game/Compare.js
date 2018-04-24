var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var controller;
(function (controller) {
    var game;
    (function (game) {
        var Compare = (function () {
            function Compare() {
            }
            Compare.prototype.IsBiger = function (cld1, cld2) {
                if (cld2 == null) {
                    trace("Compare-IsBiger> 没有桌面牌");
                    return true;
                }
                if (cld1.Type != cld2.Type && cld1.Type != game.Types.Types_Bomb) {
                    trace("Compare-IsBiger> 类型出错");
                    return false;
                }
                switch (cld1.Type) {
                    case game.Types.Types_Signal:
                        return this.compareSigle(cld1, cld2);
                    case game.Types.Types_Double:
                        return this.compareDouble(cld1, cld2);
                    case game.Types.Types_Three:
                    case game.Types.Types_Three_Signal:
                    case game.Types.Types_Three_Double:
                        return this.compareThree(cld1, cld2);
                    case game.Types.Types_Four_Double:
                    case game.Types.Types_Four_Signal:
                        return this.compareFour(cld1, cld2);
                    case game.Types.Types_ThreeN:
                    case game.Types.Types_ThreeN_Signal:
                    case game.Types.Types_ThreeN_Double:
                        return this.compareThreeN(cld1, cld2);
                    case game.Types.Types_List:
                        return this.compareList(cld1, cld2);
                    case game.Types.Types_DoubleN:
                        return this.compareDoubleN(cld1, cld2);
                    case game.Types.Types_Bomb:
                        return this.compareBomb(cld1, cld2);
                    default:
                        break;
                }
            };
            //比较炸弹
            Compare.prototype.compareBomb = function (cld1, cld2) {
                if (cld2.Type != game.Types.Types_Bomb) {
                    return true;
                }
                var num1;
                var num2;
                var len1 = cld1.QuadrupleArr.length;
                var len2 = cld2.QuadrupleArr.length;
                if (len1 == 0) {
                    return true;
                }
                if (len2 == 0) {
                    trace("Compare-IsBiger> 不能大过王炸");
                    return false;
                }
                num1 = cld1.QuadrupleArr[0];
                num2 = cld2.QuadrupleArr[0];
                if (num1 > num2) {
                    return true;
                }
                else {
                    return false;
                }
            };
            //比较连对
            Compare.prototype.compareDoubleN = function (cld1, cld2) {
                var num1;
                var num2;
                var len1 = cld1.DoubleArr.length;
                var len2 = cld2.DoubleArr.length;
                if (len1 != len2) {
                    trace("Compare-IsBiger> 连对数量不匹配");
                    return false;
                }
                num1 = cld1.DoubleArr[0];
                num2 = cld2.DoubleArr[0];
                if (num1 > num2) {
                    return true;
                }
                else {
                    return false;
                }
            };
            //比较顺子
            Compare.prototype.compareList = function (cld1, cld2) {
                var num1;
                var num2;
                var len1 = cld1.SingleArr.length;
                var len2 = cld2.SingleArr.length;
                if (len1 != len2) {
                    trace("Compare-IsBiger> 顺子数量不匹配");
                    return false;
                }
                num1 = cld1.SingleArr[0];
                num2 = cld2.SingleArr[0];
                if (num1 > num2) {
                    return true;
                }
                else {
                    return false;
                }
            };
            //比较飞机
            Compare.prototype.compareThreeN = function (cld1, cld2) {
                var num1;
                var num2;
                var len1 = cld1.TripleArr.length;
                var len2 = cld2.TripleArr.length;
                if (len1 != len2) {
                    trace("Compare-IsBiger> 飞机数量不匹配");
                    return false;
                }
                num1 = cld1.TripleArr[0];
                num2 = cld2.TripleArr[0];
                if (num1 > num2) {
                    return true;
                }
                else {
                    return false;
                }
            };
            //四张比较
            Compare.prototype.compareFour = function (cld1, cld2) {
                var num1;
                var num2;
                num1 = cld1.QuadrupleArr[0];
                num2 = cld2.QuadrupleArr[0];
                if (num1 > num2) {
                    return true;
                }
                else {
                    return false;
                }
            };
            //三张比较
            Compare.prototype.compareThree = function (cld1, cld2) {
                var num1;
                var num2;
                num1 = cld1.TripleArr[0];
                num2 = cld2.TripleArr[0];
                if (num1 > num2) {
                    return true;
                }
                else {
                    return false;
                }
            };
            //对子比较
            Compare.prototype.compareDouble = function (cld1, cld2) {
                var num1;
                var num2;
                num1 = cld1.DoubleArr[0];
                num2 = cld2.DoubleArr[0];
                if (num1 > num2) {
                    return true;
                }
                else {
                    return false;
                }
            };
            //单张比较
            Compare.prototype.compareSigle = function (cld1, cld2) {
                var num1;
                var num2;
                num1 = cld1.SingleArr[0];
                num2 = cld2.SingleArr[0];
                if (num1 > num2) {
                    return true;
                }
                else {
                    return false;
                }
            };
            return Compare;
        }());
        game.Compare = Compare;
        __reflect(Compare.prototype, "controller.game.Compare");
    })(game = controller.game || (controller.game = {}));
})(controller || (controller = {}));
//# sourceMappingURL=Compare.js.map