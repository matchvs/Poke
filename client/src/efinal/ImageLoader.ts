class ImageLoader {
	public constructor() {
	}
	/**
	 * 从缓存中加载图片,如果缓存中没有,则下载图片并放入缓存,再显示
	 */
	public static showAsync(image: egret.Bitmap, name: string, x?: number, y?: number, w?: number, h?: number) {
		RES.getResAsync(name, function (result: egret.Texture) {
			image.texture = result;
			var index = name.indexOf("#");
			if (index >= 0) {//读取子图,如果没有则创建再读取
				var subkey = "";
				subkey = name.substr(index + 1);
				name = name.substr(0, index);
				if (null == result['subTexture']) {
					result['subTexture'] = new egret.SpriteSheet(result);

				}
				var spriteSheet: egret.SpriteSheet = result['subTexture'];
				if (null == spriteSheet.getTexture(subkey)) {
					spriteSheet.createTexture(subkey, x, y, w, h);
				}
				image.texture = spriteSheet.getTexture(subkey)
			} else {
				image.texture = result;
			}

		}, image);
	}
	/**
	 * 从缓存中加载图片,如果缓存中没有,加载失败
	 */
	public static show(image: egret.Bitmap, name: string) {
		image.texture = RES.getRes(name);
	}
	public static showAndCreate(container: egret.DisplayObjectContainer, name: string, x?: number, y?: number, isAlignBottom?: boolean) {
		var texture = RES.getRes(name);

		if (null == texture) {
			console.warn("[WARN] Not be found image:'" + name + "'");
			return;
		}
		var bitmap = new egret.Bitmap(texture);
		bitmap.x = x;
		// bitmap.y = y;
		bitmap.y = isAlignBottom ? (y - texture.textureHeight + texture.textureWidth) : y;
		bitmap.width = texture.textureWidth;
		bitmap.height = texture.textureHeight;
		// console.log('[INFO] showAndCreate image: ' + name +" bitmap.x:"+bitmap.x+","+bitmap.y +" size:"+bitmap.width+","+bitmap.height);
		container.addChild(bitmap);
		return bitmap;
	}
	/**
	 * 加载远程服务器上的资源
	 */
	public static showAsyncByCrossUrl(image: egret.DisplayObjectContainer, url: string, x?: number, y?: number, w?: number, h?: number) {
		// RES.getResByUrl(url:string,compFunc:Function,thisObject:any,type:string=””):void
		var loader: egret.ImageLoader = new egret.ImageLoader()
		loader.crossOrigin = "anonymous";
		var callback = function (e: egret.Event) {
			var bitmapData: egret.BitmapData = (<egret.ImageLoader>e.target).data;
			var texture = new egret.Texture();
			texture.bitmapData = bitmapData;
			var bitmap = new egret.Bitmap(texture);
			bitmap.x = x || 0;
			bitmap.y = y || 0;
			bitmap.width = w || texture.textureWidth;
			bitmap.height = h || texture.textureWidth;
			image.addChild(bitmap);
		};
		loader.once(egret.Event.COMPLETE, callback, this);
		loader.load(url);
	}


}