module battle {

	

	export class Player extends GUser{
		private _cardList:Array<number> = [];		//牌列表
		public isLandLord:boolean = false;			//是否是地主
		public seatNo = 0;							//座位号
		public LocalTableId = 0;					//上下家标识 1 上家， 2下家 3 为自己
		public IsReady = false;

		
		private _cardNumber:Number = 0;				//牌数量

		public constructor() {
			super();
			
		}

		set cardList(cards:Array<number>){
			if(cards==null)
            {
                return;
            }
            for(var i in cards)
            {
                this._cardList.push(cards[i]);
            }
		}


		get cardList():Array<number>{
			return this.cardList;
		}


		/**
		 * 获取牌数量
		 */
		get cardNumber():number{
			return this._cardList.length;
		}


		/**
		 * 叫地主
		 */
		public callLandlord(value:number){
			
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
                for (j = this._cardList.length - 1; j >= 0; j--) {
                    if (this._cardList[j] == arr[i]) {
                        this._cardList.splice(j, 1);
                        break;
                    }
                }
            }
		}
	}
}