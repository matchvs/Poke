/**
 * 闪速效果
 */
class BilingBiling {
	public static biling(view, time: number, loopCount: number) {
		if (loopCount > 0) {
			view.alpha = 0.1;
			egret.Tween.get(view).to({ alpha: 1.0, loop: false }, time, egret.Ease.elasticInOut).call(
				function () {
					this.biling(view, time, --loopCount);
				}.bind(this)
			).play();
		}

	}
}