module network {
	export class NetworkStateCheck {

		private static _instance:NetworkStateCheck = null;
		private _curr:any = null;
		public constructor() {
			
		}

		public static getInstance():NetworkStateCheck{
			if(NetworkStateCheck._instance == null){
				NetworkStateCheck._instance =  new NetworkStateCheck();
			}
			return NetworkStateCheck._instance;
		}
		
		public static Release(){
			if(NetworkStateCheck._instance){
				NetworkStateCheck._instance = null;
			}
		}

		/**
		 * 取消监听
		 */
		public CancelListen(){
			PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_NETWORKSTATE,this.networkStateNotify,this);
			PokeMatchvsRep.getInstance.removeEventListener(MatchvsMessage.MATCHVS_ERROR,this.NetorkError,this);
			if(this._curr && "Release" in this._curr ){
				this._curr.Release();
			}
			console.log("CancelListen:取消网络错误监听");
		}
		
		/**
		 * 注册网络监听
		 */
		public RegistNetListen(obj:any){
			PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_NETWORKSTATE,this.networkStateNotify,this);
			PokeMatchvsRep.getInstance.addEventListener(MatchvsMessage.MATCHVS_ERROR,this.NetorkError,this);
			this._curr = obj;
		}

		/**
		 * 房间用户状态变化回调
		 */
		private networkStateNotify(e:egret.Event){
			let data = e.data;
			this.CancelListen();
			SceneManager.ErrorPage("其他玩家网络连接断开，请返回到大厅...",function(){
				PokeMatchvsEngine.getInstance.leaveRoom("玩家断开");
				SceneManager.showScene(Game);
			},this);
		}

		/**
		 * 网络错误回调
		 */
		private NetorkError(e:egret.Event){
			let data = e.data;
			this.CancelListen();
			//PokeMatchvsEngine.getInstance().loginOut();
			SceneManager.ErrorPage("您的网络连接断开, 需要重新登录...",function(){
				PokeMatchvsEngine.getInstance.init(MatchvsData.pChannel,MatchvsData.pPlatform,MatchvsData.gameID);
				SceneManager.showScene(Login);
			},this);
		}
	}
}