var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var scene;
(function (scene) {
    var TestGameScene = (function (_super) {
        __extends(TestGameScene, _super);
        function TestGameScene() {
            var _this = _super.call(this) || this;
            _this._textType = null;
            _this._textValue = null;
            _this._backValue = null;
            _this._cardlist0 = [];
            _this._cardlist1 = [];
            _this._cardlist2 = [];
            //            this.skinName = "skins.scene.LobbySceneSkin";
            _this.initListData();
            return _this;
        }
        TestGameScene.prototype.initListData = function () {
            var bg = new egret.Bitmap(RES.getRes("bg_lobby_jpg"));
            this.addChild(bg);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
            TestGameMgr.Instance.Start(this);
            this.setCard(0);
            this.setCard(1);
            this.setCard(2);
            this.setDizhuCard3();
            SoundMgr.Instance.PlaySound("bg_lobby_mp3");
        };
        //提示出牌
        TestGameScene.prototype.PrompCard = function (id, cld) {
            if (cld == null) {
                return;
            }
            var arr = this["_cardlist" + id];
            var i = 0;
            var j = 0;
            var len = cld.List.length;
            var len2 = arr.length;
            var card;
            var value;
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
        };
        TestGameScene.prototype.setCard = function (id, isre) {
            if (isre === void 0) { isre = false; }
            if (isre) {
                var rlen = this["_cardlist" + id].length;
                var ri = 0;
                for (ri = 0; ri < rlen; ri++) {
                    var card = this["_cardlist" + id][ri];
                    card.Release();
                }
                this["_cardlist" + id] = [];
            }
            var p1 = TestGameMgr.Instance.GetPlayerById(id);
            var clist = p1.CardArr;
            clist.sort(function (a, b) {
                if (a % 100 > b % 100) {
                    return -1;
                }
                return 1;
            });
            var clen = p1.CardNum;
            var i = 0;
            for (i = 0; i < clen; i++) {
                var card = MandPool.getInsByParm(scene.Card, clist[i]);
                card.y = i * 40;
                card.x = id * 150;
                //card.y = Config.StageHeight - card.height;
                this.addChild(card);
                this["_cardlist" + id].push(card);
            }
            var sb = new scene.SButton("ui_card", "ui_cardselect", "出牌");
            sb.name = "btn_player_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150 + 60;
            sb.y = 700;
            var sb = new scene.SButton("ui_card", "ui_cardselect", "一分");
            sb.name = "btn_call_1_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150;
            sb.y = 800;
            sb.scaleX = sb.scaleY = 0.5;
            var sb = new scene.SButton("ui_card", "ui_cardselect", "二分");
            sb.name = "btn_call_2_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150 + 30;
            sb.y = 800;
            sb.scaleX = sb.scaleY = 0.5;
            var sb = new scene.SButton("ui_card", "ui_cardselect", "三分");
            sb.name = "btn_call_3_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150 + 60;
            sb.y = 800;
            sb.scaleX = sb.scaleY = 0.5;
            var sb = new scene.SButton("ui_card", "ui_cardselect", "不叫");
            sb.name = "btn_call_0_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150;
            sb.y = 850;
            sb.scaleX = sb.scaleY = 0.5;
            var sb = new scene.SButton("ui_card", "ui_cardselect", "过");
            sb.name = "btn_pass_" + id;
            //sb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
            this.addChild(sb);
            sb.x = id * 150 + 60;
            sb.y = 850;
            sb.scaleX = sb.scaleY = 0.5;
            //trace("*********************************");
        };
        //设置3张地主牌
        TestGameScene.prototype.setDizhuCard3 = function () {
            var clist = TestGameMgr.Instance.GetDizhuCard3();
            var clen = clist.length;
            var i = 0;
            for (i = 0; i < clen; i++) {
                var card = MandPool.getInsByParm(scene.Card, clist[i]);
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
            var sb = new scene.SButton("ui_card", "ui_cardselect", "调用\n原生");
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
            var txttip = new egret.TextField();
            txttip.textColor = 0x000000;
            txttip.text = '原生调用js\n native2js(string)';
            txttip.width = 500;
            txttip.x = 450;
            txttip.y = 380;
            this.addChild(txttip);
        };
        TestGameScene.prototype.onTab = function (e) {
            var target = e.target;
            var name = target.name;
            //出牌按钮
            if (name.indexOf("btn_player_") == 0) {
                var id = (name.split("_"))[2];
                var list = this["_cardlist" + id];
                var sellist = [];
                for (var str in list) {
                    var card = list[str];
                    if (card.Select) {
                        sellist.push(card.Value);
                    }
                }
                var isok = TestGameMgr.Instance.ShowCard(sellist, id);
                if (isok) {
                    var len = list.length;
                    var i = len - 1;
                    for (i = len - 1; i >= 0; i--) {
                        var card = list[i];
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
                var id = (name.split("_"))[2];
                var isok = TestGameMgr.Instance.Pass(id);
            }
            if (name.indexOf("btn_call") == 0) {
                var cnum = (name.split("_"))[2];
                var id = (name.split("_"))[3];
                var isok = TestGameMgr.Instance.CallLandOwners(cnum, id);
                if (isok) {
                    var lanowner = TestGameMgr.Instance.GetLanOwner();
                    this.setCard(lanowner.TableId, true);
                }
            }
            //调用原生测试
            if (name == "btn_test_h2app") {
                var type = this._textType.text;
                var value = this._textValue.text;
                var obj = {};
                obj["type"] = type;
                obj["value"] = value;
                this._backValue.text = "返回:" + NativeMgr.Instance.JS2Native(obj).toString();
            }
        };
        return TestGameScene;
    }(scene.SceneBase));
    scene.TestGameScene = TestGameScene;
    __reflect(TestGameScene.prototype, "scene.TestGameScene");
})(scene || (scene = {}));
//# sourceMappingURL=TestGameScene.js.map