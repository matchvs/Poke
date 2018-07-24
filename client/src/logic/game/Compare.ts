module gameLogic {
    export class Compare {
        public constructor() {

        }

        public IsBiger(cld1:CardListData, cld2:CardListData):any {
            if (cld2 == null) {
                //console.info("Compare-IsBiger> 没有桌面牌");
                return true;
            }
            if (cld1.Type != cld2.Type && cld1.Type != PlayCardTypes.Types_Bomb) {
                //console.info("Compare-IsBiger> 类型出错");
                return false
            }


            switch (cld1.Type) {
                case PlayCardTypes.Types_Signal:
                    return this.compareSigle(cld1, cld2);
                case PlayCardTypes.Types_Double:
                    return this.compareDouble(cld1, cld2);
                case PlayCardTypes.Types_Three:
                case PlayCardTypes.Types_Three_Signal:
                case PlayCardTypes.Types_Three_Double:
                    return this.compareThree(cld1, cld2);
                case PlayCardTypes.Types_Four_Double:
                case PlayCardTypes.Types_Four_Signal:
                    return this.compareFour(cld1, cld2);
                case PlayCardTypes.Types_ThreeN:
                case PlayCardTypes.Types_ThreeN_Signal:
                case PlayCardTypes.Types_ThreeN_Double:
                    return this.compareThreeN(cld1, cld2);
                case PlayCardTypes.Types_List:
                    return this.compareList(cld1, cld2);
                case PlayCardTypes.Types_DoubleN:
                    return this.compareDoubleN(cld1, cld2);
                case PlayCardTypes.Types_Bomb:
                    return this.compareBomb(cld1, cld2);
                default:
                    break;
            }
        }

        //比较炸弹
        private compareBomb(cld1:CardListData, cld2:CardListData):boolean {
            if (cld2.Type != PlayCardTypes.Types_Bomb) {
                return true;
            }
            var num1:number;
            var num2:number;
            var len1:number = cld1.QuadrupleArr.length;
            var len2:number = cld2.QuadrupleArr.length;
            if (len1 == 0)//王炸
            {
                return true;
            }
            if (len2 == 0) {
                //console.info("Compare-IsBiger> 不能大过王炸");
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


        }

        //比较连对
        private compareDoubleN(cld1:CardListData, cld2:CardListData):boolean {
            var num1:number;
            var num2:number;
            var len1:number = cld1.DoubleArr.length;
            var len2:number = cld2.DoubleArr.length;
            if (len1 != len2) {
                //console.info("Compare-IsBiger> 连对数量不匹配");
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
        }

        //比较顺子
        private compareList(cld1:CardListData, cld2:CardListData):boolean {
            var num1:number;
            var num2:number;
            var len1:number = cld1.SingleArr.length;
            var len2:number = cld2.SingleArr.length;
            if (len1 != len2) {
                //console.info("Compare-IsBiger> 顺子数量不匹配");
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
        }

        //比较飞机
        private compareThreeN(cld1:CardListData, cld2:CardListData):boolean {
            var num1:number;
            var num2:number;
            var len1:number = cld1.TripleArr.length;
            var len2:number = cld2.TripleArr.length;
            if (len1 != len2) {
                //console.info("Compare-IsBiger> 飞机数量不匹配");
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
        }

        //四张比较
        private compareFour(cld1:CardListData, cld2:CardListData):boolean {
            var num1:number;
            var num2:number;
            num1 = cld1.QuadrupleArr[0];
            num2 = cld2.QuadrupleArr[0];
            if (num1 > num2) {
                return true;
            }
            else {
                return false;
            }
        }

        //三张比较
        private compareThree(cld1:CardListData, cld2:CardListData):boolean {
            var num1:number;
            var num2:number;
            num1 = cld1.TripleArr[0];
            num2 = cld2.TripleArr[0];
            if (num1 > num2) {
                return true;
            }
            else {
                return false;
            }
        }

        //对子比较
        private compareDouble(cld1:CardListData, cld2:CardListData):boolean {
            var num1:number;
            var num2:number;
            num1 = cld1.DoubleArr[0];
            num2 = cld2.DoubleArr[0];
            if (num1 > num2) {
                return true;
            }
            else {
                return false;
            }
        }

        //单张比较
        private compareSigle(cld1:CardListData, cld2:CardListData):boolean {
            var num1:number;
            var num2:number;
            num1 = cld1.SingleArr[0];
            num2 = cld2.SingleArr[0];
            if (num1 > num2) {
                return true;
            }
            else {
                return false;
            }
        }

    }
}