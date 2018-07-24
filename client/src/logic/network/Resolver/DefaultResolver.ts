module network {
	export class DefaultResolver extends IResolver{
		public constructor() {
			super();
		}

		protected Package(data:any):any{
			return data;
		}

		protected Parse(data:any){
			return data;
		}
	}
}