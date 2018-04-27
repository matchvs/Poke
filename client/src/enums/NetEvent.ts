/**
 * Created by Administrator on 2016/1/1.
 */
module enums
{
    //客户端专用网络事件
    export class NetEvent
    {
        public static NETEVENT_CONNECT="NETEVENT_CONNECT";          //socket连接成功
        public static NETEVENT_CLOSE="NETEVENT_CLOSE";              //socket关闭
        public static NETEVENT_ERROR="NETEVENT_ERROR";              //socket错误
        public static NETEVENT_PING="NETEVENT_PING";              //socket错误

        public static NETEVENT_LOGINSUCESS="NETEVENT_LOGINSUCESS";          //登陆成功
        public static NETEVENT_ROOMIN="NETEVENT_ROOMIN";                    //进入房间
        public static NETEVENT_OTHERPLAYERIN="NETEVENT_PLAYERIN";           //其他玩家进入房间
        public static NETEVENT_SENDCARD="NETEVENT_SENDCARD";                //系统发牌
        public static NETEVENT_TURNCALLLAND="NETEVENT_TURNCALLLAND";       //轮流叫地主
        public static NETEVENT_OTHERCALLLAND="NETEVENT_OTHERCALLLAND";       //其他玩家叫分
        public static NETEVENT_CALLLANDOVER="NETEVENT_CALLLANDOVER";       //其他玩家叫分
        public static NETEVENT_TURNPALY="NETEVENT_TURNPALY";                //主玩家出牌
        public static NETEVENT_SHOWPALY="NETEVENT_SHOWPALY";                //其他玩家出牌,
        public static NETEVENT_GAMEOVER="NETEVENT_GAMEOVER";                //游戏结束,
        public static NETEVENT_SENDCHAT="NETEVENT_SENDCHAT";                //聊天,
        public static NETEVENT_READY="NETEVENT_READY";                      //准备,
        public static NETEVENT_PLAYEROUT="NETEVENT_PLAYEROUT";             //玩家离开,
        public static NETEVENT_AUTO="NETEVENT_AUTO";                        //玩家托管,
        public static NETEVENT_ACTIVITYONLINE="NETEVENT_ACTIVITYONLINE";             //玩家活动人数提示,走马灯,
        public static NETEVENT_WAITACTIVITYEND="NETEVENT_WAITACTIVITYEND"; //活动打完等待活动结束
        public static NETEVENT_LOBBYIN="NETEVENT_LOBBYIN";                  //进入大厅
        public static NETEVENT_ADDFREEMONEY="NETEVENT_ADDFREEMONEY";        //送金币



        //Matchvs

        public static MATCHVS_CREATE_ROOM = "MATCHVS_CREATE_ROOM";  //创建房间
        public static MATCHVS_OTHERPLAYERIN = "MATCHVS_OTHERPLAYERIN";//其他玩家加入房间
        public static MATCHVS_SENDCARD = "MATCHVS_SENDCARD"; //发牌
    }
}

