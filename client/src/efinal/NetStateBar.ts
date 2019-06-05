class NetStateBar extends BaseScene implements eui.UIComponent {
	public static Connect: string = "connect";
	public static Disconnect: string = "disconnect";
	public static Slow: string = "slow";
	public constructor() {
		super();
		console.log('[INFO] NetStateBar');
	}
	public state(state: string) {
		this.currentState = state;
	}

}