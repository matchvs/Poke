class Game extends eui.Component implements eui.UIComponent {



	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		
		instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
			//快速匹配
			if (partName == "fastMatch") {
				PokeMatchvsEngine.getInstance().joinRandomRoom();
				PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_JOINROOM_RSP,this.onEvent,this);
			} else if (partName == "bg") {
				SceneManager.showScene(new Game());
			}

		}, this);
	}


	 public onEvent(e:egret.Event):void {
		 switch (e.type) {
			 case MatchvsMessage.MATCHVS_JOINROOM_RSP:
			 if( e.data.length  == 2) {
				
			 }
			 break;
		 }
	 }

	protected childrenCreated(): void {
		super.childrenCreated();
	}

}