module scene {
    import TextField = egret.TextField;
    export class TestGameScene extends SceneBase {
        private _textType:egret.TextField = null;
        private _textValue:egret.TextField = null;
        private _backValue:egret.TextField = null;
        private _cardlist0:Array<Card> = [];
        private _cardlist1:Array<Card> = [];
        private _cardlist2:Array<Card> = [];

        public constructor() {
            super();
//            this.skinName = "skins.scene.LobbySceneSkin";
            this.initListData();
        }

        private initListData():void {
            var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("bg_lobby_jpg"));
            this.addChild(bg);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);

            TestGameMgr.Instance.Start(this);
            this.setCard(0);
            this.setCard(1);
            this.setCard(2);
            this.setDizhuCard3();
            SoundMgr.Instance.PlaySound("bg_lobby_mp3");
        }

        //提示出牌
        public PrompCard(id:number, cld:CardListData):void {
            if (cld == null) {
                return;
            }
            var arr = this["_cardlist" + id];
            var i:number = 0;
            var j:number = 0;
            var len:number = cld.List.length;
            var len2:number = arr.length;
            var card:Card;
            var value:number

            for (j = 0; j < len2; j++) {
                card = arr[j];
                card.Select = false;
                for (i = 0; i < cld.List.length; i++) {
                    value = cld.List[i];
                    if (card.Value == value) {
                        card.Select = true;
                    }
                }
            }
        }

        private setCard(id:number, isre:boolean = false) {
            if (isre) {
                var rlen:number = this["_cardlist" + id].length;
                var ri:number = 0;
                for (ri = 0; ri < rlen; ri++) {
                    var card:Card = this["_cardlist" + id][ri];
                    card.Release();
                }
                this["_cardlist" + id] = [];
            }
            var p1:data.Player = TestGameMgr.Instance.GetPlayerById(id);
            var clist:Array<number> = p1.CardArr;
            clist.sort(function (a:number, b:number) {
                    if (a % 100 > b % 100) {
                        return -1
                    }
                    return 1;
                }
            );
            var clen:number = p1.CardNum;
            var i:number = 0;
            for (i = 0; i < clen; i++) {
                var card:Card = MandPool.getInsByParm(Card,clist[i]);
                card.y = i * 40;
                card.x = id * 150;
                //card.y = Config.StageHeight - card.height;
                this.addChild(card);
                this["_cardlist" + id].push(card);
            }

            var sb:scene.SButton = new scene.SButton("ui_card", "ui_cardselect", "出牌");
            sb.name = "btn_player_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150 + 60;
            sb.y = 700;

            var sb:scene.SButton = new scene.SButton("ui_card", "ui_cardselect", "一分");
            sb.name = "btn_call_1_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150;
            sb.y = 800;
            sb.scaleX = sb.scaleY = 0.5;

            var sb:scene.SButton = new scene.SButton("ui_card", "ui_cardselect", "二分");
            sb.name = "btn_call_2_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150 + 30;
            sb.y = 800;
            sb.scaleX = sb.scaleY = 0.5;

            var sb:scene.SButton = new scene.SButton("ui_card", "ui_cardselect", "三分");
            sb.name = "btn_call_3_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150 + 60;
            sb.y = 800;
            sb.scaleX = sb.scaleY = 0.5;

            var sb:scene.SButton = new scene.SButton("ui_card", "ui_cardselect", "不叫");
            sb.name = "btn_call_0_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150;
            sb.y = 850;
            sb.scaleX = sb.scaleY = 0.5;

            var sb:scene.SButton = new scene.SButton("ui_card", "ui_cardselect", "过");
            sb.name = "btn_pass_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150 + 60;
            sb.y = 850;
            sb.scaleX = sb.scaleY = 0.5;
            //trace("*********************************");
        }

        //设置3张地主牌
        private setDizhuCard3() {
            var clist:Array<number> = TestGameMgr.Instance.GetDizhuCard3();
            var clen:number = clist.length;
            var i:number = 0;
            for (i = 0; i < clen; i++) {
                var card:Card = MandPool.getInsByParm(Card,clist[i]);
                card.y = i * 40;
                card.x = 3 * 150;
                //card.y = Config.StageHeight - card.height;
                this.addChild(card);
            }


            this._textType = new egret.TextField();
            this._textType.type = egret.TextFieldType.INPUT;
            this._textType.background = true;
            this._textType.textColor = 0x000000;
            this._textType.text = "getInitInfo";
            this._textType.width = 500;
            this._textType.x = 450;
            this._textType.y = 150;
            this.addChild(this._textType);


            this._textValue = new egret.TextField();
            this._textValue.type = egret.TextFieldType.INPUT;
            this._textValue.background = true;
            this._textValue.textColor = 0x000000;
            this._textValue.text = '{"example":"example"}';
            this._textValue.width = 500;
            this._textValue.x = 450;
            this._textValue.y = 200;
            this.addChild(this._textValue);

            var sb:scene.SButton = new scene.SButton("ui_card", "ui_cardselect", "调用\n原生");
            sb.name = "btn_test_h2app";
            this.addChild(sb);
            sb.x = 450;
            sb.y = 250;
            sb.scaleX = sb.scaleY = 0.7;

            this._backValue = new egret.TextField();
            this._backValue.textColor = 0x000000;
            this._backValue.text = '';
            this._backValue.width = 500;
            this._backValue.x = 450;
            this._backValue.y = 320;
            this.addChild(this._backValue);


            var txttip:egret.TextField = new egret.TextField();
            txttip.textColor = 0x000000;
            txttip.text = '原生调用js\n native2js(string)';
            txttip.width = 500;
            txttip.x = 450;
            txttip.y = 380;
            this.addChild(txttip);
        }

        private onTab(e:egret.TouchEvent):void {
            var target:egret.DisplayObject = e.target;
            var name = target.name;

            //出牌按钮
            if (name.indexOf("btn_player_") == 0) {
                var id:number = <number><any>(name.split("_"))[2];
                var list = this["_cardlist" + id];
                var sellist = [];
                for (var str in list) {
                    var card:Card = list[str];
                    if (card.Select) {
                        sellist.push(card.Value);
                    }
                }
                var isok:boolean = TestGameMgr.Instance.ShowCard(sellist, id);
                if (isok) {
                    var len:number = list.length;
                    var i:number = len - 1;
                    for (i = len - 1; i >= 0; i--) {
                        var card:Card = list[i];
                        if (card.Select) {
                            card.Release();
                            list.splice(i, 1);
                        }
                    }
                }
                trace("onTab:", id);
            }

            //pass按钮
            if (name.indexOf("btn_pass_") == 0) {
                var id:number = <number><any>(name.split("_"))[2];
                var isok:boolean = TestGameMgr.Instance.Pass(id);
            }

            if (name.indexOf("btn_call") == 0) {
                var cnum:number = <number><any>(name.split("_"))[2];
                var id:number = <number><any>(name.split("_"))[3];
                var isok:boolean = TestGameMgr.Instance.CallLandOwners(cnum, id);
                if (isok) {
                    var lanowner:data.Player = TestGameMgr.Instance.GetLanOwner();
                    this.setCard(lanowner.TableId, true);
                }
            }

            //调用原生测试
            if (name == "btn_test_h2app") {
                var type:string = this._textType.text;
                var value:string = this._textValue.text;
                var obj:Object = {};
                obj["type"] = type;
                obj["value"] = value;
                this._backValue.text = "返回:" + NativeMgr.Instance.JS2Native(obj).toString();
            }
        }
    }
}