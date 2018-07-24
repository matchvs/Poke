module battle {

	/**
	 * 卡牌控制类，控制卡牌显示位置，和出牌动画
	 */

	export class TableCardControl {

		public static CardScale: number = 0.5;
        private _gameScene: egret.Sprite = null;
        private _landSprite: egret.Sprite = null;        //地主牌
        private _tableSprite_1: egret.Sprite = null;
        private _tableSprite_2: egret.Sprite = null;
        private _tableSprite_3: egret.Sprite = null;
        public constructor() {

        }

        public Init(gs: egret.Sprite): void {
            this._gameScene = gs;

            this._landSprite = new egret.Sprite();
            this._tableSprite_1 = new egret.Sprite();
            this._tableSprite_2 = new egret.Sprite();
            this._tableSprite_3 = new egret.Sprite();

            this._gameScene.addChild(this._landSprite);
            this._gameScene.addChild(this._tableSprite_1);
            this._gameScene.addChild(this._tableSprite_2);
            this._gameScene.addChild(this._tableSprite_3);

            this._landSprite.x = 230;
            this._landSprite.y = 80;

            this._tableSprite_1.x = 20;
            this._tableSprite_1.y = 300;

            this._tableSprite_2.x = 340;
            this._tableSprite_2.y = 300;

            this._tableSprite_3.x = 20;
            this._tableSprite_3.y = 500;
        }

        public clearAll(cland: boolean = false): void {
            this._tableSprite_1.removeChildren();
            this._tableSprite_2.removeChildren();
            this._tableSprite_3.removeChildren();
            if (cland) {
                this._landSprite.removeChildren();
            }
        }
		/**
		 * 显示地主牌到 游戏中上位置
		 */
        public ShowLandCard(clist: Array<number>) {
            this._landSprite.removeChildren();
            if (clist == null) {
                return;
            }
            var i: number = 0;
            var len: number = clist.length;
            for (i = 0; i < len; i++) {
                var card: CardUI = MandPool.getInsByParm(CardUI, clist[i]);
                this._landSprite.addChild(card);
                card.scaleX = card.scaleY = 0.4;
                card.x = (i % 7) * 64;
                card.y = 0;
            }
        }
        public ShowTableCard(localtabel: number, clist: Array<number>) {
            switch (localtabel) {
                case 1:
                    this.init_1(clist);
                    break;
                case 2:
                    this.init_2(clist);
                    break;
                case 3:
                    this.init_3(clist);
                    break;
                default:
                    break;
            }
        }

        // NOTE: 使用场景是什么 出牌动画
        private init_1(clist: Array<number>): void {
            this._tableSprite_1.removeChildren();
            if (clist == null) {
                return;
            }
            clist.reverse();
            clist.sort(function (a: number, b: number) {
                if (a % 100 > b % 100) {
                    return -1
                }
                return 1;
            }
            );
            var i: number = 0;
            var len: number = clist.length;
            for (i = 0; i < len; i++) {
                var card: CardUI = MandPool.getInsByParm(CardUI, clist[i]);
                this._tableSprite_1.addChild(card);
                card.scaleX = card.scaleY = TableCardControl.CardScale;
                card.x = (i % 7) * 35;
                card.y = Math.floor(i / 7) * 30;
            }

            this._tableSprite_1.x = 20;
            this._tableSprite_1.y = 100;
            this._tableSprite_1.alpha = 0;
            this._tableSprite_1.scaleX = this._tableSprite_1.scaleY = 1.5;
            this._tableSprite_1.alpha = 1;
            egret.Tween.get(this._tableSprite_1).to({ x: 20, y: 300, scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.circIn);
        }

        private init_2(clist: Array<number>): void {
            this._tableSprite_2.removeChildren();
            if (clist == null) {
                return;
            }
            clist.reverse();
            clist.sort(function (a: number, b: number) {
                if (a % 100 > b % 100) {
                    return -1
                }
                return 1;
            }
            );
            var i: number = 0;
            var len: number = clist.length;
            for (i = 0; i < len; i++) {
                var card: CardUI = MandPool.getInsByParm(CardUI, clist[i]);
                this._tableSprite_2.addChild(card);
                card.scaleX = card.scaleY = TableCardControl.CardScale;
                card.x = (i % 7) * 35;
                card.y = Math.floor(i / 7) * 30;
            }

            this._tableSprite_2.x = 500;
            this._tableSprite_2.y = 100;
            this._tableSprite_2.alpha = 0;
            this._tableSprite_2.scaleX = this._tableSprite_2.scaleY = 1.5;
            this._tableSprite_2.alpha = 1;
            egret.Tween.get(this._tableSprite_2).to({ x: 340, y: 300, scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.circIn);
        }

        private init_3(clist: Array<number>): void {
            this._tableSprite_3.removeChildren();
            if (clist == null) {
                return;
            }
            clist.reverse();
            clist.sort(function (a: number, b: number) {
                if (a % 100 > b % 100) {
                    return -1
                }
                return 1;
            }
            );
            var i: number = 0;
            var len: number = clist.length;
            var dis: number = 600;
            var gap1: number = 50;
            var cnum: number = 10;
            if (len < cnum) {
                cnum = len;
            }

            var sx1: number = (640 - (gap1 * cnum + CardUI.CARDWIDTH * TableCardControl.CardScale)) / 2;

            for (i = 0; i < len; i++) {
                var card: CardUI = MandPool.getInsByParm(CardUI, clist[i]);
                this._tableSprite_3.addChild(card);
                card.scaleX = card.scaleY = TableCardControl.CardScale;
                card.x = sx1 + i % 10 * gap1;
                card.y = Math.floor(i / 10) * 30;
            }

            this._tableSprite_3.x = 20;
            this._tableSprite_3.y = 700;
            this._tableSprite_3.alpha = 0;
            this._tableSprite_3.scaleX = this._tableSprite_3.scaleY = 1.5;
            this._tableSprite_3.alpha = 1;
            egret.Tween.get(this._tableSprite_3).to({ x: 20, y: 450, scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.circIn);
        }


	}
}