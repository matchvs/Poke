class ColliderCheckUtil {
	/**
	 * 检查两个物体重叠的百分比
	 * @return 0.0 ~ 1.0
	 */
	// public static checkPercentage(src: egret.DisplayObject, dst: egret.DisplayObject): Number {
	// 	var srcSize = src.width*src.height;
	// 	if(dst.x<src.x){
	// 		if((dst.x+dst.width)>src.x){
	// 			return (dst.x+dst.width-src.x)*
	// 		}
	// 	}
	// 	// ||dst.x>src.x+src.width
	// 	return 0;
	// }
	/**
	 * 检查两个物体在Y轴重叠的百分比
	 * @return 0.0 ~ 1.0
	 */
	public static checkPercentage(src: egret.DisplayObject, dst: egret.DisplayObject): number {
		if (src.x >= dst.x && src.x < (dst.x + dst.width)) {
			//src进入dst一半 至  src被dst完全包含
			if ((src.y + src.height) >= dst.y && src.y <= (dst.y + dst.height)) {
				if (src.y < dst.y) {
					return (src.y + src.height - dst.y) / src.height;
				} else if ((src.y + src.height) >= (dst.y + dst.height)) {
					return (dst.y + dst.height - src.y) / src.height;
				} else {
					return 1.0;
				}
			}
		}
		return 0;
	}

}