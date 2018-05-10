var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CardListData = controller.game.CardListData;
/**
 * 控制卡牌显示等规则
 * Created by Administrator on 2015/12/19.
 */
var scene;
(function (scene) {
    var MyCardProxy = (function () {
        function MyCardProxy() {
            this._btnProxy = null;
            this._tableList = []; //桌面牌,用于提示
            this._type = null;
            this._prompt = null;
            this._prompt2 = null;
            this._compare = null;
            this._lastCard = null; //防止move多次选择
            this._startCard = null;
            this._cardLayer = null;
            this._gameScene = null;
            this._player = null;
            this._cardVlist = null;
            this._ismousedown = false;
            this._island = false;
            this._canshowAll = false;
        }
        MyCardProxy.prototype.Init = function (gs) {
            this._gameScene = gs;
        };
        //设置地主标
        MyCardProxy.prototype.SetPlayerLandFlag = function (landid) {
            this._island = landid == 3;
            //this.setCard();
        };
        Object.defineProperty(MyCardProxy.prototype, "CanShowAll", {
            //是否能够全下
            set: function (c) {
                this._canshowAll = c;
            },
            enumerable: true,
            configurable: true
        });
        MyCardProxy.prototype.SetMainPlayer = function (player) {
            this._gameScene.removeChildren();
            this._type = new controller.game.Types();
            this._prompt = new controller.game.Prompt();
            this._prompt2 = new controller.game.Prompt2();
            this._compare = new controller.game.Compare();
            this._player = player;
            this._cardVlist = [];
            this._cardLayer = new egret.Sprite();
            this._gameScene.addChild(this._cardLayer);
            //this._cardLayer.visible=false;
            this._cardLayer.x = 0;
            this._cardLayer.y = Config.StageHeight - MyCardProxy.DOWNGAP - scene.Card.CARDHEIGHT * 2 - MyCardProxy.VERCARGAP;
            this._cardLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this._cardLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this._cardLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this._cardLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            //this._cardLayer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
            this.setCard();
        };
        MyCardProxy.prototype.SetBtnProxy = function (btnproxy) {
            this._btnProxy = btnproxy;
        };
        MyCardProxy.prototype.getHasBigger = function () {
            if (this._tableList == null || this._tableList.length < 1) {
                return true;
            }
            var rlen = this._cardVlist.length;
            var ri = 0;
            var rj = 0;
            var mylist = [];
            for (ri = 0; ri < rlen; ri++) {
                var card = this._cardVlist[ri];
                mylist.push(card.Value);
            }
            var cld1 = this._type.GetType(mylist);
            var cld2 = this._type.GetType(this._tableList);
            var cld3 = null;
            if (cld2.Type == controller.game.Types.Types_Error) {
                return true; //cld3= this._prompt.GetPrompt(cld1, null, 0, 0, false);            //todo:这里传入其他两个玩家的数量
            }
            else {
                cld3 = this._prompt.GetPrompt(cld1, cld2, 0, 0, false, false); //todo:这里传入其他两个玩家的数量
                if (cld3 == null) {
                    cld3 = this._prompt2.GetPrompt(cld1, cld2);
                }
            }
            if (cld3 == null) {
                return false;
            }
            return true;
        };
        MyCardProxy.prototype.CanAllShow = function () {
            var chooselist = this.GetWillShowList();
            if (chooselist != null && chooselist.length > 0) {
                return true;
            }
            var rlen = this._cardVlist.length;
            var ri = 0;
            var rj = 0;
            var mylist = [];
            for (ri = 0; ri < rlen; ri++) {
                var card = this._cardVlist[ri];
                card.Select = false;
                card.Jump = false;
                mylist.push(card.Value);
            }
            var cld1 = this._type.GetType(mylist);
            if (cld1.Type != controller.game.Types.Types_Error) {
                for (ri = 0; ri < rlen; ri++) {
                    var card = this._cardVlist[ri];
                    card.Select = false;
                    card.Jump = true;
                    mylist.push(card.Value);
                }
                return true;
            }
            return true;
        };
        //重置
        MyCardProxy.prototype.Reset = function () {
            var rlen = this._cardVlist.length;
            var ri = 0;
            for (ri = 0; ri < rlen; ri++) {
                var card = this._cardVlist[ri];
                card.Select = false;
                card.Jump = false;
            }
        };
        //能大过返回true,ismust:强制提示,不管有没有弹起牌
        MyCardProxy.prototype.Prompt = function (isnew, ismust) {
            if (isnew) {
                return this.CanAllShow();
            }
            if (!ismust) {
                var chooselist = this.GetWillShowList();
                if (chooselist != null && chooselist.length > 0) {
                    return true;
                }
            }
            var rlen = this._cardVlist.length;
            var ri = 0;
            var rj = 0;
            var mylist = [];
            for (ri = 0; ri < rlen; ri++) {
                var card = this._cardVlist[ri];
                card.Select = false;
                card.Jump = false;
                mylist.push(card.Value);
            }
            var cld1 = this._type.GetType(mylist);
            var cld2 = this._type.GetType(this._tableList);
            var cld3 = null;
            if (cld2.Type == controller.game.Types.Types_Error) {
                cld3 = this._prompt.GetPrompt(cld1, null, 0, 0, false, false); //todo:这里传入其他两个玩家的数量
            }
            else {
                cld3 = this._prompt.GetPrompt(cld1, cld2, 0, 0, false, false); //todo:这里传入其他两个玩家的数量
                if (cld3 == null) {
                    cld3 = this._prompt2.GetPrompt(cld1, cld2);
                }
            }
            if (cld3 == null) {
                return false;
            }
            var list = cld3.List;
            var jlen = list.length;
            for (ri = 0; ri < rlen; ri++) {
                var card = this._cardVlist[ri];
                for (rj = 0; rj < jlen; rj++) {
                    if (list[rj] == card.Value) {
                        card.Jump = true;
                        break;
                    }
                }
            }
            return true;
        };
        MyCardProxy.prototype.SetTableList = function (clist) {
            this._tableList = clist;
        };
        //发送完成,返回消息
        MyCardProxy.prototype.SendOver = function () {
            this.setCard();
        };
        MyCardProxy.prototype.GetWillShowList = function (notype) {
            if (notype === void 0) { notype = false; }
            var i = 0;
            var len = this._cardVlist.length;
            var card;
            var list = [];
            for (i = len - 1; i >= 0; i--) {
                card = this._cardVlist[i];
                if (card.Jump) {
                    //this._cardVlist.splice(i,1);
                    list.push(card.Value);
                    //this._player.removeCards([card.Value]);
                    //card.Release();
                }
            }
            var cls = this._type.GetType(list);
            if (cls.Type == controller.game.Types.Types_Error) {
                if (this._canshowAll && cls.List.length > 1 && cls.SingleArr.length < 1 && cls.HasBomb() == false) {
                    return list;
                }
                if (notype == false) {
                    return null;
                }
                else {
                    if (list.length > 0) {
                        return list;
                    }
                    else {
                        return null;
                    }
                }
            }
            //this.RemoveJump();
            return list;
        };
        Object.defineProperty(MyCardProxy.prototype, "Visible", {
            set: function (v) {
                if (this._cardLayer) {
                    this._cardLayer.visible = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        MyCardProxy.prototype.onTouchBegin = function (e) {
            var rlen = this._cardVlist.length;
            var ri = 0;
            for (ri = 0; ri < rlen; ri++) {
                var card = this._cardVlist[ri];
                if (card == e.target) {
                    card.Select = true;
                    this._startCard = card;
                    this._lastCard = card;
                }
                else {
                    card.Select = false;
                }
            }
            this._ismousedown = true;
        };
        MyCardProxy.prototype.onTouchMove = function (e) {
            var target = e.target;
            if (!(target instanceof scene.Card) || this._lastCard == null) {
                return;
            }
            if (target == this._lastCard) {
                return;
            }
            this._lastCard = target;
            var vlen = this._cardVlist.length;
            var i = 0;
            var card;
            var flag = 0;
            for (i = 0; i < vlen; i++) {
                card = this._cardVlist[i];
                if (flag == 1) {
                    card.Select = true;
                }
                else {
                    card.Select = false;
                }
                if (card == target) {
                    flag++;
                    card.Select = true;
                }
                if (card == this._startCard) {
                    flag++;
                    card.Select = true;
                }
            }
            return;
        };
        MyCardProxy.prototype.onTouchEnd = function (e) {
            if (this._ismousedown == false) {
                return;
            }
            this._ismousedown = false;
            var rlen = this._cardVlist.length;
            var i = 0;
            var seltarr = [];
            var promparr = [];
            var mylist = [];
            var card;
            var alljump = true;
            var hasjump = false;
            var hasjumpall = false;
            for (i = 0; i < rlen; i++) {
                card = this._cardVlist[i];
                mylist.push(card.Value);
                if (card == e.target) {
                    card.Select = true;
                    //break;
                }
                if (card.Select == true) {
                    promparr.push(card.Value);
                    seltarr.push(card);
                    if (card.Jump == false) {
                        alljump = false;
                    }
                    else {
                        hasjump = true;
                    }
                }
                if (card.Jump == true) {
                    hasjumpall = true;
                }
            }
            //选择的都是已经弹出的..全部不弹出
            if (alljump) {
                rlen = seltarr.length;
                for (i = 0; i < rlen; i++) {
                    card = seltarr[i];
                    card.Jump = false;
                    card.Select = false;
                }
                this.SetBtnVisible();
                return;
            }
            var mycld = this._type.GetType(mylist);
            var cld = this._type.GetType(promparr);
            if (cld.Type == controller.game.Types.Types_Error && hasjumpall == false) {
                var cld2 = null;
                if (cld.List.length >= 5) {
                    cld2 = this._prompt.GetPrompt(cld, null, 0, 0, false, false); //todo:这里传入其他两个玩家的数量
                    //提示牌大于3张而且大于选择牌的2/3的牌才优化提示
                    if (cld2 && (cld2.Type == controller.game.Types.Types_List || (cld2.List.length > 3))) {
                        cld = cld2;
                    }
                }
                else {
                    cld2 = this._prompt.GetPromptContain(mycld, cld);
                    if (cld2 && cld2.Type == controller.game.Types.Types_List) {
                        cld = cld2;
                    }
                }
            }
            //if(cld.List.length==1&&hasjumpall == false) //单击一张全部弹起
            //{
            //    var cnuu:number=mycld.getCountOfNum(cld.List[0]);
            //    if(cnuu>1)
            //    {
            //
            //        var cnulst:Array<number>=mycld.getValueByNum(cld.List[0],cnuu);
            //        var list1=cld.List;
            //        var flist=list1.concat(cnulst);
            //        cld=this._type.GetType(flist);
            //    }
            //}
            var len2 = cld.List.length;
            var j = 0;
            var value = 0;
            for (i = 0; i < rlen; i++) {
                card = this._cardVlist[i];
                card.Select = false;
                for (j = 0; j < len2; j++) {
                    value = cld.List[j];
                    if (value == card.Value) {
                        card.Jump = true;
                    }
                }
            }
            this.SetBtnVisible();
        };
        MyCardProxy.prototype.SetBtnVisible = function () {
            if (this._btnProxy.State != scene.GameBtnProxy.STATE_Playing) {
                return;
            }
            var jlist = this.GetWillShowList();
            var tcld = null;
            var scld = null;
            if (jlist == null) {
                this._btnProxy.PlayingShow(false);
            }
            else {
                if (this._tableList == null || this._tableList.length < 1) {
                    this._btnProxy.PlayingShow(true);
                    return;
                }
                tcld = this._type.GetType(this._tableList);
                scld = this._type.GetType(jlist);
                if (this._compare.IsBiger(scld, tcld)) {
                    this._btnProxy.PlayingShow(true);
                }
                else {
                    this._btnProxy.PlayingShow(false);
                }
            }
        };
        MyCardProxy.prototype.setCard = function () {
            var rlen = this._cardVlist.length;
            var ri = 0;
            for (ri = 0; ri < rlen; ri++) {
                var card = this._cardVlist[ri];
                card.Release();
            }
            this._cardVlist = [];
            var clist = this._player.CardArr;
            clist.sort(function (a, b) {
                if (a % 100 == b % 100) {
                    if (a > b) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                else if (a % 100 > b % 100) {
                    return -1;
                }
                return 1;
            });
            var list = this.dividArr();
            var list1 = list[0];
            var list2 = list[1];
            var len1 = list1.length;
            var len2 = list2.length;
            var dis = Config.StageWidth - MyCardProxy.LEFTGAP - MyCardProxy.RIGHTGAP - scene.Card.CARDWIDTH;
            var cy1 = 0; //Config.StageHeight-MyCardProxy.DOWNGAP-Card.CARDHEIGHT;
            var cy2 = cy1 + MyCardProxy.VERCARGAP + scene.Card.CARDHEIGHT;
            var gap1 = dis / (len1 - 1);
            var gap2 = dis / (len2 - 1);
            var i = 0;
            if (gap1 > MyCardProxy.HORCARGAP) {
                gap1 = MyCardProxy.HORCARGAP;
            }
            if (gap2 > MyCardProxy.HORCARGAP) {
                gap2 = MyCardProxy.HORCARGAP;
            }
            var sx1 = (Config.StageWidth - (gap1 * (len1 - 1) + scene.Card.CARDWIDTH)) / 2;
            var sx2 = (Config.StageWidth - (gap2 * (len2 - 1) + scene.Card.CARDWIDTH)) / 2;
            var lastCard = null;
            for (i = 0; i < len1; i++) {
                var card = MandPool.getInsByParm(scene.Card, list1[i]);
                card.y = cy1;
                card.x = sx1 + i * gap1;
                this._cardLayer.addChild(card);
                this._cardVlist.push(card);
                lastCard = card;
            }
            for (i = 0; i < len2; i++) {
                var card = MandPool.getInsByParm(scene.Card, list2[i]);
                card.y = cy2;
                card.x = sx2 + i * gap2;
                this._cardLayer.addChild(card);
                this._cardVlist.push(card);
                lastCard = card;
            }
            if (this._island) {
                lastCard.addLand();
            }
        };
        //划分为上下显示的两个数组
        MyCardProxy.prototype.dividArr = function () {
            var arr1 = [];
            var arr2 = [];
            var len = this._player.CardNum;
            var i = 0;
            var cardvalue;
            //先分配到两个数组
            for (i = 0; i < 10; i++) {
                cardvalue = this._player.CardArr[i];
                if (cardvalue) {
                    arr1.push(cardvalue);
                }
            }
            for (i = 10; i < 20; i++) {
                cardvalue = this._player.CardArr[i];
                if (cardvalue) {
                    arr2.push(cardvalue);
                }
            }
            //检查第二个数组的第一个数字第一个数组中是否存在(同样数字应该在一列)
            var samevalue;
            if ((arr2[0])) {
                samevalue = (arr2[0]) % 100;
            }
            var len1 = arr1.length;
            var len2 = arr2.length;
            var long = 0;
            if (samevalue) {
                for (i = len1 - 1; i >= 0; i--) {
                    if (samevalue == (arr1[i]) % 100) {
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
        };
        MyCardProxy.prototype.Release = function () {
            this._gameScene.removeChildren();
        };
        MyCardProxy.LEFTGAP = 17; //距离左侧距离
        MyCardProxy.RIGHTGAP = 17; //距离右侧距离
        MyCardProxy.DOWNGAP = 98; //距离下方距离
        MyCardProxy.VERCARGAP = 35; //纵向卡牌间隔
        MyCardProxy.HORCARGAP = 100; //横向卡牌间隔(最大)
        return MyCardProxy;
    }());
    scene.MyCardProxy = MyCardProxy;
    __reflect(MyCardProxy.prototype, "scene.MyCardProxy");
})(scene || (scene = {}));
//# sourceMappingURL=MyCardProxy.js.map