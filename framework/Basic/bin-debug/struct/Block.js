var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BlockBasic = (function () {
    function BlockBasic(x, y, idx, color, shapes) {
        this.x = x;
        this.y = y;
        this.idx = idx;
        this.color = color;
        this.shapes = shapes;
    }
    ;
    return BlockBasic;
}());
__reflect(BlockBasic.prototype, "BlockBasic");
//# sourceMappingURL=Block.js.map