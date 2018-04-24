var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var controller;
(function (controller) {
    var game;
    (function (game) {
        //提示类,不考虑牌型,无脑提示有没有大牌
        var Prompt2 = (function () {
            function Prompt2() {
                this._types = new game.Types();
                this._types = new game.Types();
            }
            /**
             * 选择最优牌
             * @param mylist 玩家自己的手牌
             * @param tableList 桌上牌,
             * @param enemycount 敌人的手牌数量
             * @param teamcount 队友的手牌数量
             * @constructor
             */
            Prompt2.prototype.GetPrompt = function (mylist, tableList) {
                return this.getMinListByType(mylist, tableList.Type, tableList);
            };
            Prompt2.prototype.getMinListByType = function (mylist, type, tolist) {
                switch (type) {
                    case game.Types.Types_Signal:
                        return this.getSigle(mylist, tolist);
                    case game.Types.Types_Double:
                        return this.getDouble(mylist, tolist);
                    case game.Types.Types_Three:
                        return this.getThree(mylist, tolist);
                    case game.Types.Types_Three_Signal:
                        return this.getThree_Signal(mylist, tolist);
                    case game.Types.Types_Three_Double:
                        return this.getThree_Double(mylist, tolist);
                    case game.Types.Types_Four_Double:
                        return this.getBomb(mylist, tolist);
                    case game.Types.Types_Four_Signal:
                        return this.getBomb(mylist, tolist);
                    case game.Types.Types_ThreeN:
                        return this.getThreeN(mylist, tolist);
                    case game.Types.Types_ThreeN_Signal:
                        return this.getThreeN_Signal(mylist, tolist);
                    case game.Types.Types_ThreeN_Double:
                        return this.getThreeN_Double(mylist, tolist);
                    case game.Types.Types_List:
                        return this.getList(mylist, tolist);
                    case game.Types.Types_DoubleN:
                        return this.getDoubleN(mylist, tolist);
                    case game.Types.Types_Bomb:
                        return this.getBomb(mylist, tolist);
                    default:
                        break;
                }
            };
            /**
             * 获取炸弹
             * @param tolist
             * @returns {any}
             */
            Prompt2.prototype.getBomb = function (mylist, tolist) {
                var fromlist = mylist.QuadrupleArr;
                var bigkingcount = mylist.getCountOfNum(99);
                var tinykingcount = mylist.getCountOfNum(98);
                var len = fromlist.length;
                if (len < 1 && (bigkingcount < 1 || tinykingcount < 1) || (tolist && tolist.AllArr.length == 2)) {
                    return null;
                }
                var minvalue = 0;
                if (tolist) {
                    minvalue = tolist.QuadrupleArr[0];
                }
                var i = 0;
                var value = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value > minvalue) {
                        break;
                    }
                    value = 0;
                }
                if (value > 0) {
                    var value2 = mylist.getValueByNum(value, 4);
                    var cld = this._types.GetType(value2);
                    return cld;
                }
                else if (bigkingcount > 0 && tinykingcount > 0) {
                    var king1 = mylist.getValueByNum(98, 1);
                    var king2 = mylist.getValueByNum(99, 1);
                    var kingbomb = king1.concat(king2);
                    var cld = this._types.GetType(kingbomb);
                    return cld;
                }
                return null;
            };
            /**
             * 获取飞机牌
             * @param tolist
             * @returns {any}
             */
            Prompt2.prototype.getDoubleN = function (mylist, tolist) {
                var fromlist = mylist.DoubleArr;
                var len = fromlist.length;
                if (len < 3) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var minvalue = 0;
                var tolen = 0; //顺子长度
                var tomax = 10; //顺子最大长度
                if (tolist) {
                    minvalue = tolist.DoubleArr[0];
                    tolen = tolist.DoubleArr.length;
                }
                var i = 0;
                var j = 0;
                var value = 0;
                var maxnum = 0;
                var maxlcount = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value <= minvalue) {
                        continue;
                    }
                    if (tolist) {
                        for (j = 0; j < tolen; j++) {
                            var nvalue = value + j;
                            var count = mylist.getCountOfNum(nvalue);
                            if (count < 2) {
                                break;
                            }
                            if (j == tolen - 1) {
                                maxnum = nvalue;
                            }
                        }
                        if (maxnum != 0) {
                            break;
                        }
                    }
                    else {
                        for (j = 0; j < tomax; j++) {
                            var nvalue = value + j;
                            var count = mylist.getCountOfNum(nvalue);
                            if (count < 2) {
                                break;
                            }
                            else {
                                tolen++;
                                if (tolen > 2 && tolen > maxlcount) {
                                    maxlcount = tolen;
                                    maxnum = nvalue;
                                }
                            }
                        }
                        if (i >= len - 1) {
                            tolen = maxlcount;
                        }
                        else {
                            tolen = 0;
                        }
                    }
                }
                if (maxnum == 0) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var value2 = [];
                var getArr;
                for (i = 0; i < tolen; i++) {
                    getArr = mylist.getValueByNum(maxnum - i, 2);
                    value2 = value2.concat(getArr);
                }
                var cld = this._types.GetType(value2);
                return cld;
            };
            Prompt2.prototype.getList = function (mylist, tolist) {
                var fromlist = mylist.OneArr;
                var len = fromlist.length;
                if (len < 5) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var minvalue = 0;
                var tolen = 0; //顺子长度
                var tomax = 12; //顺子最大长度
                if (tolist) {
                    minvalue = tolist.SingleArr[0];
                    tolen = tolist.SingleArr.length;
                }
                var i = 0;
                var j = 0;
                var value = 0;
                var maxnum = 0;
                var maxlcount = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value <= minvalue) {
                        continue;
                    }
                    if (tolist) {
                        for (j = 0; j < tolen; j++) {
                            var nvalue = value + j;
                            var count = mylist.getCountOfNum(nvalue);
                            if (count < 1) {
                                break;
                            }
                            if (j == tolen - 1) {
                                maxnum = nvalue;
                            }
                        }
                        if (maxnum != 0) {
                            break;
                        }
                    }
                    else {
                        for (j = 0; j < tomax; j++) {
                            var nvalue = value + j;
                            var count = mylist.getCountOfNum(nvalue);
                            if (count < 1) {
                                break;
                            }
                            else {
                                tolen++;
                                if (tolen > 4 && tolen > maxlcount) {
                                    maxlcount = tolen;
                                    maxnum = nvalue;
                                }
                            }
                        }
                        if (i >= len - 1) {
                            tolen = maxlcount;
                        }
                        else {
                            tolen = 0;
                        }
                    }
                }
                if (maxnum == 0) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var value2 = [];
                var getArr;
                for (i = 0; i < tolen; i++) {
                    getArr = mylist.getValueByNum(maxnum - i, 1);
                    value2 = value2.concat(getArr);
                }
                var cld = this._types.GetType(value2);
                return cld;
            };
            /**
             *
             * @param tolist 要比tolist的牌大
             * @returns {any}
             */
            Prompt2.prototype.getThreeN_Signal = function (mylist, tolist) {
                var fromlist = mylist.TripleArr;
                var len = fromlist.length;
                if (len < 2) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var minvalue = 0;
                var tolen = 2; //飞机长度
                if (tolist) {
                    minvalue = tolist.TripleArr[0];
                    tolen = tolist.TripleArr.length;
                }
                if (len < tolen) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var i = 0;
                var j = 0;
                var value = 0;
                var maxnum = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value <= minvalue) {
                        continue;
                    }
                    for (j = 0; j < tolen; j++) {
                        var nvalue = value + j;
                        var count = mylist.getCountOfNum(nvalue);
                        if (count < 3) {
                            break;
                        }
                        if (j == tolen - 1) {
                            maxnum = nvalue;
                        }
                    }
                    if (maxnum != 0) {
                        break;
                    }
                }
                if (maxnum == 0) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var value2 = [];
                var getArr;
                for (i = 0; i < tolen; i++) {
                    getArr = mylist.getValueByNum(maxnum - i, 3);
                    value2 = value2.concat(getArr);
                }
                var singallist = mylist.getSingleValueExceptNum(value2);
                if (singallist.length < tolen) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                else {
                    var sslist = singallist.slice(0, tolen);
                    value2 = value2.concat(sslist);
                }
                var cld = this._types.GetType(value2);
                return cld;
            };
            /**
             *
             * @param tolist 要比tolist的牌大
             * @returns {any}
             */
            Prompt2.prototype.getThreeN_Double = function (mylist, tolist) {
                var fromlist = mylist.TripleArr;
                var len = fromlist.length;
                if (len < 2) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var minvalue = 0;
                var tolen = 2; //飞机长度
                if (tolist) {
                    minvalue = tolist.TripleArr[0];
                    tolen = tolist.TripleArr.length;
                }
                if (len < tolen) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var i = 0;
                var j = 0;
                var value = 0;
                var maxnum = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value <= minvalue) {
                        continue;
                    }
                    for (j = 0; j < tolen; j++) {
                        var nvalue = value + j;
                        var count = mylist.getCountOfNum(nvalue);
                        if (count < 3) {
                            break;
                        }
                        if (j == tolen - 1) {
                            maxnum = nvalue;
                        }
                    }
                    if (maxnum != 0) {
                        break;
                    }
                }
                if (maxnum == 0) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var value2 = [];
                var getArr;
                for (i = 0; i < tolen; i++) {
                    getArr = mylist.getValueByNum(maxnum - i, 3);
                    value2 = value2.concat(getArr);
                }
                var singallist = mylist.getDoubleValueExceptNum(value2);
                if (singallist.length < tolen) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                else {
                    var sslist = singallist.slice(0, tolen);
                    value2 = value2.concat(sslist);
                }
                var cld = this._types.GetType(value2);
                return cld;
            };
            /**
             * 获取飞机牌
             * @param tolist
             * @returns {any}
             */
            Prompt2.prototype.getThreeN = function (mylist, tolist) {
                var fromlist = mylist.TripleArr;
                var len = fromlist.length;
                if (len < 2) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var minvalue = 0;
                var tolen = 2; //飞机长度
                if (tolist) {
                    minvalue = tolist.TripleArr[0];
                    tolen = tolist.TripleArr.length;
                }
                if (len < tolen) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var i = 0;
                var j = 0;
                var value = 0;
                var maxnum = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value <= minvalue) {
                        continue;
                    }
                    for (j = 0; j < tolen; j++) {
                        var nvalue = value + j;
                        var count = mylist.getCountOfNum(nvalue);
                        if (count < 3) {
                            break;
                        }
                        if (j == tolen - 1) {
                            maxnum = nvalue;
                        }
                    }
                    if (maxnum != 0) {
                        break;
                    }
                }
                if (maxnum == 0) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var value2 = [];
                var getArr;
                for (i = 0; i < tolen; i++) {
                    getArr = mylist.getValueByNum(maxnum - i, 3);
                    value2 = value2.concat(getArr);
                }
                var cld = this._types.GetType(value2);
                return cld;
            };
            /**
             *
             * @param tolist 要比tolist的牌大
             * @returns {any}
             */
            Prompt2.prototype.getThree_Double = function (mylist, tolist) {
                var temp = mylist.OneArr;
                var fromlist = [];
                for (var i = 0; i < temp.length; i++) {
                    if (mylist.getCountOfNum(temp[i]) > 2) {
                        fromlist.push(temp[i]);
                    }
                }
                var len = fromlist.length;
                if (len < 1) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var minvalue = 0;
                if (tolist) {
                    minvalue = tolist.TripleArr[0];
                }
                var i = 0;
                var value = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value > minvalue) {
                        break;
                    }
                    value = 0;
                }
                if (value == 0) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var value2 = mylist.getValueByNum(value, 3);
                var singallist = mylist.getDoubleValueExceptNum(value2);
                if (singallist.length < 1) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                else {
                    var sslist = singallist.slice(0, 1);
                    value2 = value2.concat(sslist);
                }
                var cld = this._types.GetType(value2);
                return cld;
            };
            /**
             *
             * @param tolist 要比tolist的牌大
             * @returns {any}
             */
            Prompt2.prototype.getThree_Signal = function (mylist, tolist) {
                var temp = mylist.OneArr;
                var fromlist = [];
                for (var i = 0; i < temp.length; i++) {
                    if (mylist.getCountOfNum(temp[i]) > 2) {
                        fromlist.push(temp[i]);
                    }
                }
                var len = fromlist.length;
                if (len < 1) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var minvalue = 0;
                if (tolist) {
                    minvalue = tolist.TripleArr[0];
                }
                var i = 0;
                var value = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value > minvalue) {
                        break;
                    }
                    value = 0;
                }
                if (value == 0) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var value2 = mylist.getValueByNum(value, 3);
                var singallist = mylist.getSingleValueExceptNum(value2);
                if (singallist.length < 1) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                else {
                    var sslist = singallist.slice(0, 1);
                    value2 = value2.concat(sslist);
                }
                var cld = this._types.GetType(value2);
                return cld;
            };
            /**
             *
             * @param tolist 要比tolist的牌大
             * @returns {any}
             */
            Prompt2.prototype.getThree = function (mylist, tolist) {
                var temp = mylist.OneArr;
                var fromlist = [];
                for (var i = 0; i < temp.length; i++) {
                    if (mylist.getCountOfNum(temp[i]) > 2) {
                        fromlist.push(temp[i]);
                    }
                }
                var len = fromlist.length;
                if (len < 1) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var minvalue = 0;
                if (tolist) {
                    minvalue = tolist.TripleArr[0];
                }
                var i = 0;
                var value = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value > minvalue) {
                        break;
                    }
                    value = 0;
                }
                if (value == 0) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                    ;
                }
                var value2 = mylist.getValueByNum(value, 3);
                var cld = this._types.GetType(value2);
                return cld;
            };
            /**
             *
             * @param tolist 要比tolist的牌大
             * @returns {any}
             */
            Prompt2.prototype.getDouble = function (mylist, tolist, ismust) {
                var temp = mylist.OneArr;
                var fromlist = [];
                for (var i = 0; i < temp.length; i++) {
                    if (mylist.getCountOfNum(temp[i]) > 1) {
                        fromlist.push(temp[i]);
                    }
                }
                var len = fromlist.length;
                if (len < 1) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var minvalue = 0;
                if (tolist) {
                    minvalue = tolist.DoubleArr[0];
                }
                var i = 0;
                var value = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value > minvalue) {
                        break;
                    }
                    value = 0;
                }
                if (value == 0) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                    ;
                }
                var value2 = mylist.getValueByNum(value, 2);
                var cld = this._types.GetType(value2);
                return cld;
            };
            //从牌中挑出单张牌
            /**
             *
             * @param tolist 要比tolist的牌大
             * @returns {any}
             */
            Prompt2.prototype.getSigle = function (mylist, tolist, ismust) {
                var fromlist = mylist.OneArr;
                var len = fromlist.length;
                if (len < 1) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var minvalue = 0;
                if (tolist) {
                    minvalue = tolist.SingleArr[0];
                }
                var i = 0;
                var value = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value > minvalue) {
                        break;
                    }
                    value = 0;
                }
                if (value == 0) {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                    ;
                }
                var value2 = mylist.getValueByNum(value, 1);
                var cld = this._types.GetType(value2);
                return cld;
            };
            return Prompt2;
        }());
        game.Prompt2 = Prompt2;
        __reflect(Prompt2.prototype, "controller.game.Prompt2");
    })(game = controller.game || (controller.game = {}));
})(controller || (controller = {}));
//# sourceMappingURL=Prompt2.js.map