var ArrayTools = require("./ArrayTools");

class SendCard{
    constructor() {
    }

    //获取初始卡片,四张四张发.容易做规则,客户要求0.5的概率出炸弹
    //返回四个数组,0,1,2为玩家牌,3为地主牌三张
    GetCardRandom() {
        var list = null;
        var list1 = [];
        var list2 = [];
        var list3 = [];
        var bomblist = [];
        var i = 0;
        list = SendCard.CardList.concat();
        if (Math.random() > 0.5) {
            bomblist = this.doBombArr(list);
        }
        ArrayTools.RandomSort(list);

        var bombranid = Math.floor(Math.random() * 3);
        this.addplaylist(list, bomblist, list1, 0 == bombranid);
        this.addplaylist(list, bomblist, list2, 1 == bombranid);
        this.addplaylist(list, bomblist, list3, 2 == bombranid);
        return [list1, list2, list3, list];
    }
    //分配玩家手牌,随机获得炸弹牌
    addplaylist(list, bomblist, plist, hasbomb) {
        if (hasbomb && bomblist.length > 0) {
            while (bomblist.length > 0) {
                plist.push(bomblist.pop());
            }
        }
        while (plist.length < 17) {
            plist.push(list.pop());
        }
        ArrayTools.RandomSort(plist);
    }

    /**
     * 
     * @param {Array<number>} list 
     */
    doBombArr(list){
        var blist = this.getBombArr();
        var i = 0;
        var len = list.length;
        var j = 0;
        var jlen = blist.length;
        var insertid = 4 * Math.floor(Math.random() * (52 - 4) / 3);
        //原牌中去掉炸弹
        for (i = len - 1; i >= 0; i--) {
            for (j = 0; j < jlen; j++) {
                if (list[i] == blist[j]) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
        return blist;
    }
    getBombArr() {
        var len = SendCard.ValueList.length;
        var ranid = Math.floor(Math.random() * len);
        var id = SendCard.ValueList[ranid];
        var list = [100 + id, 200 + id, 300 + id, 400 + id];
        return list;
    }
}

//扑克牌数字 3,4,5,6,7,8,9,10,11,12,13,14=1,20=2,98=小王,99=大王
//花色 黑红梅方:100,200,300,400
//扑克牌=花色+扑克牌数字
SendCard.CardList= [
    103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 120,
    203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 220,
    303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 320,
    403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 420,
    998, 999
];

//不带花色纯数字
SendCard.ValueList = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 20];

module.exports =SendCard;