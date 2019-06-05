class FileLoader {

	public constructor() {
	}
	/**
	 * 下载文件资源
	 * @param uri ex:"resource/map/desert.tmx"
	 * @param callback ex:callback(data:String)
	 */
	public static load(uri: string, callback: Function) {

		var urlLoader: egret.URLLoader = new egret.URLLoader();
		urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
		urlLoader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event): void {
			callback(event.target.data);
		}, uri);
		urlLoader.load(new egret.URLRequest(uri));
	}
	/**
	 * 下载文件资源
	 * @param uri ex:"resource/map/desert.tmx"
	 * @param callback ex:callback(xml:egret.XML)
	 */

	public static loadXML(uri: string, callback: Function) {
		var urlLoader: egret.URLLoader = new egret.URLLoader();
		urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
		var fc = function (event: egret.Event): void {
			callback(egret.XML.parse(event.target.data));
			urlLoader.removeEventListener(egret.Event.COMPLETE, fc, uri);
		};
		urlLoader.addEventListener(egret.Event.COMPLETE, fc, uri);
		urlLoader.load(new egret.URLRequest(uri));
	}

}