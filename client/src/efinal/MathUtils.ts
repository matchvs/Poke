
// 微信上的适配
// 其他端可以不用那么麻烦 showAll原有的尺寸正常缩放
function FakeRandom(seed) {
    this.next = function (range) {
        range = range || 100;
        var min = 0;
        seed = (seed * 9301 + 49297) % 233280;
        var rnd = seed / 233280.0;
        return Math.floor(min + rnd * (range - min));
    }
}

class MathUtils {
    public static Random = new FakeRandom(new Date().getMilliseconds());
    public static random(range?: number): number {
        if (range < 0) {
            range = 0;
        }
        return MathUtils.Random.next(range);
    }

    public static max(a: number, b: number) {

        return a > b ? a : b;
    }
    public static min(a: number, b: number) {
        return a < b ? a : b;
    }
}