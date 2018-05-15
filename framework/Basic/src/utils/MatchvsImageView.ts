class MatchvsImageView  extends eui.Group{

	private backgroutImage:eui.Image;
	private srcImage:eui.Image; 
	private context:any;

	public constructor(context:any) {
		super();
		this.context = context;
		this.srcImage = new eui.Image();
		this.backgroutImage = new eui.Image();
	}
	

	public src(srcURL:any):void {
		if (srcURL == null) return;
		this.srcImage.source = srcURL;
		// this.context.addChild(this.srcImage);
	}


	public backgrout(backgroutURL :any) :void {
		if (backgroutURL == null) return;
		this.backgroutImage.source = backgroutURL;
		this.backgroutImage.maxWidth = this.maxWidth;
		this.backgroutImage.maxHeight = this.maxHeight;
		// this.context.addChild(this.backgroutImage);	
	}

}