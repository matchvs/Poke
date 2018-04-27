/**
 *
 * @author 
 *
 */
class QuickTestView extends egret.gui.SkinnableComponent {
	
    public log_txt: egret.gui.Label;
    private test: QuickTest;
    public constructor() {
        super();
        this.skinName = skins.QuickTestSkin;
	}
	
	public createChildren(){
        super.createChildren();  
        
        this.log_txt.height = NaN;
        
        this.test = new QuickTest();
        this.test.init(this.log_txt);
        this.test.start();
	}
}
