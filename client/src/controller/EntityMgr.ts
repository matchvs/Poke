/**
 *
 * @author
 *
 */
class EntityMgr {
    private static _instance:EntityMgr = null;

    public constructor() {
    }

    public static get Instance():EntityMgr {
        if (EntityMgr._instance == null) {
            EntityMgr._instance = new EntityMgr();
        }
        return EntityMgr._instance;
    }


}
