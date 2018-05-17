module gameLogic{
    //提示类,不考虑牌型,无脑提示有没有大牌
    export class Prompt2 {
        private _types:PlayCardTypes = new PlayCardTypes();

        public constructor() {
            this._types = new PlayCardTypes();
        }

        /**
         * 选择最优牌
         * @param mylist 玩家自己的手牌
         * @param tableList 桌上牌,
         * @param enemycount 敌人的手牌数量
         * @param teamcount 队友的手牌数量
         * @constructor
         */
        public GetPrompt(mylist:CardListData, tableList:CardListData):CardListData {
            return this.getMinListByType(mylist, tableList.Type, tableList);
        }


        private getMinListByType(mylist:CardListData, type:number, tolist?:CardListData):CardListData {
            switch (type) {
                case PlayCardTypes.Types_Signal:
                    return this.getSigle(mylist, tolist);
                case PlayCardTypes.Types_Double:
                    return this.getDouble(mylist, tolist);
                case PlayCardTypes.Types_Three:
                    return this.getThree(mylist, tolist);
                case PlayCardTypes.Types_Three_Signal:
                    return this.getThree_Signal(mylist, tolist);
                case PlayCardTypes.Types_Three_Double:
                    return this.getThree_Double(mylist, tolist);
                case PlayCardTypes.Types_Four_Double:
                    return this.getBomb(mylist, tolist);
                case PlayCardTypes.Types_Four_Signal:
                    return this.getBomb(mylist, tolist);
                case PlayCardTypes.Types_ThreeN:
                    return this.getThreeN(mylist, tolist);
                case PlayCardTypes.Types_ThreeN_Signal:
                    return this.getThreeN_Signal(mylist, tolist);
                case PlayCardTypes.Types_ThreeN_Double:
                    return this.getThreeN_Double(mylist, tolist);
                case PlayCardTypes.Types_List:
                    return this.getList(mylist, tolist);
                case PlayCardTypes.Types_DoubleN:
                    return this.getDoubleN(mylist, tolist);
                case PlayCardTypes.Types_Bomb:
                    return this.getBomb(mylist, tolist);
                default:
                    break;
            }
        }

        /**
         * 获取炸弹
         * @param tolist
         * @returns {any}
         */
        private getBomb(mylist:CardListData, tolist?:CardListData):CardListData {
            var fromlist:Array<number> = mylist.QuadrupleArr;
            var bigkingcount:number = mylist.getCountOfNum(99);
            var tinykingcount:number = mylist.getCountOfNum(98);
            var len:number = fromlist.length;
            if (len < 1 && (bigkingcount < 1 || tinykingcount < 1) || (tolist && tolist.AllArr.length == 2))           //没有4张或者没有大小王或者对面是大小王都返回
            {
                return null
            }
            var minvalue:number = 0;
            if (tolist) {
                minvalue = tolist.QuadrupleArr[0];
            }
            var i:number = 0;
            var value:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value > minvalue) {
                    break;
                }
                value = 0;
            }
            if (value > 0)//没有合适牌
            {
                var value2:Array<number> = mylist.getValueByNum(value, 4);
                var cld:CardListData = this._types.GetType(value2)
                return cld;
            }
            else if (bigkingcount > 0 && tinykingcount > 0)       //王炸
            {

                var king1:Array<number> = mylist.getValueByNum(98, 1);
                var king2:Array<number> = mylist.getValueByNum(99, 1);
                var kingbomb:Array<number> = king1.concat(king2);
                var cld:CardListData = this._types.GetType(kingbomb)
                return cld;
            }
            return null
        }

        /**
         * 获取飞机牌
         * @param tolist
         * @returns {any}
         */
        private getDoubleN(mylist:CardListData, tolist?:CardListData):CardListData {
            var fromlist:Array<number> = mylist.DoubleArr;
            var len:number = fromlist.length;
            if (len < 3) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            var minvalue:number = 0;
            var tolen:number = 0;//顺子长度
            var tomax:number = 10;//顺子最大长度
            if (tolist) {
                minvalue = tolist.DoubleArr[0];
                tolen = tolist.DoubleArr.length;
            }
            var i:number = 0;
            var j:number = 0;
            var value:number = 0;
            var maxnum:number = 0;
            var maxlcount:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value <= minvalue) {
                    continue;
                }
                if (tolist)//有对比牌
                {
                    for (j = 0; j < tolen; j++) {
                        var nvalue:number = value + j;
                        var count:number = mylist.getCountOfNum(nvalue);
                        if (count < 2 )        //小于1或者大于3个不算数
                        {
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
                        var nvalue:number = value + j;
                        var count:number = mylist.getCountOfNum(nvalue);
                        if (count < 2 )        //小于1或者大于3个不算数
                        {
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
            if (maxnum == 0)//没有合适牌
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            var value2:Array<number> = [];
            var getArr:Array<number>;
            for (i = 0; i < tolen; i++) {
                getArr = mylist.getValueByNum(maxnum - i, 2);
                value2 = value2.concat(getArr);
            }
            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }

        private getList(mylist:CardListData, tolist?:CardListData):CardListData {
            var fromlist:Array<number> = mylist.OneArr;
            var len:number = fromlist.length;
            if (len < 5) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            var minvalue:number = 0;
            var tolen:number = 0;//顺子长度
            var tomax:number = 12;//顺子最大长度
            if (tolist) {
                minvalue = tolist.SingleArr[0];
                tolen = tolist.SingleArr.length;
            }
            var i:number = 0;
            var j:number = 0;
            var value:number = 0;
            var maxnum:number = 0;
            var maxlcount:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value <= minvalue) {
                    continue;
                }
                if (tolist)//有对比牌
                {
                    for (j = 0; j < tolen; j++) {
                        var nvalue:number = value + j;
                        var count:number = mylist.getCountOfNum(nvalue);
                        if (count < 1 )        //小于1或者大于3个不算数
                        {
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
                        var nvalue:number = value + j;
                        var count:number = mylist.getCountOfNum(nvalue);
                        if (count < 1 )        //小于1或者大于3个不算数
                        {
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
            if (maxnum == 0)//没有合适牌
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            var value2:Array<number> = [];
            var getArr:Array<number>;
            for (i = 0; i < tolen; i++) {
                getArr = mylist.getValueByNum(maxnum - i, 1);
                value2 = value2.concat(getArr);
            }
            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }

        /**
         *
         * @param tolist 要比tolist的牌大
         * @returns {any}
         */
        private getThreeN_Signal(mylist:CardListData, tolist?:CardListData):CardListData {
            var fromlist:Array<number> = mylist.TripleArr;
            var len:number = fromlist.length;
            if (len < 2) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var minvalue:number = 0;
            var tolen:number = 2;//飞机长度
            if (tolist) {
                minvalue = tolist.TripleArr[0];
                tolen = tolist.TripleArr.length;
            }
            if (len < tolen) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var i:number = 0;
            var j:number = 0;
            var value:number = 0;
            var maxnum:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value <= minvalue) {
                    continue;
                }
                for (j = 0; j < tolen; j++) {
                    var nvalue:number = value + j;
                    var count:number = mylist.getCountOfNum(nvalue);
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
            if (maxnum == 0)//没有合适牌
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var value2:Array<number> = [];
            var getArr:Array<number>;
            for (i = 0; i < tolen; i++) {
                getArr = mylist.getValueByNum(maxnum - i, 3);
                value2 = value2.concat(getArr);
            }
            var singallist=mylist.getSingleValueExceptNum(value2);
            if(singallist.length<tolen)
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            else
            {
                var sslist=singallist.slice(0,tolen);
                value2=value2.concat(sslist);
            }

            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }


        /**
         *
         * @param tolist 要比tolist的牌大
         * @returns {any}
         */
        private getThreeN_Double(mylist:CardListData, tolist?:CardListData):CardListData {
            var fromlist:Array<number> = mylist.TripleArr;
            var len:number = fromlist.length;
            if (len < 2) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var minvalue:number = 0;
            var tolen:number = 2;//飞机长度
            if (tolist) {
                minvalue = tolist.TripleArr[0];
                tolen = tolist.TripleArr.length;
            }
            if (len < tolen) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var i:number = 0;
            var j:number = 0;
            var value:number = 0;
            var maxnum:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value <= minvalue) {
                    continue;
                }
                for (j = 0; j < tolen; j++) {
                    var nvalue:number = value + j;
                    var count:number = mylist.getCountOfNum(nvalue);
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
            if (maxnum == 0)//没有合适牌
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }


            var value2:Array<number> = [];
            var getArr:Array<number>;
            for (i = 0; i < tolen; i++) {
                getArr = mylist.getValueByNum(maxnum - i, 3);
                value2 = value2.concat(getArr);
            }

            var singallist=mylist.getDoubleValueExceptNum(value2);
            if(singallist.length<tolen)
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            else
            {
                var sslist=singallist.slice(0,tolen);
                value2=value2.concat(sslist);
            }

            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }

        /**
         * 获取飞机牌
         * @param tolist
         * @returns {any}
         */
        private getThreeN(mylist:CardListData, tolist?:CardListData):CardListData {
            var fromlist:Array<number> = mylist.TripleArr;
            var len:number = fromlist.length;
            if (len < 2) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var minvalue:number = 0;
            var tolen:number = 2;//飞机长度
            if (tolist) {
                minvalue = tolist.TripleArr[0];
                tolen = tolist.TripleArr.length;
            }
            if (len < tolen) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var i:number = 0;
            var j:number = 0;
            var value:number = 0;
            var maxnum:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value <= minvalue) {
                    continue;
                }
                for (j = 0; j < tolen; j++) {
                    var nvalue:number = value + j;
                    var count:number = mylist.getCountOfNum(nvalue);
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
            if (maxnum == 0)//没有合适牌
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            var value2:Array<number> = [];
            var getArr:Array<number>;
            for (i = 0; i < tolen; i++) {
                getArr = mylist.getValueByNum(maxnum - i, 3);
                value2 = value2.concat(getArr);
            }
            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }

        /**
         *
         * @param tolist 要比tolist的牌大
         * @returns {any}
         */
        private getThree_Double(mylist:CardListData, tolist?:CardListData):CardListData {
            var temp=mylist.OneArr;
            var fromlist:Array<number> = [];
            for(var i:number=0;i<temp.length;i++)
            {
                if(mylist.getCountOfNum(temp[i])>2)
                {
                    fromlist.push(temp[i]);
                }
            }
            var len:number = fromlist.length;
            if (len < 1) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var minvalue:number = 0;
            if (tolist) {
                minvalue = tolist.TripleArr[0];
            }
            var i:number = 0;
            var value:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value > minvalue) {
                    break;
                }
                value = 0;
            }
            if (value == 0)//没有合适牌
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var value2:Array<number> = mylist.getValueByNum(value, 3);
            var singallist=mylist.getDoubleValueExceptNum(value2);
            if(singallist.length<1)
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            else
            {
                var sslist=singallist.slice(0,1);
                value2=value2.concat(sslist);
            }

            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }

        /**
         *
         * @param tolist 要比tolist的牌大
         * @returns {any}
         */
        private getThree_Signal(mylist:CardListData, tolist?:CardListData):CardListData {
            var temp=mylist.OneArr;
            var fromlist:Array<number> = [];
            for(var i:number=0;i<temp.length;i++)
            {
                if(mylist.getCountOfNum(temp[i])>2)
                {
                    fromlist.push(temp[i]);
                }
            }
            var len:number = fromlist.length;
            if (len < 1) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var minvalue:number = 0;
            if (tolist) {
                minvalue = tolist.TripleArr[0];
            }
            var i:number = 0;
            var value:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value > minvalue) {
                    break;
                }
                value = 0;
            }
            if (value == 0)//没有合适牌
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }


            var value2:Array<number> = mylist.getValueByNum(value, 3);
            var singallist=mylist.getSingleValueExceptNum(value2);
            if(singallist.length<1)
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            else
            {
                var sslist=singallist.slice(0,1);
                value2=value2.concat(sslist);
            }
            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }

        /**
         *
         * @param tolist 要比tolist的牌大
         * @returns {any}
         */
        private getThree(mylist:CardListData, tolist?:CardListData):CardListData {
            var temp=mylist.OneArr;
            var fromlist:Array<number> = [];
            for(var i:number=0;i<temp.length;i++)
            {
                if(mylist.getCountOfNum(temp[i])>2)
                {
                    fromlist.push(temp[i]);
                }
            }
            var len:number = fromlist.length;
            if (len < 1) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var minvalue:number = 0;
            if (tolist) {
                minvalue = tolist.TripleArr[0];
            }
            var i:number = 0;
            var value:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value > minvalue) {
                    break;
                }
                value = 0;
            }
            if (value == 0)//没有合适牌
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
                ;
            }
            var value2:Array<number> = mylist.getValueByNum(value, 3);
            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }

        /**
         *
         * @param tolist 要比tolist的牌大
         * @returns {any}
         */
        private getDouble(mylist:CardListData, tolist?:CardListData, ismust?:boolean):CardListData {
            var temp=mylist.OneArr;
            var fromlist:Array<number> = [];
            for(var i:number=0;i<temp.length;i++)
            {
                if(mylist.getCountOfNum(temp[i])>1)
                {
                    fromlist.push(temp[i]);
                }
            }
            var len:number = fromlist.length;
            if (len < 1) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var minvalue:number = 0;
            if (tolist) {
                minvalue = tolist.DoubleArr[0];
            }
            var i:number = 0;
            var value:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value > minvalue) {
                    break;
                }
                value = 0;
            }
            if (value == 0)//没有合适牌
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
                ;
            }
            var value2:Array<number> = mylist.getValueByNum(value, 2);
            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }


        //从牌中挑出单张牌
        /**
         *
         * @param tolist 要比tolist的牌大
         * @returns {any}
         */
        private getSigle(mylist:CardListData, tolist?:CardListData, ismust?:boolean):CardListData {
            var fromlist:Array<number> = mylist.OneArr;
            var len:number = fromlist.length;
            if (len < 1) {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }

            var minvalue:number = 0;
            if (tolist) {
                minvalue = tolist.SingleArr[0];
            }
            var i:number = 0;
            var value:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value > minvalue) {
                    break;
                }
                value = 0;
            }
            if (value == 0)//没有合适牌
            {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
                ;
            }
            var value2:Array<number> = mylist.getValueByNum(value, 1);
            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }
    }
}