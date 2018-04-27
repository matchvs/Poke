/**
 *
 * @author 
 *
 */
class PayItemView extends egret.gui.ItemRenderer {
    
    payButton: egret.gui.Button;
    
    number_txt: egret.gui.TextInput;
    
    name_txt: egret.gui.Label;

    public constructor() {
        super();
        this.skinName = skins.PayItemSkin;
    }
    
    
    public createChildren() {
        super.createChildren();
        
        this.payButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPayButtonTapHandler,this);
    }
        
    dataChanged():void {
        super.dataChanged();
        
        this.name_txt.text = this.data["name"];
    }
    
    private onPayButtonTapHandler(e:egret.TouchEvent):void{
        var num: number = !isNaN(parseInt(this.number_txt.text)) ? parseInt(this.number_txt.text) : 1;
        
        var payInfo: nest.iap.PayInfo = {
            goodsId:this.data["name"],
            goodsNumber:num.toString(),
            serverId:"1",
            ext:"1"
        };
        
        console.log(payInfo);
        
        nest.iap.pay(payInfo,this.onPayHandler.bind(this));
    }

    private onPayHandler(payInfo:nest.iap.PayCallbackInfo):void{
        console.log(payInfo);
    }
}
