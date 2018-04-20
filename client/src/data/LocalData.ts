module data {
    //本地存储数据
    export class LocalData {
        public SoundBG_Volume:number=1;
        public SoundMusic_Volume:number=1;
        public RecordObj:any={};

        public InitThis(obj:any)
        {
            for(var i in obj)
            {
                if(this.hasOwnProperty(i))
                {
                    this[i]=obj[i];
                }
            }
        }

        public Clone():any
        {
            var obj:any={};
            obj.SoundBG_Volume=this.SoundBG_Volume;
            obj.SoundMusic_Volume=this.SoundMusic_Volume;
            obj.RecordObj=this.RecordObj;
            return obj;
        }
    }
}