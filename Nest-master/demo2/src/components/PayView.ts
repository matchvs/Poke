/**
 *
 * @author 
 *
 */
class PayView extends egret.gui.SkinnableComponent {
    
    list: egret.gui.List;
    public payButton: egret.gui.Button;

    public constructor() {
        super();
        this.skinName = skins.PayViewSkin;
    }
    
    
    public createChildren() {
        super.createChildren();
        
        var dp = [];
        for (var i:number = 1; i < 10; i++)
        {
            dp.push({label:"item"+i, name: "testpay" + i});
        }
        this.list.dataProvider = new egret.gui.ArrayCollection(dp);
    }
}
