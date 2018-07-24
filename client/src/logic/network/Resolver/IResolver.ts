module network {
	export abstract class  IResolver {
		constructor(){
		}

		protected abstract Package(data:any):any;
		protected abstract Parse(data:any):any;

		/**
		 * 封包
		 */
		public toPackage(cmd:number, msg:any):string{
			let dt = this.Package(msg);
			return JSON.stringify({
				action:cmd,
				data:dt
			});
			//return JSON.stringify(dt);
		}

		/**
		 * 解包
		 */
		public getParse(data):any{
			try {
				return this.Parse(data);
			} catch (error) {
				console.error(error);
				return null;
			}
		}
	}
}