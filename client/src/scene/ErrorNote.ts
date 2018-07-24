class ErrorNote extends eui.Component implements  eui.UIComponent {

	private _btn_ok:eui.Button = null;
	private _lb_message:eui.Label = null;
	private _btn_ok_callback:Function = null;
	private _error_msg:string = "";
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		if(partName == "btn_ok"){
			this._btn_ok = instance;
			
		}
		if(partName == "lb_message"){
			this._lb_message = instance;
		}
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this._btn_ok.addEventListener(egret.TouchEvent.TOUCH_END,(e:egret.TouchEvent)=>{
				if(this._btn_ok_callback){
					this._btn_ok_callback();
				}
		},this);
		this._lb_message.text = this._error_msg;
		//
		network.NetworkStateCheck.getInstance().RegistNetListen(this);
	}


	/**
	 * @param {msg}	msg 要显示的消息
	 * @param {Function} callback 按钮回调
	 * 
	 */
	public SetErrorMsg(msg:string,callback:Function){
		this._btn_ok_callback = callback;
		this._error_msg = msg;
	}
}