class Base extends eui.Component{ 

	public constructor() {
		super();
	}

	
	protected onError(e:any) {
		PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_ERROR,this.onEvent,e);
	}



	private onEvent() {
		egret.log("111111111111111111111111111111111111111111111111fdsfffffffffffffffffffffff");
	}


}