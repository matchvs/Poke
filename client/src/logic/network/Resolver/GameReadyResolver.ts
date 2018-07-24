module network {
	export class GameReadyResolver extends IResolver {
		public constructor() {
			super();
		}

		/**
		 * 发送消息封包
		 */
		protected Package(data:any):any{
			let event = {
				action:121,
				data:{
					userCards:[
						{
							userID:96648,
							card:[210,420,214,403,103,310,304,106,303,212,205,414,203,109,999,998,307]
						},
						{
							userID:85642,
							card:[411,306,120,311,105,207,206,112,412,208,114,313,213,409,314,320,404]
						},
						{
							userID:75646,
							card:[408,308,406,204,113,305,107,211,110,413,220,312,104,111,405,209,108]
						}
					],
					lanownList:[309,407,410],
					callOwner:85642,
				}
			};
			event = data;
			//console.log("Package",event);
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