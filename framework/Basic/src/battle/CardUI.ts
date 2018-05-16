module battle {
	/**
	 * 卡牌
	 */
	export class CardUI extends egret.Sprite  {
        public static CARDWIDTH:number = 135;
        public static CARDHEIGHT:number = 179;
        private _value:number = 0;
        private _isselect:boolean = false;
        private _isjump:boolean = false;
        private _bg:egret.Bitmap = null;
        private _mask:egret.Bitmap = null;
        private _backbg:egret.Bitmap=null;
        private _typeimg1:egret.Bitmap=null;
        private _typeimg2:egret.Bitmap=null;
        private _numimg:egret.Bitmap=null;
        private _landimg:egret.Bitmap=null;

        public constructor(value:number) {
            super();
            this._value = value;
            if(value==0)
            {
                this.initBack();
            }
            else
            {
                this.init();
            }
        }
        public addLand():void
        {
            if(this._landimg==null)
            {
                this._landimg = new egret.Bitmap(RES.getRes("ui_flag_card"));
            }
            this.addChild(this._landimg);
        }

        private initBack():void
        {
            this.touchEnabled = false;
            this.touchChildren = false;
            if(this._backbg==null)
            {
                this._backbg = new egret.Bitmap(RES.getRes("ui_cardback"));
            }
            this.addChild(this._backbg);
        }

        public get Value():number {
            return this._value;
        }

        private init() {
            this.touchEnabled = true;
            this.touchChildren = false;
            if(this._bg==null)
            {
                this._bg = new egret.Bitmap(RES.getRes("ui_card"));
            }
            if(this._mask==null) {
                this._mask = new egret.Bitmap(RES.getRes("ui_cardselect"));
            }
            this.addChild(this._bg);

            var type = Math.floor(this._value / 100);
            if (type < 5) {
                if(this._typeimg1==null)
                {
                    this._typeimg1 = new egret.Bitmap(RES.getRes("ui_cardtype_" + type));
                }
                this.addChild(this._typeimg1);
                this._typeimg1.scaleX = this._typeimg1.scaleY = 1;
                this._typeimg1.x = 50;
                this._typeimg1.y = 75;

                if(this._typeimg2==null)
                {
                    this._typeimg2 = new egret.Bitmap(RES.getRes("ui_cardtype_" + type));
                }
                this.addChild(this._typeimg2);
                this._typeimg2.scaleX = this._typeimg2.scaleY = 0.5;
                this._typeimg2.x = 11;
                this._typeimg2.y = 55;
            }
            else if (type == 9) {
                if (this._value == 999) {
                    if(this._typeimg1==null)
                    {
                        this._typeimg1 = new egret.Bitmap(RES.getRes("ui_cardnum9_99_dec"));
                    }
                    this.addChild(this._typeimg1);
                    this._typeimg1.x = 25;
                    this._typeimg1.y = 45;
                }
                else if (this._value == 998) {
                    if(this._typeimg1==null)
                    {
                        this._typeimg1 = new egret.Bitmap(RES.getRes("ui_cardnum9_98_dec"));
                    }
                    this.addChild(this._typeimg1);
                    this._typeimg1.x = 25;
                    this._typeimg1.y = 45;

                }
            }

            var color:number = 1;
            if (type == 2 || type == 4) {
                color = 2;
            }
            else if (type == 9) {
                color = 9;
            }
            var num = Math.floor(this._value % 100);
            if(this._numimg==null)
            {
                this._numimg = new egret.Bitmap(RES.getRes("ui_cardnum" + color + "_" + num));
            }
            this.addChild(this._numimg);
            this._numimg.x = 16;
            this._numimg.y = 9;
            this.addChild(this._mask);
            this._mask.visible = false;
        }

        public get Select():boolean {
            return this._isselect;
        }

        public set Select(isselect:boolean) {
            if (this._isselect == isselect) {
                this._mask.visible = this._isselect;
                if(this._isjump)
                {
                    this._mask.visible=true;
                }
                return;
            }
            this._isselect = isselect;
            this._mask.visible = this._isselect;
            if(this._isjump)
            {
                this._mask.visible=true;
            }

        }

        public get Jump():boolean {
            return this._isjump;
        }

        public set Jump(isjump:boolean) {

            if (this._isjump == isjump) {
                this._mask.visible = this._isjump;
                return;
            }
            this._isjump = isjump;
            if (this._isjump) {
                this.y -= 20;
            }
            else {
                this.y += 20;
            }
            this._mask.visible = this._isjump;
            if(this._isjump)
            {
                this._isselect=false;
            }
        }

        public Release():void {
            if(this._landimg&&this._landimg.parent)
            {
                this._landimg.parent.removeChild(this._landimg)
            }
            this._isselect = false;
            this._isjump = false;
            this._mask.visible = false;
            this.scaleX=this.scaleY=1;
            this.alpha=1;

            if (this.parent) {
                this.parent.removeChild(this);
            }
           // MandPool.remand(this);
        }

    }
}