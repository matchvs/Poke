var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
    Object.defineProperty(SoundMgr, "Instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new SoundMgr();
            }
            if (Config.IsHide) {
                this._instance.SetSoundVolume(0);
                this._instance.SetEffectVolume(0);
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundMgr.prototype, "SoundVolume", {
        get: function () {
            return this._soundVolume;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundMgr.prototype, "EffectVolume", {
        get: function () {
            return this._effectVolume;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *  设置总音量
     * @param sv 0到1
     * @constructor
     */
    SoundMgr.prototype.SetVolume = function (sv) {
        this.SetSoundVolume(sv);
        this.SetEffectVolume(sv);
    };
    /**
     *  设置背景音量
     * @param sv 0到1
     * @constructor
     */
    SoundMgr.prototype.SetSoundVolume = function (sv) {
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
    SoundMgr.prototype.SetEffectVolume = function (sv) {
        if (sv < 0.05) {
            sv = 0;
        }
        this._effectVolume = sv;
        LocalMgr.Instance.SetData(LocalMgr.SoundMusic_Volume, sv);
    };
    Object.defineProperty(SoundMgr.prototype, "SoundName", {
        get: function () {
            return this._curSound.name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *  播放背景音乐
     *  @param sd 音乐资源id,必须mp3格式
     *  @param sv loop 是否循环
     *  @param must 是否强制刷新
     * @constructor
     */
    SoundMgr.prototype.PlaySound = function (sd, loop) {
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
                //this._curSound.sound.close();
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
    SoundMgr.prototype.StopSound = function () {
        try {
            if (this._curSound) {
                this._curSound.channel.stop();
                //this._curSound.sound.close();
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
    SoundMgr.prototype.PlayEffect = function (sd, stopsound) {
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
            //if(stopsound)
            //{
            //    this._effStopSoundNum++;
            //    if(this._curSound)
            //    {
            //        this._curSound.channel.volume=0;
            //    }
            //    curSound.channel.addEventListener(egret.Event.SOUND_COMPLETE, function(){
            //        this._effStopSoundNum--;
            //        if(this._effStopSoundNum<=0&&this._curSound)
            //        {
            //            try {
            //                this._curSound.channel.volume = this._soundVolume;
            //            }
            //            catch(e)
            //            {
            //                trace("[ERROR]->soundMgr->PlayEffect->SOUND_COMPLETE")
            //            }
            //        }
            //    }, this);
            //}
        }
        catch (e) {
            trace("[ERROR]->soundMgr->PlayEffect");
        }
    };
    SoundMgr.prototype.getSound = function (mstr, loop) {
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
}());
__reflect(SoundMgr.prototype, "SoundMgr");
//# sourceMappingURL=SoundMgr.js.map