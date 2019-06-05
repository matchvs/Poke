/**
 * Created by FCX on 3/14/2016.
 */
class SoundBase extends egret.DisplayObjectContainer {

    public constructor(url?: string) {
        super();
        if (url)
            this._soundURL = url;

        this._sound = new egret.Sound();
        this._loadSound();

    }

    private _sound: egret.Sound;

    private _soundURL: string = "bgSound";

    private _soundChannel: egret.SoundChannel;
    //默认播放位置，从头开始的
    private _positon: number = 0;
    //默认不循环，设置为负数循环
    private _loop: boolean = false;
    //当前状态0位空，1位播放，2位暂停, 3表示加载完成,4表示加载失败
    private _status: number = 0;
    //加载音频
    private _loadSound() {
        if (RES.getRes(this._soundURL)) {
            // 加载
            this._sound = RES.getRes(this._soundURL);
        } else {
            //如果RES中未加载该资源，尝试绝对路径加载之。
            this._sound.once(egret.Event.COMPLETE, this.loadComplete, this);
            this._sound.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);

            // 启动从指定 URL 加载外部音频文件的过程???
            // url在哪里?
            // 难道是对应的url???
            this._sound.load(this._soundURL);
        }
    }
    //加载音频完成
    private loadComplete(e: egret.Event) {
        this._status = 3;
        var waring: string = "加载完成";
        egret.log(waring);
        //删除加载失败的监听
        this._sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this)
        this.dispatchEventWith(egret.Event.COMPLETE, false, waring);
    }
    //加载音频失败
    private onLoadErr(e: egret.IOErrorEvent) {
        this._status = 4;
        var waring: string = "加载失败" + this._soundURL;
        egret.log(waring);
        //删除加载成功的监听
        this._sound.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, waring);
    }
    //设置url并重新加载
    public setUrl(url: string) {
        this._soundURL = url;
        this._loadSound();
    }
    //设置循环
    private looped(e: egret.Event) {
        // console.log("looped");
        this._soundChannel = null;
        this._positon = 0;
        this._status = 0;
        var waring: string = "播放完成";
        if (this._loop) {
            this.play();
        } else {
            this.dispatchEventWith(egret.Event.SOUND_COMPLETE, false, waring);
        }
    }
    //获取状态
    public getStatus() {
        return this._status;
    }
    //设置音量
    public setVolume(volume: number) {
        console.log(this._status);
        if (1 === this._status)
            this._soundChannel.volume = volume / 100;
    }
    //显示播放时间
    public showPosition(): number {

        if (1 === this._status)
            this._positon = this._soundChannel.position;
        return this._positon;
    }
    //播放音频
    public play() {
        try {
            if (4 === this._status) {
                this._loadSound();
                return;
            }
            this._status = 1;
            if (this._soundChannel)
                this._soundChannel.stop();

            this._soundChannel = this._sound.play(this._positon, 1);

            this._soundChannel.once(egret.Event.SOUND_COMPLETE, this.looped, this);
        } catch (error) {
            console.error(error);
        }
        return this._status;
    }
    //设置循环
    public setLoop(loop: boolean = false): boolean {
        this._loop = loop;

        return loop;
    }
    //设置暂停
    public pause() {
        var temp = this._status;
        if (1 === temp) {
            this._positon = this._soundChannel.position;
            this._soundChannel.stop();
            this._status = 2;
        }
        egret.log(this._positon);
        return temp;
    }
    //恢复
    public resume() {
        var temp = this._status;
        if (2 === temp) {
            this.play();

        }
        egret.log(this._positon);
        return temp;
    }
    //停止
    public stop() {
        this._status = 0;
        this._positon = 0;
        this._soundChannel.stop();
        this._soundChannel = null;
    }
}