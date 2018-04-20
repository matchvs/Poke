/**
 * Created by yahu on 2015/7/31.
 */
var SoundMgr = (function () {
    function SoundMgr() {
        this._effStopSoundNum = 0; //关闭背景音的音效数量
        this._curSound = null;
        this._curEffect = null;
        this._soundVolume = 0;
        this._effectVolume = 0.5;
        this._soundDic = {};
        this._soundVolume = LocalMgr.Instance.GetData(LocalMgr.SoundBG_Volume);
        this._effectVolume = LocalMgr.Instance.GetData(LocalMgr.SoundMusic_Volume);
    }
    var d = __define,c=SoundMgr;p=c.prototype;
    d(SoundMgr, "Instance"
        ,function () {
            if (this._instance == null) {
                this._instance = new SoundMgr();
            }
            if (Config.IsHide) {
                this._instance.SetSoundVolume(0);
                this._instance.SetEffectVolume(0);
            }
            return this._instance;
        }
    );
    d(p, "SoundVolume"
        ,function () {
            return this._soundVolume;
        }
    );
    d(p, "EffectVolume"
        ,function () {
            return this._effectVolume;
        }
    );
    /**
     *  设置总音量
     * @param sv 0到1
     * @constructor
     */
    p.SetVolume = function (sv) {
        this.SetSoundVolume(sv);
        this.SetEffectVolume(sv);
    };
    /**
     *  设置背景音量
     * @param sv 0到1
     * @constructor
     */
    p.SetSoundVolume = function (sv) {
        if (sv < 0.05) {
            sv = 0;
        }
        try {
            this._soundVolume = sv;
            if (this._curSound) {
                this._curSound.channel.volume = sv;
            }
            LocalMgr.Instance.SetData(LocalMgr.SoundBG_Volume, sv);
        }
        catch (e) {
            trace("[ERROR]->soundMgr->SetSoundVolume");
        }
    };
    /**
     *  设置音效音量
     * @param sv 0到1
     * @constructor
     */
    p.SetEffectVolume = function (sv) {
        if (sv < 0.05) {
            sv = 0;
        }
        this._effectVolume = sv;
        LocalMgr.Instance.SetData(LocalMgr.SoundMusic_Volume, sv);
    };
    d(p, "SoundName"
        ,function () {
            return this._curSound.name;
        }
    );
    /**
     *  播放背景音乐
     *  @param sd 音乐资源id,必须mp3格式
     *  @param sv loop 是否循环
     *  @param must 是否强制刷新
     * @constructor
     */
    p.PlaySound = function (sd, loop) {
        if (loop === void 0) { loop = 0; }
        if (Config.IsHide)
            return;
        var curSound = this.getSound(sd, loop);
        if (curSound == null) {
            return;
        }
        try {
            if (this._curSound) {
                this._curSound.channel.volume = 0;
                this._curSound.channel.stop();
            }
            this._curSound = curSound;
            this._curSound.channel.volume = this._soundVolume;
        }
        catch (e) {
            trace("[ERROR]->soundMgr->PlaySound");
        }
    };
    /**
     * 停止播放背景音乐
     * @constructor
     */
    p.StopSound = function () {
        try {
            if (this._curSound) {
                this._curSound.channel.stop();
            }
        }
        catch (e) {
            trace("[ERROR]->soundMgr->StopSound");
        }
    };
    /**
     * 播放音效
     * @constructor
     */
    p.PlayEffect = function (sd, stopsound) {
        if (stopsound === void 0) { stopsound = false; }
        if (Config.IsHide)
            return;
        if (this._effectVolume <= 0) {
            return;
        }
        try {
            var curSound = this.getSound(sd, 1);
            if (curSound == null) {
                return;
            }
            curSound.channel.volume = this._effectVolume;
        }
        catch (e) {
            trace("[ERROR]->soundMgr->PlayEffect");
        }
    };
    p.getSound = function (mstr, loop) {
        //if(this._soundDic[mstr])
        //{
        //    var obj=this._soundDic[mstr]
        //    try
        //    {
        //        obj.channel = obj.sound.play(0, loop);
        //    }
        //    catch(e)
        //    {
        //        console.error(this._curSound+e);
        //        return null;
        //    }
        //    return obj;
        //}
        //else
        //{
        var curSound = RES.getRes(mstr);
        if (curSound == null) {
            return null;
        }
        var obj = {};
        try {
            var channel = curSound.play(0, loop);
        }
        catch (e) {
            console.error(this._curSound + e);
            return null;
        }
        obj.channel = channel;
        obj.sound = curSound;
        obj.name = mstr;
        //this._soundDic[mstr]=obj;
        return obj;
        //}
    };
    SoundMgr._instance = null;
    return SoundMgr;
})();
egret.registerClass(SoundMgr,"SoundMgr");
