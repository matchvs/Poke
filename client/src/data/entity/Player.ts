module data {
    export class Player {
        public userid:string = "";
        public nickname:string = "";
        public avatar:string = "";
        public integral:number = 0;     //积分
        public money:number = 0;
        public playerGuid:number=1;                     //游戏服guid

        public ResoultScore:number=0;           //战斗结果;

        public TableId:number = 0;                   //桌子上的id;   0,1,2
        public LocalTableId:number=0;                 //与MainPlayer的相对tableid ,用于界面显示..左上1,右上2,下方自己3
        public IsReady:boolean=false;
        public IsAuto:boolean=false;

        public ShowCardNum:number=0;                //用于显示的卡牌数量.
        public CardArr:Array<number> = [];//手牌数组
        public LandOwnerScore:number = 0;   //叫地主的分数
        public IsLandOwner:boolean = false;       //是否地主
        public IsRobot:boolean=false;

        public constructor(obj:any=null)
        {
            for(var i in obj)
            {
                if(this[i]!=undefined)
                {
                    this[i]=obj[i];
                }
            }
        }

        public Reset(obj:any=null):void
        {
            for(var i in obj)
            {
                if(this[i]!=undefined)
                {
                    this[i]=obj[i];
                }
            }
        }

        public get CardNum():number {
            return this.CardArr.length;
        }

        public removeCards(arr:Array<number>):void {
            if(arr==null)
            {
                return;
            }
            var i:number = 0;
            var j:number = 0;
            var len:number = arr.length;
            for (i = 0; i < len; i++) {
                for (j = this.CardArr.length - 1; j >= 0; j--) {
                    if (this.CardArr[j] == arr[i]) {
                        this.CardArr.splice(j, 1);
                        break;
                    }
                }
            }
        }

        public AddCards(arr:Array<number>):void {
            if(arr==null)
            {
                return;
            }
            for(var i in arr)
            {
                this.CardArr.push(arr[i]);
            }
        }

    }
}