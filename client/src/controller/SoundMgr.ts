/**
 * Created by yahu on 2015/7/31.
 */
class SoundMgr {
    private _effStopSoundNum:number=0;          //关闭背景音的音效数量

    private _curSound:any = null;
    private _curEffect:any = null;

    private _soundVolume:number = 0;
    private _effectVolume:number = 0.5;
    private _soundDic:any={};

    private static _instance:SoundMgr = null;
    public constructor()
    {
        this._soundVolume=LocalMgr.Instance.GetData(LocalMgr.SoundBG_Volume);
        this._effectVolume=LocalMgr.Instance.GetData(LocalMgr.SoundMusic_Volume);
    }

    public static get Instance():SoundMgr {
        if (this._instance == null) {
            this._instance = new SoundMgr();
        }
        if (Config.IsHide) {
            this._instance.SetSoundVolume(0);
            this._instance.SetEffectVolume(0);
        }
        return this._instance;
    }

    public get SoundVolume():number
    {
        return this._soundVolume;
    }

    public get EffectVolume():number
    {
        return this._effectVolume;
    }
    /**
     *  设置总音量
     * @param sv 0到1
     * @constructor
     */
    public SetVolume(sv:number):void {
        this.SetSoundVolume(sv);
        this.SetEffectVolume(sv);
    }

    /**
     *  设置背景音量
     * @param sv 0到1
     * @constructor
     */
    public SetSoundVolume(sv:number):void {
        if(sv<0.05)
        {
            sv=0;
        }
        try
        {
            this._soundVolume = sv;
            if(this._curSound)
            {
                this._curSound.channel.volume=sv;
            }
            LocalMgr.Instance.SetData(LocalMgr.SoundBG_Volume,sv);
        }
        catch(e)
        {
            trace("[ERROR]->soundMgr->SetSoundVolume")
        }
    }

    /**
     *  设置音效音量
     * @param sv 0到1
     * @constructor
     */
    public SetEffectVolume(sv:number):void {
        if(sv<0.05)
        {
            sv=0;
        }
        this._effectVolume = sv;
        LocalMgr.Instance.SetData(LocalMgr.SoundMusic_Volume,sv);
    }
    public get SoundName():string
    {
        return this._curSound.name;
    }
    /**
     *  播放背景音乐
     *  @param sd 音乐资源id,必须mp3格式
     *  @param sv loop 是否循环
     *  @param must 是否强制刷新
     * @constructor
     */
    public  PlaySound(sd:string, loop:number = 0):void {
        if (Config.IsHide)return;

        var curSound:any =this.getSound(sd,loop);
        if (curSound == null) {
            return;
        }

        try
        {
            if(this._curSound)
            {
                this._curSound.channel.volume=0;
                this._curSound.channel.stop();
                //this._curSound.sound.close();
            }
            this._curSound=curSound;
            this._curSound.channel.volume=this._soundVolume;
        }
        catch(e)
        {
            trace("[ERROR]->soundMgr->PlaySound")
        }


    }

    /**
     * 停止播放背景音乐
     * @constructor
     */
    public StopSound():void {
        try
        {
            if(this._curSound)
            {
                this._curSound.channel.stop();
                //this._curSound.sound.close();
            }
        }
        catch(e)
        {
            trace("[ERROR]->soundMgr->StopSound")
        }
    }

    /**
     * 播放音效
     * @constructor
     */
    public PlayEffect(sd:string,stopsound:boolean=false):void {
        if (Config.IsHide)return;
        if (this._effectVolume <= 0) {
            return;
        }
        try
        {
            var curSound:any =this.getSound(sd,1);
            if (curSound == null) {
                return;
            }
            curSound.channel.volume=this._effectVolume;
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
        catch(e)
        {
            trace("[ERROR]->soundMgr->PlayEffect")
        }
    }


    private getSound(mstr:string,loop:number):any
    {
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
            var curSound:egret.Sound = RES.getRes(mstr);
            if(curSound==null)
            {
                return null;
            }
            var obj:any={};
            try
            {
                var channel:egret.SoundChannel = curSound.play(0, loop);
            }
            catch(e)
            {
                console.error(this._curSound+e);
                return null;
            }
            obj.channel=channel;
            obj.sound=curSound;
            obj.name=mstr;
            //this._soundDic[mstr]=obj;
            return obj;
        //}
    }

}