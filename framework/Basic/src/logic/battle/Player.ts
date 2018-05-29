module battle {

	export class Player extends GUser{
		public cardList:Array<number> = [];			//牌列表
		public isLandLord:boolean = false;			//是否是地主
		public seatNo = 0;							//座位号
		public LocalTableId = 0;					//上下家标识 1 上家， 2下家 3-为自己
		public IsReady = false;
		public landlordScore = 0;                   //叫地主分

		private _cardNumber:Number = 0;				//牌数量

		public constructor() {
			super();
		}

		public AddcardList(cards:Array<number>):void{
			if(cards==null)
            {
                return;
            }
            for(var i in cards)
            {
                this.cardList.push(cards[i]);
            }
		}

		/**
		 * 获取牌数量
		 */
		get cardNumber():number{
			return this.cardList.length;
		}


		/**
		 * 叫地主
		 */
		public callLandlord(value:number){
			
		}

		/**
		 * 移除牌
		 */
		public removeCards(arr:Array<number>):void {
            if(arr==null)
            {
                return;
            }
            var i:number = 0;
            var j:number = 0;
            var len:number = arr.length;
            for (i = 0; i < len; i++) {
                for (j = this.cardList.length - 1; j >= 0; j--) {
                    if (this.cardList[j] == arr[i]) {
                        this.cardList.splice(j, 1);
                        break;
                    }
                }
            }
        }

		/**
		 * 出牌
		 */
		public playCards(arr:Array<number>){
			if(arr==null)
            {
                return;
            }
            var i:number = 0;
            var j:number = 0;
            var len:number = arr.length;
            for (i = 0; i < len; i++) {
                for (j = this.cardList.length - 1; j >= 0; j--) {
                    if (this.cardList[j] == arr[i]) {
                        this.cardList.splice(j, 1);
                        break;
                    }
                }
            }
		}

        public clearPlayer(){
            this.cardList = [];
            this.landlordScore = 0;
            this.seatNo = 0;
            this.isLandLord = false;
            this.LocalTableId = 0;
            this._cardNumber =0;
        }
	}
}