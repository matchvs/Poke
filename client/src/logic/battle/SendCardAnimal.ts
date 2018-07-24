/**
 * 发牌动画
 */
module battle {
    export class SendCardAnimal {
        private _sendLayer: egret.Sprite = null;           //发牌的那一堆
        private _cardLayer: egret.Sprite = null;
        private _player: Player = null;
        private _cardVlist: Array<CardUI> = null;
        private _gameScene: egret.DisplayObjectContainer = null;
        private _overfun: Function = null;
        private _overThis: any = null;
        private _timer1: egret.Timer = null;
        private _mCard1: CardUI = null;
        private _mCard2: CardUI = null;
        private _mCard3: CardUI = null;
        public constructor() {

        }

        public Init(gs: egret.DisplayObjectContainer): void {
            this._gameScene = gs;
        }

        public StartAnimal(player: Player, overfun: Function, thisObj: any) {
            this._overfun = overfun;
            this._overThis = thisObj;
            this._player = player;
            this._cardVlist = [];
            this._sendLayer = new egret.Sprite();
            this._cardLayer = new egret.Sprite();
            this._gameScene.addChild(this._cardLayer);
            this._cardLayer.x = 0;
            this._cardLayer.y = Config.StageHeight - MyCardControl.DOWNGAP - CardUI.CARDHEIGHT * 2 - MyCardControl.VERCARGAP;
            console.info("this._cardLayer.y ",this._cardLayer.y );
            this.sendCardAni();
        }

        //发牌
        private sendCardAni(): void {
            //中间发牌
            this._cardLayer.addChild(this._sendLayer);
            var i: number = 0;
            for (i = 0; i < 3; i++) {
                var card: CardUI = MandPool.getInsByParm(CardUI, 0);
                this._sendLayer.addChild(card);
                card.x = 220 + i * 10;
                card.y = -300;
            }
            this._mCard1 = MandPool.getInsByParm(CardUI, 0);
            this._cardLayer.addChild(this._mCard1);
            this._mCard1.x = 250;
            this._mCard1.y = -300;
            this._mCard2 = MandPool.getInsByParm(CardUI, 0);
            this._cardLayer.addChild(this._mCard2);
            this._mCard2.x = 250;
            this._mCard2.y = -300;
            this._mCard3 = MandPool.getInsByParm(CardUI, 0);
            this._cardLayer.addChild(this._mCard3);
            this._mCard3.x = 250;
            this._mCard3.y = -300;

            egret.Tween.get(this._mCard1, { loop: true }).wait(0).to({ x: 0 }, 300).to({ x: 250 }, 0).wait(400);
            egret.Tween.get(this._mCard2, { loop: true }).wait(200).to({ x: 500 }, 300).to({ x: 250 }, 0).wait(200);
            egret.Tween.get(this._mCard3, { loop: true }).wait(400).to({ y: 0 }, 300).to({ y: 370 }, 0).wait(0);

            this._timer1 = new egret.Timer(220, 17);
            this._timer1.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer1.start();
        }

        private onTimer(e: egret.TimerEvent): void {
            var ccount: number = this._timer1.currentCount;
            if (ccount == this._timer1.repeatCount) {
                egret.Tween.removeTweens(this._mCard1);
                egret.Tween.removeTweens(this._mCard2);
                egret.Tween.removeTweens(this._mCard3);

                // http://developer.egret.com/cn/apidoc/index/name/egret.TimerEvent#TIMER
                this.setCard(this._player.cardList);
                this._timer1.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._timer1.stop();
                this._timer1 = null;

                this.showOwnerAni();
            }
            else {
                var arr: Array<number> = this._player.cardList.slice(0, ccount);
                this.setCard(arr);
            }
        }

        private showOwnerAni(): void {
            
            this._sendLayer.removeChildren();
            if (this._sendLayer.parent) {
                this._sendLayer.parent.removeChild(this._sendLayer);
                this._sendLayer = null;
            }
            this._mCard1.x = 250;

            this._mCard1.y = -300;

            this._mCard2.x = 250;

            this._mCard2.y = -300;

            this._mCard3.x = 250;

            this._mCard3.y = -300;

            egret.Tween.get(this._mCard1).to({ x: 50 }, 300);
            egret.Tween.get(this._mCard2).to({ x: 450 }, 300);

            this._overfun.call(this._overThis);
        }

        private setCard(cardlist: Array<number>) {
            var rlen: number = this._cardVlist.length;
            var ri: number = 0;
            for (ri = 0; ri < rlen; ri++) {
                var card: CardUI = this._cardVlist[ri];
                card.Release();
            }
            this._cardVlist = [];
            var clist: Array<number> = cardlist;
            clist.sort(function (a: number, b: number) {
                if (a % 100 == b % 100) {
                    if (a > b) {
                        return 1
                    }
                    else {
                        return -1
                    }
                }
                else if (a % 100 > b % 100) {
                    return -1
                }
                return 1;
            }
            );


            var list = this.dividArr(cardlist);
            var list1 = list[0];
            var list2 = list[1];
            var len1: number = list1.length;
            var len2: number = list2.length;
            var dis: number = Config.StageWidth - MyCardControl.LEFTGAP - MyCardControl.RIGHTGAP - CardUI.CARDWIDTH;
            var cy1: number = 0;//Config.StageHeight-MyCardControl.DOWNGAP-CardUI.CARDHEIGHT;
            var cy2: number = cy1 + MyCardControl.VERCARGAP + CardUI.CARDHEIGHT;
            var gap1: number = dis / (len1 - 1);
            var gap2: number = dis / (len2 - 1);
            var i: number = 0;

            if (gap1 > MyCardControl.HORCARGAP) {
                gap1 = MyCardControl.HORCARGAP;
            }
            if (gap2 > MyCardControl.HORCARGAP) {
                gap2 = MyCardControl.HORCARGAP;
            }

            var sx1: number = (Config.StageWidth - (gap1 * (len1 - 1) + CardUI.CARDWIDTH)) / 2;
            var sx2: number = (Config.StageWidth - (gap2 * (len2 - 1) + CardUI.CARDWIDTH)) / 2;
            for (i = 0; i < len1; i++) {
                var card: CardUI = MandPool.getInsByParm(CardUI, list1[i]);
                card.y = cy1;
                card.x = sx1 + i * gap1;
                this._cardLayer.addChild(card);
                this._cardVlist.push(card);
            }

            for (i = 0; i < len2; i++) {
                var card: CardUI = MandPool.getInsByParm(CardUI, list2[i]);
                card.y = cy2;
                card.x = sx2 + i * gap2;
                this._cardLayer.addChild(card);
                this._cardVlist.push(card);
            }
        }


        //划分为上下显示的两个数组
        private dividArr(cardlist: Array<number>): Array<any> {
            var arr1: Array<CardUI> = [];
            var arr2: Array<CardUI> = [];
            var len: number = this._player.cardNumber;
            var i: number = 0;
            var cardvalue: any;

            //先分配到两个数组
            for (i = 0; i < 10; i++) {
                cardvalue = cardlist[i];
                if (cardvalue) {
                    arr1.push(cardvalue);
                }
            }
            for (i = 10; i < 20; i++) {
                cardvalue = cardlist[i];
                if (cardvalue) {
                    arr2.push(cardvalue);
                }
            }

            //检查第二个数组的第一个数字第一个数组中是否存在(同样数字应该在一列)
            var samevalue: number;
            if ((arr2[0])) {
                (arr2[0]).Value % 100;
            }
            var len1: number = arr1.length;
            var len2: number = arr2.length;
            var long: number = 0;
            if (samevalue) {
                for (i = len1 - 1; i >= 0; i--) {
                    if (samevalue == (arr1[i]).Value % 100) {
                        long++;
                        if (long + len2 < 10) {
                            arr2.unshift(arr1.pop());
                        }
                    }
                    else {
                        break;
                    }
                }
            }
            return [arr1, arr2];
        }

        //地主牌飞到指定位置
        public Release(loctid: number): void {
            if (loctid == 0) {
                this._gameScene.removeChildren();
                return;
            }
            var tx: number = 20;//500;20;
            var ty: number = 100;//100;700;
            if (loctid == 1) {
                tx = 40;
                ty = -520;
            }
            else if (loctid == 2) {
                tx = 500;
                ty = -520;
            }
            else if (loctid == 3) {
                tx = 250;
                ty = 0;
            }

            if (this._mCard3) {
                egret.Tween.get(this._mCard3).to({ x: tx, y: ty }, 500).call(function () {
                    this._gameScene.removeChildren();
                }, this);
            }

            if (this._mCard2) {
                egret.Tween.get(this._mCard2).to({ x: tx, y: ty }, 500).call(function () {
                    this._gameScene.removeChildren();
                }, this);
            }

            if (this._mCard1) {
                egret.Tween.get(this._mCard1).to({ x: tx, y: ty }, 500).call(function () {
                    this._gameScene.removeChildren();
                }, this);
            }

        }

    }
}
