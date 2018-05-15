var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var controller;
(function (controller) {
    var game;
    (function (game) {
        //提示类,智能提示
        var Prompt = (function () {
            function Prompt() {
                this._types = new game.PlayCardTypes();
                this._types = new game.PlayCardTypes();
            }
            /**
             * 选择最优牌
             * @param mylist 玩家自己的手牌
             * @param tableList 桌上牌,
             * @param enemycount 敌人的手牌数量
             * @param teamcount 队友的手牌数量
             * @constructor
             */
            Prompt.prototype.GetPrompt = function (mylist, tableList, enemycount, teamcount, nextIsteam, lastIsTeam) {
                if (tableList == null) {
                    return this.getbest(mylist, enemycount, teamcount, nextIsteam);
                }
                else {
                    var cld = this.getMinListByType(mylist, tableList.Type, tableList);
                    if (cld != null && mylist.List.length - cld.List.length > 2 && lastIsTeam) {
                        if (cld.Type == controller.game.PlayCardTypes.Types_Signal) {
                            if (cld.SingleArr[0] > 14) {
                                return null;
                            }
                        }
                        else if (cld.Type == controller.game.PlayCardTypes.Types_Double) {
                            if (cld.DoubleArr[0] > 14) {
                                return null;
                            }
                        }
                        else if (cld.Type == controller.game.PlayCardTypes.Types_Bomb) {
                            return null;
                        }
                    }
                    return cld;
                }
            };
            Prompt.prototype.GetPromptContain = function (mylist, tableList) {
                if (mylist.ContainList(tableList) == false) {
                    return null;
                }
                var sl = [103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114];
                var cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                if (cld == null || cld.ContainList(tableList) == false) {
                    sl = [104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114];
                    cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                    if (cld == null || cld.ContainList(tableList) == false) {
                        sl = [103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113];
                        cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                        if (cld == null || cld.ContainList(tableList) == false) {
                            sl = [105, 106, 107, 108, 109, 110, 111, 112, 113, 114];
                            cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                            if (cld == null || cld.ContainList(tableList) == false) {
                                sl = [103, 104, 105, 106, 107, 108, 109, 110, 111, 112];
                                cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                if (cld == null || cld.ContainList(tableList) == false) {
                                    sl = [106, 107, 108, 109, 110, 111, 112, 113, 114];
                                    cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                    if (cld == null || cld.ContainList(tableList) == false) {
                                        sl = [107, 108, 109, 110, 111, 112, 113, 114];
                                        cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                        if (cld == null || cld.ContainList(tableList) == false) {
                                            sl = [103, 104, 105, 106, 107, 108, 109, 110, 111];
                                            cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                            if (cld == null || cld.ContainList(tableList) == false) {
                                                sl = [103, 104, 105, 106, 107, 108, 109, 110];
                                                cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                if (cld == null || cld.ContainList(tableList) == false) {
                                                    sl = [108, 109, 110, 111, 112, 113, 114];
                                                    cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                    if (cld == null || cld.ContainList(tableList) == false) {
                                                        sl = [103, 104, 105, 106, 107, 108, 109];
                                                        cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                        if (cld == null || cld.ContainList(tableList) == false) {
                                                            sl = [109, 110, 111, 112, 113, 114];
                                                            cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                            if (cld == null || cld.ContainList(tableList) == false) {
                                                                sl = [103, 104, 105, 106, 107, 108];
                                                                cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                if (cld == null || cld.ContainList(tableList) == false) {
                                                                    sl = [110, 111, 112, 113, 114];
                                                                    cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                    if (cld == null || cld.ContainList(tableList) == false) {
                                                                        sl = [109, 110, 111, 112, 113];
                                                                        cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                        if (cld == null || cld.ContainList(tableList) == false) {
                                                                            sl = [108, 109, 110, 111, 112];
                                                                            cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                            if (cld == null || cld.ContainList(tableList) == false) {
                                                                                sl = [107, 108, 109, 110, 111];
                                                                                cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                                if (cld == null || cld.ContainList(tableList) == false) {
                                                                                    sl = [106, 107, 108, 109, 110];
                                                                                    cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                                    if (cld == null || cld.ContainList(tableList) == false) {
                                                                                        sl = [105, 106, 107, 108, 109];
                                                                                        cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                                        if (cld == null || cld.ContainList(tableList) == false) {
                                                                                            sl = [104, 105, 106, 107, 108];
                                                                                            cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                                            if (cld == null || cld.ContainList(tableList) == false) {
                                                                                                sl = [103, 104, 105, 106, 107];
                                                                                                cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (cld == null || cld.ContainList(tableList) == false) {
                    return null;
                }
                return cld;
            };
            Prompt.prototype.getContainList = function (mylist, tolist, mustlist) {
                var fromlist = mylist.OneArr;
                var len = fromlist.length;
                if (len < 5) {
                    return null;
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
                    if (value < minvalue) {
                        continue;
                    }
                    if (tolist) {
                        for (j = 0; j < tolen; j++) {
                            var nvalue = value + j;
                            var count = mylist.getCountOfNum(nvalue);
                            if (count < 1 || count > 3) {
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
                }
                if (maxnum == 0) {
                    return null;
                }
                var value2 = [];
                var getArr;
                var mustlen = mustlist.length;
                for (i = 0; i < tolen; i++) {
                    var ccvalue = maxnum - i;
                    var istype = false;
                    for (j = 0; j < mustlen; j++) {
                        if (mustlist[j] % 100 == ccvalue) {
                            ccvalue = mustlist[j];
                            istype = true;
                        }
                    }
                    getArr = mylist.getValueByNum(ccvalue, 1, istype);
                    value2 = value2.concat(getArr);
                }
                var cld = this._types.GetType(value2);
                return cld;
            };
            /**
             * 没有类型限制的时候获取最好的牌
             * @param mylist      自己的手牌
             * @param enemycount    敌人手牌数量
             * @param teamcount     队伍手牌数量
             * @returns {null}
             */
            Prompt.prototype.getbest = function (mylist, enemycount, teamcount, nextIsenemy) {
                //优先级列表
                var frontTypeList = [
                    game.PlayCardTypes.Types_ThreeN_Signal,
                    game.PlayCardTypes.Types_ThreeN_Double,
                    game.PlayCardTypes.Types_ThreeN,
                    game.PlayCardTypes.Types_DoubleN,
                    game.PlayCardTypes.Types_List,
                    game.PlayCardTypes.Types_Three_Signal,
                    game.PlayCardTypes.Types_Three_Double,
                    game.PlayCardTypes.Types_Three,
                    game.PlayCardTypes.Types_Double,
                    game.PlayCardTypes.Types_Signal,
                    //Types.Types_Four_Signal,
                    //Types.Types_Four_Double,
                    game.PlayCardTypes.Types_Bomb
                ];
                if (nextIsenemy) {
                    if (enemycount == 1) {
                        frontTypeList = [
                            game.PlayCardTypes.Types_ThreeN_Signal,
                            game.PlayCardTypes.Types_ThreeN_Double,
                            game.PlayCardTypes.Types_ThreeN,
                            game.PlayCardTypes.Types_DoubleN,
                            game.PlayCardTypes.Types_List,
                            game.PlayCardTypes.Types_Three_Signal,
                            game.PlayCardTypes.Types_Three_Double,
                            game.PlayCardTypes.Types_Three,
                            game.PlayCardTypes.Types_Double,
                            //Types.Types_Four_Signal,
                            //Types.Types_Four_Double,
                            game.PlayCardTypes.Types_Bomb,
                            game.PlayCardTypes.Types_Signal
                        ];
                    }
                    else if (enemycount == 2) {
                        frontTypeList = [
                            game.PlayCardTypes.Types_ThreeN_Signal,
                            game.PlayCardTypes.Types_ThreeN_Double,
                            game.PlayCardTypes.Types_ThreeN,
                            game.PlayCardTypes.Types_DoubleN,
                            game.PlayCardTypes.Types_List,
                            game.PlayCardTypes.Types_Three_Signal,
                            game.PlayCardTypes.Types_Three_Double,
                            game.PlayCardTypes.Types_Three,
                            game.PlayCardTypes.Types_Signal,
                            //Types.Types_Four_Signal,
                            //Types.Types_Four_Double,
                            game.PlayCardTypes.Types_Bomb,
                            game.PlayCardTypes.Types_Double
                        ];
                    }
                }
                else {
                    if (teamcount == 1) {
                        frontTypeList = [
                            game.PlayCardTypes.Types_Signal,
                            game.PlayCardTypes.Types_ThreeN_Signal,
                            game.PlayCardTypes.Types_ThreeN_Double,
                            game.PlayCardTypes.Types_ThreeN,
                            game.PlayCardTypes.Types_DoubleN,
                            game.PlayCardTypes.Types_List,
                            game.PlayCardTypes.Types_Three_Signal,
                            game.PlayCardTypes.Types_Three_Double,
                            game.PlayCardTypes.Types_Three,
                            game.PlayCardTypes.Types_Double,
                            //Types.Types_Four_Signal,
                            //Types.Types_Four_Double,
                            game.PlayCardTypes.Types_Bomb
                        ];
                    }
                    else if (enemycount == 2) {
                        frontTypeList = [
                            game.PlayCardTypes.Types_Double,
                            game.PlayCardTypes.Types_ThreeN_Signal,
                            game.PlayCardTypes.Types_ThreeN_Double,
                            game.PlayCardTypes.Types_ThreeN,
                            game.PlayCardTypes.Types_DoubleN,
                            game.PlayCardTypes.Types_List,
                            game.PlayCardTypes.Types_Three_Signal,
                            game.PlayCardTypes.Types_Three_Double,
                            game.PlayCardTypes.Types_Three,
                            game.PlayCardTypes.Types_Signal,
                            //Types.Types_Four_Signal,
                            //Types.Types_Four_Double,
                            game.PlayCardTypes.Types_Bomb
                        ];
                    }
                }
                var i = 0;
                var len = frontTypeList.length;
                var type = 0;
                var tolist = null;
                for (i = 0; i < len; i++) {
                    type = frontTypeList[i];
                    var cd = this.getMinListByType(mylist, type);
                    if (cd != null) {
                        return cd;
                    }
                }
                return null;
            };
            /**
             * 从小到大获取提示
             *
             * @param mylist
             *            玩家手牌
             * @param type
             *            类型
             * @param tolist
             *            =null 桌面牌,没有桌面牌从小到大选择一张
             * @return
             */
            Prompt.prototype.getMinListByType = function (mylist, type, tolist) {
                switch (type) {
                    case game.PlayCardTypes.Types_Signal:
                        var slist = null;
                        if (tolist == null) {
                            slist = this.getSigleMaxEM(mylist);
                        }
                        if (slist) {
                            return slist;
                        }
                        else {
                            return this.getSigle(mylist, tolist);
                        }
                    case game.PlayCardTypes.Types_Double:
                        return this.getDouble(mylist, tolist);
                    case game.PlayCardTypes.Types_Three:
                        return this.getThree(mylist, tolist);
                    case game.PlayCardTypes.Types_Three_Signal:
                        return this.getThree_Signal(mylist, tolist);
                    case game.PlayCardTypes.Types_Three_Double:
                        return this.getThree_Double(mylist, tolist);
                    case game.PlayCardTypes.Types_Four_Double:
                        return this.getBomb(mylist, tolist);
                    case game.PlayCardTypes.Types_Four_Signal:
                        return this.getBomb(mylist, tolist);
                    case game.PlayCardTypes.Types_ThreeN:
                        return this.getThreeN(mylist, tolist);
                    case game.PlayCardTypes.Types_ThreeN_Signal:
                        return this.getThreeN_Signal(mylist, tolist);
                    case game.PlayCardTypes.Types_ThreeN_Double:
                        return this.getThreeN_Double(mylist, tolist);
                    case game.PlayCardTypes.Types_List:
                        return this.getList(mylist, tolist);
                    case game.PlayCardTypes.Types_DoubleN:
                        return this.getDoubleN(mylist, tolist);
                    case game.PlayCardTypes.Types_Bomb:
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
            Prompt.prototype.getBomb = function (mylist, tolist) {
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
             * 获取连对牌
             * @param tolist
             * @returns {any}
             */
            Prompt.prototype.getDoubleN = function (mylist, tolist) {
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
                var tolen = 0; //连对长度
                var tomax = 10; //连对最大长度
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
                            if (count < 2 || count > 3) {
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
                            if (count < 2 || count > 3) {
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
            Prompt.prototype.getList = function (mylist, tolist) {
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
                            if (count < 1 || count > 3) {
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
                            if (count < 1 || count > 3) {
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
            Prompt.prototype.getThreeN_Signal = function (mylist, tolist) {
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
                var sign1;
                var sign2;
                if (mylist.SingleArr.length > 1) {
                    sign1 = mylist.SingleArr[0];
                    sign2 = mylist.SingleArr[1];
                }
                else {
                    //没有单牌和对子就不提示了.
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var signArr1 = mylist.getValueByNum(sign1, 2);
                var signArr2 = mylist.getValueByNum(sign2, 2);
                var value2 = [];
                var getArr;
                for (i = 0; i < tolen; i++) {
                    getArr = mylist.getValueByNum(maxnum - i, 3);
                    value2 = value2.concat(getArr);
                }
                value2 = value2.concat(signArr1);
                value2 = value2.concat(signArr2);
                var cld = this._types.GetType(value2);
                return cld;
            };
            /**
             *
             * @param tolist 要比tolist的牌大
             * @returns {any}
             */
            Prompt.prototype.getThreeN_Double = function (mylist, tolist) {
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
                var sign1;
                var sign2;
                if (mylist.DoubleArr.length > 1) {
                    sign1 = mylist.DoubleArr[0];
                    sign2 = mylist.DoubleArr[1];
                }
                else {
                    //没有单牌和对子就不提示了.
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var signArr1 = mylist.getValueByNum(sign1, 2);
                var signArr2 = mylist.getValueByNum(sign2, 2);
                var value2 = [];
                var getArr;
                for (i = 0; i < tolen; i++) {
                    getArr = mylist.getValueByNum(maxnum - i, 3);
                    value2 = value2.concat(getArr);
                }
                value2 = value2.concat(signArr1);
                value2 = value2.concat(signArr2);
                var cld = this._types.GetType(value2);
                return cld;
            };
            /**
             * 获取飞机牌
             * @param tolist
             * @returns {any}
             */
            Prompt.prototype.getThreeN = function (mylist, tolist) {
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
            Prompt.prototype.getThree_Double = function (mylist, tolist) {
                var fromlist = mylist.TripleArr;
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
                var sign;
                if (mylist.DoubleArr.length > 0) {
                    sign = mylist.DoubleArr[0];
                }
                else {
                    //没有单牌和对子就不提示了.
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var signArr = mylist.getValueByNum(sign, 2);
                var value2 = mylist.getValueByNum(value, 3);
                var value3 = value2.concat(signArr);
                var cld = this._types.GetType(value3);
                return cld;
            };
            /**
             *
             * @param tolist 要比tolist的牌大
             * @returns {any}
             */
            Prompt.prototype.getThree_Signal = function (mylist, tolist) {
                var fromlist = mylist.TripleArr;
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
                var sign;
                if (mylist.SingleArr.length > 0) {
                    sign = mylist.SingleArr[0];
                }
                else if (mylist.DoubleArr.length > 0) {
                    sign = mylist.DoubleArr[0];
                }
                else {
                    if (tolist != null) {
                        return this.getBomb(mylist);
                    }
                    else {
                        return null;
                    }
                }
                var signArr = mylist.getValueByNum(sign, 1);
                var value2 = mylist.getValueByNum(value, 3);
                var value3 = value2.concat(signArr);
                var cld = this._types.GetType(value3);
                return cld;
            };
            /**
             *
             * @param tolist 要比tolist的牌大
             * @returns {any}
             */
            Prompt.prototype.getThree = function (mylist, tolist) {
                var fromlist = mylist.TripleArr;
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
            Prompt.prototype.getDouble = function (mylist, tolist, ismust) {
                var fromlist = mylist.DoubleArr;
                if (ismust) {
                    fromlist = mylist.TripleArr;
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
            Prompt.prototype.getSigle = function (mylist, tolist, ismust) {
                var fromlist = mylist.SingleArr;
                if (ismust) {
                    fromlist = mylist.AllArr;
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
                if ((value == 98 && mylist.getCountOfNum(99) > 0) || (value == 99 && mylist.getCountOfNum(98) > 0)) {
                    return this.getBomb(mylist, null);
                }
                var value2 = mylist.getValueByNum(value, 1);
                var cld = this._types.GetType(value2);
                return cld;
            };
            //从大到小出单牌,有王除外.
            Prompt.prototype.getSigleMaxEM = function (mylist) {
                if (mylist.DoubleArr.length > 0 || mylist.TripleArr.length > 0 || mylist.QuadrupleArr.length > 0 || mylist.HasBomb()) {
                    return null;
                }
                var fromlist = mylist.SingleArr;
                var len = fromlist.length;
                if (len < 1) {
                    return null;
                }
                var minvalue = 0;
                var i = 0;
                var value = 0;
                for (i = 0; i < len; i++) {
                    value = fromlist[i];
                    if (value > minvalue) {
                        minvalue = value;
                    }
                }
                if (value == 0) {
                    return null;
                }
                if (value > 14) {
                    return null;
                }
                var value2 = mylist.getValueByNum(value, 1);
                var cld = this._types.GetType(value2);
                return cld;
            };
            return Prompt;
        }());
        game.Prompt = Prompt;
        __reflect(Prompt.prototype, "controller.game.Prompt");
    })(game = controller.game || (controller.game = {}));
})(controller || (controller = {}));
//# sourceMappingURL=Prompt.js.map