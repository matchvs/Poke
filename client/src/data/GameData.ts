module data {
    export class GameData {
        public static IsRobot_Offline:boolean=true;                      //是否单机
        public static IsInNative: boolean = false;                         //是否在原生中          //根据环境动态更改
        public static IsDebug:boolean=true;                                 // 不使用sdk登陆
        public static IsPrompt: boolean = true;                         //是否自动提示
        public static IsActivityKick:boolean=false;
        // 服务器地址
        public static SERVER_IP: string = "http://dmhd123.f3322.net:8009/getGateServer";//"http://127.0.0.1:8000/getGateServer" "http://dmhd123.f3322.net:8009/getGateServer";//"http://127.0.0.1:8000/getGateServer""http://dmhd123.f3322.net:8009/getGateServer";//"http://127.0.0.1:8000/getGateServer";
        public static SERVER_URL:string = "127.0.0.1:8001";

        //游戏类型
        public static GameFlag_offline:number = 0;                //单机
        public static GameFlag_Rapid:number = 1;                  //快速进入
        public static GameFlag_Activity:number = 2;               //比赛比赛flag=rapid
        public static GameFlag_Group:number = 3;                  //群,
        public static GameFlag_Challenge:string = "challenge";          //挑战排行榜
        public static GameFlag_Defender:string="defender";              //被挑战的人进入游戏标志


        //app传入值,玩家属性值
        public static token: string = "";
        public static flag: number = 0;
        public static userid:string = "";
        public static groupid:string = "";
        public static nickname:string = "";
        public static avatar:string = "";
        public static integral:number = 0;
        public static money:number = 0;
        public static playerGuid:number=0;
        public static IsAuto:boolean=false;

    }
}