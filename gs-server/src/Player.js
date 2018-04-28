
class Player{
    constructor(userID){
        this.userID = userID;       //用户ID
        this.cardList = [];         //手中的牌
        this.integral = 0;          //积分
        this.isLandOwner = false;   //是否是地主
        this.landOwnerScore = 0;    //叫地主的分数
        this.isAuto = false;        //托管
        this.localTableId = 0;      //桌子位置
        this.isReady = false;
        this.isCallLandOwner = false;
    }

    PlayCards(cards){
        
    }


}


module.exports = Player;

