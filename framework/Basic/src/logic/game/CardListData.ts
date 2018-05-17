module gameLogic {
    export class CardListData {
        public FromId:number = -1;                //标记发牌玩家

        public Type:number = PlayCardTypes.Types_Error;
        public List:Array<number> = [];         //原始数据数组,没有与100取余过


        public AllArr:Array<number> = [];         //数据数组,与100取余过
        public OneArr:Array<number> = [];         //所有的数字,只有一个,不会出现重复   与100取余过
        public SingleArr:Array<number> = [];      //数据数组,与100取余过
        public DoubleArr:Array<number> = [];      //数据数组,与100取余过
        public TripleArr:Array<number> = [];      //数据数组,与100取余过
        public QuadrupleArr:Array<number> = [];   //数据数组,与100取余过

        public constructor() {

        }

        public PlaySound():void {
            var st:string = "";
            var num;
            var st2:string = "_mp3";
            switch (this.Type) {
                case PlayCardTypes.Types_Error:
                    return;
                case PlayCardTypes.Types_Signal:
                    st = "woman_";
                    num = this.SingleArr[0];
                    break;
                case PlayCardTypes.Types_Double:
                    st = "woman_dui";
                    num = this.DoubleArr[0];
                    break;
                case PlayCardTypes.Types_Three:
                    st = "woman_sange";
                    break;
                case PlayCardTypes.Types_Three_Signal:
                    st = "woman_sandaiyi";
                    break;
                case PlayCardTypes.Types_Three_Double:
                    st = "woman_sandaiyidui";
                    break;
                case PlayCardTypes.Types_Four_Signal:
                    st = "woman_sidaier";
                    break;
                case PlayCardTypes.Types_Four_Double:
                    st = "woman_sidailiangdui";
                    break;
                case PlayCardTypes.Types_ThreeN:
                    st = "woman_feiji";
                    break;
                case PlayCardTypes.Types_ThreeN_Signal:
                    st = "woman_feiji";
                    break;
                case PlayCardTypes.Types_ThreeN_Double:
                    st = "woman_feiji";
                    break;
                case PlayCardTypes.Types_List:
                    st = "woman_shunzi";
                    break;
                case PlayCardTypes.Types_DoubleN:
                    st = "woman_liandui";
                    break;
                case PlayCardTypes.Types_Bomb:
                    st = "woman_zhadan";
                    if(this.List.length<3)
                    {
                        st = "woman_wangzha";
                    }
                    //SoundMgr.Instance.PlayEffect("bomb_mp3",true);
                    break;
                default:
                    break;
            }

            var url:string;
            if (num == null) {
                url = st + st2;
            }
            else {
                url = st + num + st2;
            }
            //SoundMgr.Instance.PlayEffect(url);

        }

        //获取大于等于某值的牌的数量
        public HasBigTo(num:number):boolean {
            var len:number = this.List.length;
            var i:number = 0;
            var value:number
            var barr:Array<number> = [];
            for (i = 0; i < len; i++) {
                value = this.List[i];
                if (value % 100 >= num) {
                    return true;
                }
            }
            return false;
        }
        public HasBomb():boolean{
            if(this.getCountOfNum(98)>0&&this.getCountOfNum(99)>0)
            {
                return true;
            }
            if(this.QuadrupleArr.length>0)
            {
                return true;
            }
            return false;

        }

        public getSingleValueExceptNum(numlist:Array<number>):Array<number>{
            var len1:number = this.AllArr.length;
            var len2:number= numlist.length;
            var value:number;
            var barr:Array<number> = [];
            var i:number=0;
            var j:number=0;
            var has:boolean=false;
            for (i = 0; i < len1; i++)
            {
                value = this.OneArr[i];
                has=false;
                for(j=0;j<len2;j++)
                {
                    if (value % 100 == (numlist[j])%100) {
                        has=true;
                    }
                }
                if(has==false)
                {
                    barr.push(value);
                }

            }
            return barr
        }

        public getDoubleValueExceptNum(numlist:Array<number>):Array<number> {
            var list:Array<number>=this.DoubleArr.concat(this.TripleArr);
            var len1:number = list.length;
            var len2:number= numlist.length;
            var value:number;
            var barr:Array<number> = [];
            var i:number=0;
            var j:number=0;
            var has:boolean=false;
            for (i = 0; i < len1; i++)
            {
                value = list[i];
                has=false;
                for(j=0;j<len2;j++)
                {
                    if (value % 100 == (numlist[j])%100) {
                        has=true;
                    }
                }
                if(has==false)
                {
                    barr.push(value);
                }

            }
            return barr
        }
        //根据卡牌数字得到100以上真实值
        public getValueByNum(num:number, count:number,type:boolean=false):Array<number> {
            var len:number = this.List.length;
            var i:number = 0;
            var value:number
            var barr:Array<number> = [];
            for (i = 0; i < len; i++) {
                value = this.List[i];
                if(type==false)
                {
                    if (value % 100 == num%100) {
                        barr.push(value);
                        count--;
                        if (count <= 0) {
                            break;
                        }
                    }
                }
                else
                {
                    if(value==num)
                    {
                        barr.push(value);
                        break;
                    }
                }
            }
            return barr;
        }

        public ContainList(hlist:CardListData):boolean
        {
            if(hlist==null||hlist.List==null||hlist.List.length<1)
            {
                return false;
            }
            var barr:Array<number> = hlist.List;
            var len1:number = this.List.length;
            var len2:number=barr.length;
            var i:number = 0;
            var j:number=0;
            var has:boolean=false;
            for(j=0;j<len2;j++)
            {
                has=false;
                for (i = 0; i < len1; i++) {
                    if(barr[j]==this.List[i])
                    {
                        has=true;
                    }
                }
                if(has==false)
                {
                    return false;
                }
            }
            return true;
        }

        /**
         * 根据卡牌数字得到数量,几个3,几个2之类的
         * @param num
         */
        public getCountOfNum(num:number):number {
            num=num%100;
            var len:number = this.AllArr.length;
            var i:number = 0;
            var count:number = 0;
            for (i = 0; i < len; i++) {
                if (this.AllArr[i] == num) {
                    count++;
                }
            }
            return count;
        }

    }
}