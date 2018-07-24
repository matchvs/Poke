module battle {
	export class MyCardControl {
		private _btnProxy:BattleBtnControl=null;
        private _tableList:Array<number>=[];              //桌面牌,用于提示

        private _type:gameLogic.PlayCardTypes = null;
        private _prompt:gameLogic.Prompt = null;
        private _prompt2:gameLogic.Prompt2 = null;
        private _compare:gameLogic.Compare=null;

        private _lastCard:CardUI = null;                    //防止move多次选择
        private _startCard:CardUI = null;
        private _cardLayer:egret.Sprite = null;         //存放卡牌显示的容器
        private _gameScene:egret.Sprite = null;
        private _player:Player = null;
        private _cardVlist:Array<CardUI> = null;          //点选牌的列表
        private _ismousedown:boolean = false;
        private _island:boolean=false;

        private _canshowAll:boolean=false;
        public static LEFTGAP:number = 17;       //距离左侧距离
        public static RIGHTGAP:number = 17;      //距离右侧距离
        public static DOWNGAP:number = 98;       //距离下方距离
        public static VERCARGAP:number = 35;     //纵向卡牌间隔
        public static HORCARGAP:number = 100;     //横向卡牌间隔(最大)
        public constructor() {

        }

        public Init(gs:egret.Sprite):void {
            this._gameScene = gs;
        }
        //设置地主标
        public SetPlayerLandFlag(landid:number):void
        {
            this._island=landid==3;
            //this.setCard();
        }
        //是否能够全下
        public set CanShowAll(c:boolean)
        {
            this._canshowAll=c;
        }
        public SetMainPlayer(player:Player):void
        {
            this._gameScene.removeChildren();

            this._type = new gameLogic.PlayCardTypes();
            this._prompt = new gameLogic.Prompt();
            this._prompt2=new gameLogic.Prompt2();
            this._compare=new gameLogic.Compare();
            
            this._player = player;
            this._cardVlist = [];
            this._cardLayer = new egret.Sprite();
            this._gameScene.addChild(this._cardLayer);
            this._cardLayer.x = 0;
            this._cardLayer.y = Config.StageHeight - MyCardControl.DOWNGAP - CardUI.CARDHEIGHT * 2 - MyCardControl.VERCARGAP;

            this._cardLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this._cardLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this._cardLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this._cardLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            //this._cardLayer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);

            this.setCard();
        }
        public SetButtonCtl(btnproxy:BattleBtnControl):void
        {
            this._btnProxy=btnproxy;
        }

        public getHasBigger():boolean
        {
            if(this._tableList==null||this._tableList.length<1)//没有桌面牌不提示
            {
                return true;
            }
            var rlen:number = this._cardVlist.length;
            var ri:number = 0;
            var rj:number = 0;
            var mylist:Array<number>=[];
            for (ri = 0; ri < rlen; ri++) {
                var card:CardUI = this._cardVlist[ri];
                mylist.push(card.Value);
            }

            var cld1:gameLogic.CardListData = this._type.GetType(mylist);
            var cld2:gameLogic.CardListData = this._type.GetType(this._tableList);
            var cld3:gameLogic.CardListData=null;
            if (cld2.Type == gameLogic.PlayCardTypes.Types_Error)                     //如果没有匹配成功,而且没有弹起牌,进入智能提示
            {
                return true;//cld3= this._prompt.GetPrompt(cld1, null, 0, 0, false);            //todo:这里传入其他两个玩家的数量
            }
            else
            {
                cld3 = this._prompt.GetPrompt(cld1, cld2, 0, 0, false,false);            //todo:这里传入其他两个玩家的数量
                if(cld3==null)          //智能提示没有找到,傻瓜提示
                {
                    cld3 = this._prompt2.GetPrompt(cld1,cld2);
                }
            }

            if(cld3==null)
            {
                return false;
            }
            return true;
        }

        public CanAllShow():boolean
        {
            var chooselist:Array<number>=this.GetWillShowList();
            if(chooselist!=null&&chooselist.length>0)//已经有选择的牌不提示
            {
                return true;
            }
            var rlen:number = this._cardVlist.length;
            var ri:number = 0;
            var rj:number = 0;
            var mylist:Array<number>=[];
            for (ri = 0; ri < rlen; ri++) {
                var card:CardUI = this._cardVlist[ri];
                card.Select = false;
                card.Jump=false;
                mylist.push(card.Value);
            }
            var cld1:gameLogic.CardListData = this._type.GetType(mylist);
            if(cld1.Type!=gameLogic.PlayCardTypes.Types_Error)
            {
                for (ri = 0; ri < rlen; ri++) {
                    var card:CardUI = this._cardVlist[ri];
                    card.Select = false;
                    card.Jump=true;
                    mylist.push(card.Value);
                }
                return true;
            }
            return true;
        }

        //重置
        public Reset():void
        {
            var rlen:number = this._cardVlist.length;
            var ri:number = 0;
            for (ri = 0; ri < rlen; ri++) {
                var card:CardUI = this._cardVlist[ri];
                card.Select = false;
                card.Jump=false;
            }
        }
        //能大过返回true,ismust:强制提示,不管有没有弹起牌
        public Prompt(isnew:boolean,ismust:boolean):boolean
        {
            if(isnew)
            {
                return this.CanAllShow();
            }
            if(!ismust)
            {
                var chooselist:Array<number>=this.GetWillShowList();
                if(chooselist!=null&&chooselist.length>0)//已经有选择的牌不提示
                {
                    return true;
                }
            }

            var rlen:number = this._cardVlist.length;
            var ri:number = 0;
            var rj:number = 0;
            var mylist:Array<number>=[];
            for (ri = 0; ri < rlen; ri++) {
                var card:CardUI = this._cardVlist[ri];
                card.Select = false;
                card.Jump=false;
                mylist.push(card.Value);
            }

            var cld1:gameLogic.CardListData = this._type.GetType(mylist);
            var cld2:gameLogic.CardListData = this._type.GetType(this._tableList);
            var cld3:gameLogic.CardListData=null;
            if (cld2.Type == gameLogic.PlayCardTypes.Types_Error)                     //如果没有匹配成功,而且没有弹起牌,进入智能提示
            {
                cld3= this._prompt.GetPrompt(cld1, null, 0, 0, false,false);            //todo:这里传入其他两个玩家的数量
            }
            else
            {
                cld3 = this._prompt.GetPrompt(cld1, cld2, 0, 0, false,false);            //todo:这里传入其他两个玩家的数量
                if(cld3==null)          //智能提示没有找到,傻瓜提示
                {
                    cld3 = this._prompt2.GetPrompt(cld1,cld2);
                }
            }

            if(cld3==null)
            {
                return false;
            }

            var list:Array<number>=cld3.List;
            var jlen:number=list.length;
            for (ri = 0; ri < rlen; ri++) {
                var card:CardUI = this._cardVlist[ri];
                for(rj=0;rj<jlen;rj++)
                {
                    if(list[rj]==card.Value)
                    {
                        card.Jump=true;
                        break;
                    }
                }
            }
            return true;

        }
        public SetTableList(clist:Array<number>):void
        {
            this._tableList=clist;
        }
        //发送完成,返回消息
        public SendOver(list ?:Array<number>):void
        {
            this.setCard(list);
        }

        //获取点选的牌
        public GetWillShowList(notype:boolean=false):Array<number>{
            var i:number = 0;
            var len:number = this._cardVlist.length;
            var card:CardUI;
            var list:Array<number>=[];
            for (i = len - 1; i >= 0; i--) {
                card = this._cardVlist[i];
                if (card.Jump) {
                    //this._cardVlist.splice(i,1);
                    list.push(card.Value);
                    //this._player.removeCards([card.Value]);
                    //card.Release();
                }
            }
            //判定牌是否是有效
            var cls:gameLogic.CardListData=this._type.GetType(list);
            if(cls.Type==gameLogic.PlayCardTypes.Types_Error)
            {
                if(this._canshowAll&&cls.List.length>1&&cls.SingleArr.length<1&&cls.HasBomb()==false)
                {
                    return list;
                }
                if(notype==false)
                {
                    return null;
                }
                else
                {
                    if(list.length>0)
                    {
                        return list;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            //this.RemoveJump();
            return list;
        }
        public set Visible(v:boolean)
        {
            if(this._cardLayer)
            {
                this._cardLayer.visible=v;
            }
        }

        private onTouchBegin(e:egret.TouchEvent):void {
            var rlen:number = this._cardVlist.length;
            var ri:number = 0;
            for (ri = 0; ri < rlen; ri++) {
                var card:CardUI = this._cardVlist[ri];
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
        }

        private onTouchMove(e:egret.TouchEvent):void {
            var target:any = e.target;
            if (!(target instanceof CardUI) || this._lastCard == null) {
                return;
            }
            if (target == this._lastCard) {
                return;
            }
            this._lastCard = target;
            var vlen:number = this._cardVlist.length;
            var i:number = 0;
            var card:CardUI;
            var flag:number = 0;
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
        }

        /**
         * 点选牌完成后进行牌类型比较
         */
        private onTouchEnd(e:egret.TouchEvent):void {
            if (this._ismousedown == false) {
                return;
            }
            this._ismousedown = false;
            var rlen:number = this._cardVlist.length;
            var i:number = 0;
            var seltarr:Array<CardUI> = [];
            var promparr:Array<number> = [];
            var mylist:Array<number>=[];
            var card:CardUI;
            var alljump:boolean = true;
            var hasjump:boolean = false;
            var hasjumpall:boolean=false;
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
                if(card.Jump==true)
                {
                    hasjumpall=true;
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

            var mycld:gameLogic.CardListData=this._type.GetType(mylist)
            var cld:gameLogic.CardListData = this._type.GetType(promparr);
            if (cld.Type == gameLogic.PlayCardTypes.Types_Error && hasjumpall == false)                     //如果没有匹配成功,而且没有弹起牌,进入智能提示
            {
                var cld2:gameLogic.CardListData=null;
                if(cld.List.length>=5)//大于5张提示顺子
                {
                    cld2 = this._prompt.GetPrompt(cld, null, 0, 0, false,false);            //todo:这里传入其他两个玩家的数量
                    //提示牌大于3张而且大于选择牌的2/3的牌才优化提示
                    if (cld2&&(cld2.Type == gameLogic.PlayCardTypes.Types_List || (cld2.List.length > 3))) {
                        cld = cld2;
                    }
                }
                else
                {
                    cld2=this._prompt.GetPromptContain(mycld,cld);
                    if (cld2&&cld2.Type == gameLogic.PlayCardTypes.Types_List) {
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


            var len2:number = cld.List.length;
            var j:number = 0;
            var value:number = 0;
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
        }

        /**
         * 点选牌后，进行牌类型大小比较
         */
        public SetBtnVisible():void
        {
            if(this._btnProxy.State != BattleBtnControl.STATE_Playing)
            {
                return;
            }
            var jlist:Array<number>=this.GetWillShowList();
            var tcld:gameLogic.CardListData=null;
            var scld:gameLogic.CardListData=null;
            if(jlist==null)
            {
                this._btnProxy.PlayingShow(false);
            }
            else
            {
                if(this._tableList==null||this._tableList.length<1)
                {
                    this._btnProxy.PlayingShow(true);
                    return;
                }
                tcld=this._type.GetType(this._tableList);//获取牌桌上的牌类型
                scld=this._type.GetType(jlist);//获取当前玩家要出牌的类型
                if(this._compare.IsBiger(scld,tcld))//两种类型进行比较
                {
                    this._btnProxy.PlayingShow(true);
                }
                else
                {
                    this._btnProxy.PlayingShow(false);
                }
            }
        }

        private setCard(lt?:Array<number>) {
            var rlen:number = this._cardVlist.length;
            var ri:number = 0;
            for (ri = 0; ri < rlen; ri++) {
                var card:CardUI = this._cardVlist[ri];
                card.Release();
            }
            this._cardVlist = [];
            if(lt){
                this._player.removeCards(lt)
            }
            var clist:Array<number> = this._player.cardList;
            console.info("MyCardControl  setCard length:", this._player.cardNumber);
            clist.sort(function (a:number, b:number) {
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


            var list = this.dividArr();
            var list1 = list[0];
            var list2 = list[1];
            var len1:number = list1.length;
            var len2:number = list2.length;
            var dis:number = Config.StageWidth - MyCardControl.LEFTGAP - MyCardControl.RIGHTGAP - CardUI.CARDWIDTH;
            var cy1:number = 0;//Config.StageHeight-MyCardControl.DOWNGAP-CardUI.CARDHEIGHT;
            var cy2:number = cy1 + MyCardControl.VERCARGAP + CardUI.CARDHEIGHT;
            var gap1:number = dis / (len1 - 1);
            var gap2:number = dis / (len2 - 1);
            var i:number = 0;

            if (gap1 > MyCardControl.HORCARGAP) {
                gap1 = MyCardControl.HORCARGAP;
            }
            if (gap2 > MyCardControl.HORCARGAP) {
                gap2 = MyCardControl.HORCARGAP;
            }

            var sx1:number = (Config.StageWidth - (gap1 * (len1 - 1) + CardUI.CARDWIDTH)) / 2;
            var sx2:number = (Config.StageWidth - (gap2 * (len2 - 1) + CardUI.CARDWIDTH)) / 2;
            var lastCard:CardUI=null;
            for (i = 0; i < len1; i++) {
                var card:CardUI = MandPool.getInsByParm(CardUI,list1[i]);
                card.y = cy1;
                card.x = sx1 + i * gap1;
                this._cardLayer.addChild(card);
                this._cardVlist.push(card);
                lastCard=card;
            }

            for (i = 0; i < len2; i++) {
                var card:CardUI = MandPool.getInsByParm(CardUI,list2[i]);
                card.y = cy2;
                card.x = sx2 + i * gap2;
                this._cardLayer.addChild(card);
                this._cardVlist.push(card);
                lastCard=card;
            }

            if(this._island)
            {
                lastCard.addLand();
            }
        }


        //划分为上下显示的两个数组
        private dividArr():Array<any> {
            var arr1:Array<number> = [];
            var arr2:Array<number> = [];
            var len:number = this._player.cardNumber;
            var i:number = 0;
            var cardvalue:any;

            //先分配到两个数组
            for (i = 0; i < 10; i++) {
                cardvalue = this._player.cardList[i];
                if (cardvalue) {
                    arr1.push(cardvalue);
                }
            }
            for (i = 10; i < 20; i++) {
                cardvalue = this._player.cardList[i];
                if (cardvalue) {
                    arr2.push(cardvalue);
                }
            }

            //检查第二个数组的第一个数字第一个数组中是否存在(同样数字应该在一列)
            var samevalue:number;
            if ((arr2[0])) {
                samevalue=(arr2[0]) % 100;
            }
            var len1:number = arr1.length;
            var len2:number = arr2.length;
            var long:number = 0;
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
        }
        public Release():void
        {
            this._gameScene.removeChildren();
        }
	}
}