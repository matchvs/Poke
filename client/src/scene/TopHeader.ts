class TopHeader extends eui.Component implements eui.UIComponent{

	private allChildren:{[key:string]:any} = [];

	private _headerImg:eui.Image = null;
	private _nickName:eui.Label = null;
	private _pointValue:eui.Label = null;

	public constructor() {
		super();
	}

	/**
	 * 获取Exml 文件内容
	 */
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		this.allChildren[partName] = instance;
		egret.log("获取控件")
	}

	public init(){
		egret.log("使用控件");
		this._headerImg = this.allChildren["headImg"];
		this._nickName =  this.allChildren["nickName"];
		this._pointValue =  this.allChildren["pointValue"];
	}


	/**
	 * 设置头像
	 */
	public ShowAvator(avator:string){
		if(this._headerImg){
			this._headerImg.source = avator;
		}
	}

	/**
	 * 设置昵称
	 */
	public SetNickName(name:string){
		if(this._nickName){
			this._nickName.text = name;
		}
	}

	/**
	 * 设置积分
	 */
	public SetPointValue(value:number){
		if(this._pointValue ){
			this._pointValue.text = value.toString();
		}
	}
}