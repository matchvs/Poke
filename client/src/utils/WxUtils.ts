class WxUtils {
	public constructor() {
	}

	/**
	 * 微信邀请
	 * @param key 分享的标题
	 * @param query 分享的内容
	 */
	public static wxTogether(key:any,query:string) {
		let wxm=new Wxmodel();
		wxm.together(key,query);
	}
}