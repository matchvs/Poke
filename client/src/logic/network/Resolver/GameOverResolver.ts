module network {
	export class GameOverResolver  extends IResolver {
		public constructor() {
			super();
		}


		/**
		 * 发送消息封包
		 */
		protected Package(data:any):any{
			let event = {
				action:133,
				data:data
			};
			event = data;
			return event;
		}

		/**
		 * 接收消息解包
		 */
		protected Parse(data:any){
			return data;
		}
	}
}