module network {
	export class CallLandLordResolver extends IResolver {
		public constructor() {
			super();
		}

		/**
		 * 发送消息封包
		 */
		protected Package(data:any):any{
			let event = {
				action:126,
				status:0, //0成功 1，失败
				data:{
					landOwner: 85642,
					landCards: [309,407,410],
					value: 3
				}
			};
			event = data;
			console.log("Package",event);
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