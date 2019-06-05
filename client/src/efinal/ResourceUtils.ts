class ResourceUtils {
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    public static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();

        // 小心, RES.getRes(name)要是找不到,并不会报错
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 根据name关键字创建一个Bitmap对象。此name 是根据TexturePacker 组合成的一张位图
     */
    public static createBitmapFromSheet(name:string, sheetName:string = "gameRes"):egret.Bitmap {
        var sheet:egret.SpriteSheet = RES.getRes(sheetName);
        var texture:egret.Texture = sheet.getTexture(name);
        var result:egret.Bitmap = new egret.Bitmap();
        result.texture = texture;
        return result;
    }

    public static getTextureFromSheet(name:string, sheetName:string = "gameRes"):egret.Texture {
        var sheet:egret.SpriteSheet = RES.getRes(sheetName);
        var result:egret.Texture = sheet.getTexture(name);
        return result;
    }
}