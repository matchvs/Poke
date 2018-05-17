module gameLogic {
    //提示类,智能提示
    export class Prompt {
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
        public GetPrompt(mylist:CardListData, tableList:CardListData, enemycount:number, teamcount:number, nextIsteam:boolean,lastIsTeam:boolean):CardListData {
            if (tableList == null)//没有桌面牌,任意出牌
            {
                return this.getbest(mylist, enemycount, teamcount, nextIsteam);
            }
            else                //有桌面牌,按类型出牌
            {
                var cld:CardListData=this.getMinListByType(mylist, tableList.Type, tableList);
                if(cld!=null&&mylist.List.length-cld.List.length>2&&lastIsTeam)      //自己发完牌还剩2张以上,不大队友牌
                {
                    if(cld.Type==gameLogic.PlayCardTypes.Types_Signal)
                    {
                        if(cld.SingleArr[0]>14)     //单牌不大于A
                        {
                            return null;
                        }
                    }
                    else if(cld.Type==gameLogic.PlayCardTypes.Types_Double)
                    {
                        if(cld.DoubleArr[0]>14)     //对子不大于A
                        {
                            return null;
                        }
                    }
                    else if(cld.Type==gameLogic.PlayCardTypes.Types_Bomb)//不用炸弹
                    {
                        return null;
                    }
                }
                return cld;
            }
        }

        public GetPromptContain(mylist:CardListData, tableList:CardListData):CardListData
        {
            if(mylist.ContainList(tableList)==false)
            {
                return null;
            }
            var sl:any=[103,104,105,106,107,108,109,110,111,112,113,114];
            var cld:CardListData=this.getContainList(mylist,this._types.GetType(sl),tableList.List);
            if(cld==null||cld.ContainList(tableList)==false) {
                sl = [104,105,106,107,108,109,110,111,112,113,114];
                cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                if (cld==null||cld.ContainList(tableList)==false) {
                    sl = [103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113];
                    cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                    if (cld==null||cld.ContainList(tableList)==false) {
                        sl = [105,106,107,108,109,110,111,112,113,114];
                        cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                        if (cld==null||cld.ContainList(tableList)==false) {
                            sl = [103, 104, 105, 106, 107, 108, 109, 110, 111, 112];
                            cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                            if (cld==null||cld.ContainList(tableList)==false) {
                                sl = [106,107,108,109,110,111,112,113,114];
                                cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                if (cld==null||cld.ContainList(tableList)==false) {
                                    sl = [107,108,109,110,111,112,113,114];
                                    cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                    if (cld==null||cld.ContainList(tableList)==false) {
                                        sl = [103, 104, 105, 106, 107, 108, 109, 110, 111];
                                        cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                        if (cld==null||cld.ContainList(tableList)==false) {
                                            sl = [103, 104, 105, 106, 107, 108, 109, 110];
                                            cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                            if (cld==null||cld.ContainList(tableList)==false) {
                                                sl = [108, 109, 110, 111, 112, 113, 114];
                                                cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                if (cld==null||cld.ContainList(tableList)==false) {
                                                    sl = [103, 104, 105, 106, 107, 108, 109];
                                                    cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                    if (cld==null||cld.ContainList(tableList)==false) {
                                                        sl = [109, 110, 111, 112, 113, 114];
                                                        cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                        if (cld==null||cld.ContainList(tableList)==false) {
                                                            sl = [103, 104, 105, 106, 107, 108];
                                                            cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                            if (cld==null||cld.ContainList(tableList)==false) {
                                                                sl = [110, 111, 112, 113, 114];
                                                                cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                if (cld==null||cld.ContainList(tableList)==false) {
                                                                    sl = [109, 110, 111, 112, 113];
                                                                    cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                    if (cld==null||cld.ContainList(tableList)==false) {
                                                                        sl = [108, 109, 110, 111, 112];
                                                                        cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                        if (cld==null||cld.ContainList(tableList)==false) {
                                                                            sl = [107, 108, 109, 110, 111];
                                                                            cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                            if (cld==null||cld.ContainList(tableList)==false) {
                                                                                sl = [106, 107, 108, 109, 110];
                                                                                cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                                if (cld==null||cld.ContainList(tableList)==false) {
                                                                                    sl = [105, 106, 107, 108, 109];
                                                                                    cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                                    if (cld==null||cld.ContainList(tableList)==false) {
                                                                                        sl = [104, 105, 106, 107, 108];
                                                                                        cld = this.getContainList(mylist, this._types.GetType(sl), tableList.List);
                                                                                        if (cld==null||cld.ContainList(tableList)==false) {
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
            if(cld==null||cld.ContainList(tableList)==false)
            {
                return null;
            }
            return cld;

        }

        private getContainList(mylist:CardListData, tolist:CardListData,mustlist:Array<number>):CardListData {
            var fromlist:Array<number> = mylist.OneArr;
            var len:number = fromlist.length;
            if (len < 5) {
                    return null;
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
                if (value < minvalue) {
                    continue;
                }
                if (tolist)//有对比牌
                {
                    for (j = 0; j < tolen; j++) {
                        var nvalue:number = value + j;
                        var count:number = mylist.getCountOfNum(nvalue);
                        if (count < 1 || count > 3)        //小于1或者大于3个不算数
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

            }
            if (maxnum == 0)//没有合适牌
            {
                return null
            }
            var value2:Array<number> = [];
            var getArr:Array<number>;
            var mustlen:number=mustlist.length;
            for (i = 0; i < tolen; i++) {

                var ccvalue:number=maxnum - i;
                var istype:boolean=false;
                for(j=0;j<mustlen;j++)
                {
                    if(mustlist[j]%100==ccvalue)
                    {
                        ccvalue=mustlist[j];
                        istype=true;
                    }
                }
                getArr = mylist.getValueByNum(ccvalue, 1,istype);
                value2 = value2.concat(getArr);
            }
            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }
        /**
         * 没有类型限制的时候获取最好的牌
         * @param mylist      自己的手牌
         * @param enemycount    敌人手牌数量
         * @param teamcount     队伍手牌数量
         * @returns {null}
         */
        private getbest(mylist:CardListData, enemycount:number, teamcount:number, nextIsenemy:boolean):CardListData {
            //优先级列表
            var frontTypeList:any = [
                PlayCardTypes.Types_ThreeN_Signal,
                PlayCardTypes.Types_ThreeN_Double,
                PlayCardTypes.Types_ThreeN,
                PlayCardTypes.Types_DoubleN,
                PlayCardTypes.Types_List,
                PlayCardTypes.Types_Three_Signal,
                PlayCardTypes.Types_Three_Double,
                PlayCardTypes.Types_Three,
                PlayCardTypes.Types_Double,
                PlayCardTypes.Types_Signal,
                //Types.Types_Four_Signal,
                //Types.Types_Four_Double,
                PlayCardTypes.Types_Bomb
            ];
            if (nextIsenemy)//敌人在下桌,避免和敌人单双相同
            {
                if (enemycount == 1) {
                    frontTypeList = [
                        PlayCardTypes.Types_ThreeN_Signal,
                        PlayCardTypes.Types_ThreeN_Double,
                        PlayCardTypes.Types_ThreeN,
                        PlayCardTypes.Types_DoubleN,
                        PlayCardTypes.Types_List,
                        PlayCardTypes.Types_Three_Signal,
                        PlayCardTypes.Types_Three_Double,
                        PlayCardTypes.Types_Three,
                        PlayCardTypes.Types_Double,
                        //Types.Types_Four_Signal,
                        //Types.Types_Four_Double,
                        PlayCardTypes.Types_Bomb,
                        PlayCardTypes.Types_Signal
                    ];
                }
                else if (enemycount == 2) {
                    frontTypeList = [
                        PlayCardTypes.Types_ThreeN_Signal,
                        PlayCardTypes.Types_ThreeN_Double,
                        PlayCardTypes.Types_ThreeN,
                        PlayCardTypes.Types_DoubleN,
                        PlayCardTypes.Types_List,
                        PlayCardTypes.Types_Three_Signal,
                        PlayCardTypes.Types_Three_Double,
                        PlayCardTypes.Types_Three,
                        PlayCardTypes.Types_Signal,
                        //Types.Types_Four_Signal,
                        //Types.Types_Four_Double,
                        PlayCardTypes.Types_Bomb,
                        PlayCardTypes.Types_Double
                    ];
                }
            }
            else            //队友在下桌,k以下的牌单双相同
            {
                if (teamcount == 1) {
                    frontTypeList = [
                        PlayCardTypes.Types_Signal,
                        PlayCardTypes.Types_ThreeN_Signal,
                        PlayCardTypes.Types_ThreeN_Double,
                        PlayCardTypes.Types_ThreeN,
                        PlayCardTypes.Types_DoubleN,
                        PlayCardTypes.Types_List,
                        PlayCardTypes.Types_Three_Signal,
                        PlayCardTypes.Types_Three_Double,
                        PlayCardTypes.Types_Three,
                        PlayCardTypes.Types_Double,
                        //Types.Types_Four_Signal,
                        //Types.Types_Four_Double,
                        PlayCardTypes.Types_Bomb
                    ];
                }
                else if (enemycount == 2) {
                    frontTypeList = [
                        PlayCardTypes.Types_Double,
                        PlayCardTypes.Types_ThreeN_Signal,
                        PlayCardTypes.Types_ThreeN_Double,
                        PlayCardTypes.Types_ThreeN,
                        PlayCardTypes.Types_DoubleN,
                        PlayCardTypes.Types_List,
                        PlayCardTypes.Types_Three_Signal,
                        PlayCardTypes.Types_Three_Double,
                        PlayCardTypes.Types_Three,
                        PlayCardTypes.Types_Signal,
                        //Types.Types_Four_Signal,
                        //Types.Types_Four_Double,
                        PlayCardTypes.Types_Bomb
                    ];
                }
            }

            var i:number = 0;
            var len:number = frontTypeList.length;
            var type:number = 0;
            var tolist:CardListData = null;
            for (i = 0; i < len; i++) {
                type = frontTypeList[i];
                var cd:CardListData = this.getMinListByType(mylist, type);
                if (cd != null) {
                    return cd;
                }
            }

            return null;
        }

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
        private getMinListByType(mylist:CardListData, type:number, tolist?:CardListData):CardListData {
            switch (type) {
                case PlayCardTypes.Types_Signal:
                        var slist:CardListData=null;
                        if(tolist==null)
                        {
                            slist=this.getSigleMaxEM(mylist);
                        }
                        if(slist)
                        {
                            return slist;
                        }
                        else
                        {
                            return this.getSigle(mylist, tolist);
                        }
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
         * 获取连对牌
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
            var tolen:number = 0;//连对长度
            var tomax:number = 10;//连对最大长度
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
                        if (count < 2 || count > 3)        //小于1或者大于3个不算数
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
                        if (count < 2 || count > 3)        //小于2或者大于3个不算数
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
                        if (count < 1 || count > 3)        //小于1或者大于3个不算数
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
                        if (count < 1 || count > 3)        //小于1或者大于3个不算数
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

            var sign1:number;
            var sign2:number;
            if (mylist.SingleArr.length > 1) {
                sign1 = mylist.SingleArr[0];
                sign2 = mylist.SingleArr[1];
            }
            else {

                //没有单牌和对子就不提示了.
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            var signArr1:Array<number> = mylist.getValueByNum(sign1, 2);
            var signArr2:Array<number> = mylist.getValueByNum(sign2, 2);
            var value2:Array<number> = [];
            var getArr:Array<number>;
            for (i = 0; i < tolen; i++) {
                getArr = mylist.getValueByNum(maxnum - i, 3);
                value2 = value2.concat(getArr);
            }
            value2 = value2.concat(signArr1);
            value2 = value2.concat(signArr2);
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

            var sign1:number;
            var sign2:number;
            if (mylist.DoubleArr.length > 1) {
                sign1 = mylist.DoubleArr[0];
                sign2 = mylist.DoubleArr[1];
            }
            else {
                //没有单牌和对子就不提示了.
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            var signArr1:Array<number> = mylist.getValueByNum(sign1, 2);
            var signArr2:Array<number> = mylist.getValueByNum(sign2, 2);
            var value2:Array<number> = [];
            var getArr:Array<number>;
            for (i = 0; i < tolen; i++) {
                getArr = mylist.getValueByNum(maxnum - i, 3);
                value2 = value2.concat(getArr);
            }
            value2 = value2.concat(signArr1);
            value2 = value2.concat(signArr2);
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
            var fromlist:Array<number> = mylist.TripleArr;
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

            var sign:number;
            if (mylist.DoubleArr.length > 0) {
                sign = mylist.DoubleArr[0];
            }
            else {
                //没有单牌和对子就不提示了.
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            var signArr:Array<number> = mylist.getValueByNum(sign, 2);
            var value2:Array<number> = mylist.getValueByNum(value, 3);
            var value3:Array<number> = value2.concat(signArr);
            var cld:CardListData = this._types.GetType(value3)
            return cld;
        }

        /**
         *
         * @param tolist 要比tolist的牌大
         * @returns {any}
         */
        private getThree_Signal(mylist:CardListData, tolist?:CardListData):CardListData {
            var fromlist:Array<number> = mylist.TripleArr;
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

            var sign:number;

            if (mylist.SingleArr.length > 0) {
                sign = mylist.SingleArr[0];
            }
            else if (mylist.DoubleArr.length > 0) {
                sign = mylist.DoubleArr[0];
            }
            else {
                if (tolist != null) {
                    return this.getBomb(mylist);
                } else {
                    return null
                }
            }
            var signArr:Array<number> = mylist.getValueByNum(sign, 1);
            var value2:Array<number> = mylist.getValueByNum(value, 3);
            var value3:Array<number> = value2.concat(signArr);
            var cld:CardListData = this._types.GetType(value3)
            return cld;
        }

        /**
         *
         * @param tolist 要比tolist的牌大
         * @returns {any}
         */
        private getThree(mylist:CardListData, tolist?:CardListData):CardListData {
            var fromlist:Array<number> = mylist.TripleArr;
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
            var fromlist:Array<number> = mylist.DoubleArr;
            if (ismust)//强制出单牌,从3牌中选
            {
                fromlist = mylist.TripleArr;
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
            var fromlist:Array<number> = mylist.SingleArr;
            if (ismust)//强制出单牌,从所有牌中选
            {
                fromlist = mylist.AllArr;
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
            if((value==98&&mylist.getCountOfNum(99)>0)||(value==99&&mylist.getCountOfNum(98)>0)) //不拆王炸
            {
                return this.getBomb(mylist, null);
            }
            var value2:Array<number> = mylist.getValueByNum(value, 1);
            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }

        //从大到小出单牌,有王除外.
        private getSigleMaxEM(mylist:CardListData):CardListData {
            if(mylist.DoubleArr.length>0||mylist.TripleArr.length>0||mylist.QuadrupleArr.length>0||mylist.HasBomb())
            {
                return null;
            }
            var fromlist:Array<number> = mylist.SingleArr;
            var len:number = fromlist.length;
            if (len < 1) {
                return null
            }

            var minvalue:number = 0;
            var i:number = 0;
            var value:number = 0;
            for (i = 0; i < len; i++) {
                value = fromlist[i];
                if (value > minvalue) {
                    minvalue=value;
                }
            }
            if (value == 0)//没有合适牌
            {
                return null;
            }
            if(value>14) //不拆王炸
            {
                return null;
            }
            var value2:Array<number> = mylist.getValueByNum(value, 1);
            var cld:CardListData = this._types.GetType(value2)
            return cld;
        }
    }
}