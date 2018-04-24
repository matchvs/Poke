var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var EntityMgr = (function () {
    function EntityMgr() {
    }
    Object.defineProperty(EntityMgr, "Instance", {
        get: function () {
            if (EntityMgr._instance == null) {
                EntityMgr._instance = new EntityMgr();
            }
            return EntityMgr._instance;
        },
        enumerable: true,
        configurable: true
    });
    EntityMgr._instance = null;
    return EntityMgr;
}());
__reflect(EntityMgr.prototype, "EntityMgr");
//# sourceMappingURL=EntityMgr.js.map