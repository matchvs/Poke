/**
 *
 * @author
 *
 */
var EntityMgr = (function () {
    function EntityMgr() {
    }
    var d = __define,c=EntityMgr;p=c.prototype;
    d(EntityMgr, "Instance"
        ,function () {
            if (EntityMgr._instance == null) {
                EntityMgr._instance = new EntityMgr();
            }
            return EntityMgr._instance;
        }
    );
    EntityMgr._instance = null;
    return EntityMgr;
})();
egret.registerClass(EntityMgr,"EntityMgr");
