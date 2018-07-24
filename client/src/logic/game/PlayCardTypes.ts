module gameLogic {

    export class PlayCardTypes {
        public static Types_Error:number = 0;           //类型出错
        public static Types_Signal:number = 1;          //单张
        public static Types_Double:number = 2;          //一对
        public static Types_Three:number = 3;           //三个不带
        public static Types_Three_Signal:number = 4;    //三代1
        public static Types_Three_Double:number = 5;    //三带一对
        public static Types_Four_Signal:number = 6;     //四张带2张单牌
        public static Types_Four_Double:number = 7;     //四张带2对
        public static Types_ThreeN:number = 8;          //飞机不带
        public static Types_ThreeN_Signal:number = 9;   //飞机带单牌
        public static Types_ThreeN_Double:number = 10;  //飞机带双牌
        public static Types_List:number = 11;           //顺子
        public static Types_DoubleN:number = 12;        //连对
        public static Types_Bomb:number = 13;           //炸弹

        private _cardsAll:Array<number> = [];
        private _singleArr:Array<number> = [];
        private _doubleArr:Array<number> = [];
        private _tripleArr:Array<number> = [];
        private _quadrupleArr:Array<number> = [];

        public constructor() {

        }

        public GetType(list:Array<number>):CardListData {
            if(list==null||list.length<1)
            {
                return new CardListData();
            }
            this._cardsAll = [];
            this._singleArr = [];
            this._doubleArr = [];
            this._tripleArr = [];
            this._quadrupleArr = [];

            var i:number = 0;
            var len:number = list.length;
            var cardlistdata:CardListData = new CardListData();
            for (i = 0; i < len; i++) {
                this._cardsAll.push(list[i] % 100);
            }
            //随机排序一下
            this._cardsAll.sort(function sortNumber(a, b) {
                return a - b
            });
            this.divid();

            var alllen:number = this._cardsAll.length;
            var siglelen:number = this._singleArr.length;
            var doublelen:number = this._doubleArr.length;
            var triplelen:number = this._tripleArr.length;
            var quadruplen:number = this._quadrupleArr.length;

            cardlistdata.List = list;
            cardlistdata.AllArr = this._cardsAll;
            cardlistdata.SingleArr = this._singleArr;
            cardlistdata.DoubleArr = this._doubleArr;
            cardlistdata.TripleArr = this._tripleArr;
            cardlistdata.QuadrupleArr = this._quadrupleArr;
            cardlistdata.OneArr = this._singleArr.concat(this._doubleArr).concat(this._tripleArr).concat(this._quadrupleArr);
            ArrayTools.Sort(cardlistdata.OneArr);

            var isfly:boolean = true;         //飞机
            var islist:boolean = true;        //顺子
            var isdoublist:boolean = true;    //连对
            var last:number = -1;
            var num = 0;
            if (alllen == 1) {
                console.info("Types-GetType> 一张")
                cardlistdata.Type = PlayCardTypes.Types_Signal;
                return cardlistdata;
            }
            if (alllen == 2 && doublelen == 1) {
                console.info("Types-GetType> 一对")
                cardlistdata.Type = PlayCardTypes.Types_Double;
                return cardlistdata;
            }
            if (alllen == 3 && triplelen == 1) {
                console.info("Types-GetType> 三张")
                cardlistdata.Type = PlayCardTypes.Types_Three;
                return cardlistdata;
            }
            if (alllen == 4 && triplelen == 1) {
                console.info("Types-GetType> 三带一")
                cardlistdata.Type = PlayCardTypes.Types_Three_Signal;
                return cardlistdata;
            }
            if (alllen == 5 && triplelen == 1 && doublelen == 1) {
                console.info("Types-GetType> 三代一对")
                cardlistdata.Type = PlayCardTypes.Types_Three_Double;
                return cardlistdata;
            }
            if (alllen == 6 && quadruplen == 1 && siglelen == 2) {
                console.info("Types-GetType> 四带二")
                cardlistdata.Type = PlayCardTypes.Types_Four_Signal;             //4带二,大小王先不算,欢乐斗地主不能带牌
                return cardlistdata;
            }
            if (alllen == 6 && quadruplen == 1 && doublelen == 1) {
                console.info("Types-GetType> 四带二")
                cardlistdata.Type = PlayCardTypes.Types_Four_Signal;             //4带二,大小王先不算,欢乐斗地主不能带牌
                return cardlistdata;
            }
            if (alllen == 8 && quadruplen == 1 && doublelen == 2) {
                console.info("Types-GetType> 四带两对")
                cardlistdata.Type = PlayCardTypes.Types_Four_Double;             //4带二对,大小王先不算,欢乐斗地主不能带牌
                return cardlistdata;
            }
            if (triplelen > 1 && quadruplen == 0)         //飞机
            {
                isfly = true;
                last = -1;
                for (i = 0; i < triplelen; i++) {
                    num = this._tripleArr[i];
                    if (last == -1) {
                        last = num;
                    }
                    else if (num == (last + 1)) {
                        last = num;
                    }
                    else {
                        isfly = false;
                    }
                }
                //是飞机状况
                if (isfly) {
                    //飞机不带牌
                    if (siglelen == 0 && doublelen == 0 && quadruplen == 0) {
                        console.info("Types-GetType> 飞机")
                        cardlistdata.Type = PlayCardTypes.Types_ThreeN;
                        return cardlistdata;
                    }
                    //飞机带双牌
                    if (triplelen == doublelen && siglelen == 0 && quadruplen == 0) {
                        console.info("Types-GetType> 飞机带对子")
                        cardlistdata.Type = PlayCardTypes.Types_ThreeN_Double;
                        return cardlistdata;
                    }
                    //飞机带单牌
                    if (triplelen == siglelen && doublelen == 0 && quadruplen == 0||
                        triplelen == (siglelen+doublelen*2)  && quadruplen == 0
                    ) {
                        console.info("Types-GetType> 飞机带单牌")
                        cardlistdata.Type = PlayCardTypes.Types_ThreeN_Signal;
                        return cardlistdata;
                    }
                }

            }
            if (doublelen == 0 && triplelen == 0 && quadruplen == 0 && siglelen > 4) {
                islist = true;
                last = -1;
                for (i = 0; i < siglelen; i++) {
                    num = this._singleArr[i];
                    if (last == -1) {
                        last = num;
                    }
                    else if (num == (last + 1)) {
                        last = num;
                    }
                    else {
                        islist = false;
                    }
                }
                if (islist) {
                    console.info("Types-GetType> 顺子")
                    cardlistdata.Type = PlayCardTypes.Types_List;
                    return cardlistdata;
                }
            }

            if (doublelen > 2 && triplelen == 0 && quadruplen == 0 && siglelen == 0) {
                isdoublist = true;
                last = -1;
                for (i = 0; i < doublelen; i++) {
                    num = this._doubleArr[i];
                    if (last == -1) {
                        last = num;
                    }
                    else if (num == (last + 1)) {
                        last = num;
                    }
                    else {
                        isdoublist = false;
                    }
                }
                if (isdoublist) {
                    console.info("Types-GetType> 连对")
                    cardlistdata.Type = PlayCardTypes.Types_DoubleN;
                    return cardlistdata;
                }
            }

            if (alllen == 4 && quadruplen == 1) {
                console.info("Types-GetType> 炸弹")
                cardlistdata.Type = PlayCardTypes.Types_Bomb;             //普通炸弹
                return cardlistdata;
            }
            if (alllen == 2 && siglelen == 2) {
                if (this._singleArr[0] > 50 && this._singleArr[1] > 50) {
                    console.info("Types-GetType> 王炸")
                    cardlistdata.Type = PlayCardTypes.Types_Bomb;             //王炸
                    return cardlistdata;
                }
            }
            cardlistdata.Type = PlayCardTypes.Types_Error;
            return cardlistdata;
        }


        //把取余后的列表划分到各个数组中
        private divid():void {
            var i:number = 0;
            var len:number = this._cardsAll.length;
            for (i = 0; i < this._cardsAll.length; i++) {
                var id:number = this._cardsAll[i];
                var rePeat:number = this.NumberOf(id);
                switch (rePeat) {
                    case 1:
                        this._singleArr.push(id);
                        break;
                    case 2:
                        this._doubleArr.push(id);
                        i += 1;
                        break;
                    case 3:
                        this._tripleArr.push(id);
                        i += 2;
                        break;
                    case 4:
                        this._quadrupleArr.push(id);
                        i += 3;
                        break;
                    default:
                        break;
                }
            }
        }

        //计算数量
        private NumberOf(value:number):number {
            var tid:number = value;
            var totalRepeat:number = 0;
            var i:number = 0;
            var len:number = this._cardsAll.length;
            for (i = 0; i < len; i++) {
                var id:number = this._cardsAll[i];
                if (id % 100 == tid) {
                    totalRepeat += 1;
                }
            }
            return totalRepeat;
        }
    }
}