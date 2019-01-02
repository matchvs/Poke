/*
 * @Company: Matchvs
 * @Author: Ville
 * @Date: 2018-04-17 17:46:35
 * @LastEditors: Ville
 * @LastEditTime: 2018-12-21 16:37:21
 * @Version: Develop v3.7.5.+
 * @Description: Matchvs skd .d.ts define files for typescrip
 */

declare namespace MVS{

    /**
     * 设置帧同步异步回调参数结构
     */
    class MsSetFrameSyncNotify {
        public frameRate:number;
        public startIndex:number;
        public timestamp:string;
        public enableGS:number;
        public cacheFrameMS:number;
        constructor(frameRate:number, startIndex:number, timestamp:string,enableGS:number, cacheFrameMS:number);
    }

    /**
     * 创建房间的时候如果要设置房间为可观战，那么就要设置这个观战数据
     */
    class MsWatchSet{
        public cacheMS:number;   //缓存多久的数据
        public maxWatch:number; // 最大人数
        public delayMS:number;   //观看延迟多久后的数据
        public persistent:boolean; //是否持久缓存
        constructor(cacheMS:number,maxWatch:number,delayMS:number,persistent:boolean);
    }

    /**
     * 观战者信息
     */
    class MsLiveAudience{
        public userID:number;
        public profile:string;
        public enterTime:string;
        constructor(userID:number, profile:string, enterTime:string);
    }

    /**
     * 加入观战回调参数结构观战信息
     */
    class MsLiveWatchInfo{
        public roomID :string;                          //房间ID
        public startTS :string;                         //开始时间
        public delayMS :number;                         //延迟时间
        public cacheMS :number;                         //缓存时间
        public maxAudiences :number;                    //最大观战数
        public curAudiences :number;                    //当前观战数
        public peakAudiences :number;
        public lastAudiences :Array<MVS.MsLiveAudience>;    //观战者信息
        constructor(roomID:string,startTS:string,delayMS:number, cacheMS:number,maxAudiences:number,curAudiences:number,peakAudiences:number, lastAudiences:Array<MsLiveAudience>);
    }

    /**
     * 加入房间回调参数
     */
    class MsJoinWatchRoomRsp {
        public status :number;              //接口请求状态
        public roomStatus :number;          //当前房间状态
        public reserved :string;            //
        public wathchInfo :MVS.MsLiveWatchInfo; //观战者信息
        constructor(status:number, roomStatus:number, reserved:string, wathchInfo:MVS.MsLiveWatchInfo);
    }

    /**
     * 玩家退出房间回调
     */
    class MsExitLiveRoomNotify{
        public userID:number;
        public userProfile:string;
        constructor(userID:number, userProfile:string);
    }

    /**
     * 观战结束回调
     */
    class MsLiveOverNotify {
        public gameID:number;
        public roomID:string;
        constructor(gameID:number, roomID:string);
    }

    /**
     * 切换观战模式和游戏模式接口回调参数类型
     */
    class MsChangeRoleRsp{
        public status:number;
        //当前的模式  0-游戏模式，1-观战模式
        public targetRoomType:number;
        constructor(status:number, targetRoomType:number);
    }

    class MsCreateTeamInfo{
        public password:string;
        public capacity:number;
        public mode:number;
        public visibility:number;
        public userProfile:string;
        /**
         * Creates an instance of MsCreateTeamInfo.
         * @param {string} [password] 队伍密码
         * @param {number} [capacity] 队伍人数容量
         * @param {number} [mode] 模式-由开发者自己定义
         * @param {number} [visibility] 0-不可见 1-可见
         * @param {string} [userProfile] 用户自定义信息
         * @memberof MsCreateTeamInfo
         */
        constructor(password?:string, capacity?:number, mode?:number, visibility?:number, userProfile?:string);
    }

    class MsTeamMatchCond{
        public teamNum:number;
        public teamMemberNum:number;
        public timeout:number;
        public weight:number;
        public weightRange:number;
        public weightRule:number;
        public full:number;
        /**
         *Creates an instance of MsTeamMatchCond.
         * @param {number} [teamNum] 匹配的队伍数
         * @param {number} [teamMemberNum] 每个队伍的人数加满多少人
         * @param {number} [timeout] 匹配多久视为超时
         * @param {number} [weight] 匹配的权重值   比如：10
         * @param {number} [weightRange] 权重值范围 比如：5  则匹配范围是 5-15
         * @param {number} [weightRule] 权值匹配规则，默认 0-平均值
         * @param {number} [full] 是否人满匹配，0-人不满也可以匹配，1-人满匹配 (人不满匹配不到会超时报422错误码)
         * @memberof MsTeamMatchCond
         */
        constructor(teamNum?:number, teamMemberNum?: number, timeout?: number, weight?: number, weightRange?: number, weightRule?: number, full?:number);
    }

    class MsTeamMatchInfo{
        public roomName: string;
        public maxPlayer: number;
        public canWatch: number;
        public mode: number;
        public visibility: number;
        public roomProperty: string;
        public watchSet:MsWatchSet;
        public cond:MsTeamMatchCond;
        /**
         *Creates an instance of MsTeamMatchInfo.
         * @param {string} roomName 房间名称
         * @param {number} maxPlayer 最大人数，如果
         * @param {number} canWatch 是否打开观战 1-可以 2-不可以，配合 watchSet 参数使用
         * @param {number} mode 模式-由开发者自己定义
         * @param {number} visibility 0-不可见 1-可见
         * @param {string} roomProperty 自定义房间信息
         * @param {MsWatchSet} watchSet 观战信息， canWatch 为 1的时候有效
         * @param {MsTeamMatchCond} cond 队伍匹配参数设置
         * @memberof MsTeamMatchInfo
         */
        constructor(roomName: string, maxPlayer: number, canWatch: number, mode: number, visibility: number, roomProperty: string, watchSet: MsWatchSet, cond: MsTeamMatchCond);
    }

    class MsJoinTeamInfo{
        public teamID:string;
        public password:string;
        public userProfile:string;
        /**
         *Creates an instance of MsJoinTeamInfo.
         * @param {string} teamID      队伍ID号
         * @param {string} password    队伍密码
         * @param {string} userProfile 自定义队伍信息
         * @memberof MsJoinTeamInfo
         */
        constructor(teamID: string, password: string, userProfile: string);
    }
}


/**
 * 清除缓存信息
 * @constructor
 */
declare function LocalStore_Clear();

/**
 * 缓存数据到浏览器，以 key=value 的方式保存
 * @param {string} key  保存表达的键
 * @param {string} value 要保存的值
 * @constructor
 */
declare function LocalStore_Save(key:string,value:string);
/**
 * 日志默认是打开的，如果要要关闭 matchvs.sdk 的日志就需要调用 Matchvs.closeLog();
 * openLog 打开日志
 * closeLog 关闭日志
 */
declare class MatchvsLog{
    static openLog();
    static closeLog();
}

/**
 * 创建房间请求参数类型
 * @param {string} roomName 房间名称
 * @param {number} maxPlayer 房间的最大人数
 * @param {number} mode 房间模式，这个是开发者自己定义数值，自己控制
 * @param {number} canWatch 是否可以观战 设置  1-可以 2-不可以
 * @param {number} visibility
 * @param {string} roomProperty
 */
declare class MsCreateRoomInfo implements Object{
    public roomName:string;
    public maxPlayer:number;
    public mode:number;
    public canWatch:number;
    public visibility:number;
    public roomProperty:string;
    constructor(roomName:string,maxPlayer:number,mode:number, canWatch:number, visibility:number, roomProperty:string);
    toString();
}

/**
 * 创建房间回调接口参数类型，调用createRoomResponse时候使用的类型
 * @param {number} status 接口调用状态 200 成功
 * @param {string} roomID 房间ID
 * @param {number} owner  房主ID
 */
declare class MsCreateRoomRsp{
    public status:number;
    public roomID:string;
    public owner:number;
    constructor(status:number,roomID:string, owner:number)
}

/**
 * 禁止加入房间回调接口参数类型
 * @param {number} status 接口调用状态 200 成功
 * @param {string} cpProto 开发者自定义数据
 */
declare class MsJoinOverRsp{
    public status:number;
    public  cpProto:string;
    constructor(status:number, cpProto:string)
}

/**
 * 禁止加入房间异步通知参数类型
 * @param {string} roomID
 * @param {number} srcUserID 发起禁止加入房间的玩家ID
 * @param {string} cpProto 开发者自定义数据
 */
declare class MsJoinOverNotifyInfo{
    public roomID:string;
    public srcUserID:number;
    public cpProto :string;
    constructor(roomID:string, srcUserID:number, cpProto:string)
}

/**
 * 进入房间信息匹配参数类型
 * @param {number} maxPlayer    最大人数
 * @param {number} mode         房间模式，由cp自己定义
 * @param {number} canWatch     可观战人数 1-可以 2-不可以
 * @param tags                  实际为 object 使用属性匹配时定义的协议，为 key-value 对象{key:value,key:value}
 * @param {number} visibility   0-房间不可见，1-房间可见
 * @param {string} roomProperty 房间自定义属性值
 */
declare class MsMatchInfo{
    public maxPlayer:number;
    public mode:number;
    public canWatch:number;
    public tags:any;
    public visibility:number;
    public roomProperty:string
    constructor(maxPlayer:number, mode:number, canWatch:number, tags:any,visibility ?:number, roomProperty?:string)
}

/**
 *
 * @param {string} roomID 房间ID
 * @param roomProperty   房间属性，由开发者自定义
 * @param {number} owner 房主用户ID
 * @param {number} state 房间状态值，0-未知，1-开放 2-关闭
 */
declare class MsRoomInfo{
    public roomID:string;
    public roomProperty:any;
    public ownerId:number;
    public owner:number;
    public state:number;
    constructor(roomID:string, roomProperty:any, owner:number, state?:number)
}

/**
 * 房间用户信息
 * @param {number} userID 用户ID
 * @param {string} userProfile 用户属性值，开发者自定义信息，比如用户分数，头像等等
 */
declare class MsRoomUserInfo{
    public userId:number;
    public userID:number;
    public userProfile:string;
    constructor(userID:number,userProfile:string)
}

/**
 *
 * @param {number} maxPlayer    最大人数
 * @param {number} mode         房间模式，由cp自己定义
 * @param {number} canWatch     可观战 1-可以 2-不可以
 * @param {string} roomProperty 房间属性，开发者自定义数据，比如地图
 */
declare class MsRoomFilter{
    public maxPlayer:number;
    public mode:number;
    public canWatch:number;
    public roomProperty:string;
    constructor(maxPlayer:number,mode:number,canWatch:number, roomProperty:string)
}

/**
 * 获取房列表扩展接口请求参数类型,getRoomListEx 接口使用的类型，相比 MsRoomFilter 类型增加了
 * 更多的过滤信息
 * @param full  {number} 0-all 1-full 2-no full
 * @param state {number} 0-StateNil 1-StateOpen 2-StateClosed
 * @param sort  {number} 0-RoomSortNil 1-RoomSortCreateTime 2-SortPlayerNum 3-SortState
 * @param order {number} 0-SortAsc 1-SortDesc
 * @param pageNo {number} 0为第一页
 */
declare class MsRoomFilterEx{
    public maxPlayer:number;
    public mode:number;
    public canWatch:number;
    public roomProperty:string;
    public full:number;
    public state:number;
    public sort:number;
    public order:number;
    public pageNo:number;
    public pageSize:number;
    constructor(maxPlayer:number, mode:number, canWatch:number, roomProperty:string,
                full:number, state:number, sort:number, order:number, pageNo:number, pageSize:number)
}

/**
 * 获取房间详细信息回调接口数据类型
 * @param {number} status       接口请求状态 200-成功， 其他异常
 * @param {number} state        房间状态 0-StateNil 1-StateOpen 2-StateClosed
 * @param {number} maxPlayer    最大人数
 * @param {number} mode         开发者创建房间时的自定义 mode 数据
 * @param {number} canWatch     可观战人数 1-可以 2-不可以
 * @param {number} roomProperty 房间属性，开发者自定义数据，比如地图
 * @param {number} owner        房主ID
 * @param {number} createFlag   房间创建方式标记 0-未知 1-系统创建 2-玩家创建
 * @param {Array<MsRoomUserInfo>} userInfos 房间用户列表
 */
declare class MsGetRoomDetailRsp{
    public status:number;
    public state:number;
    public maxPlayer:number;
    public mode:number;
    public canWatch:number;
    public roomProperty:string;
    public owner:number;
    public createFlag:number;
    public userInfos:Array<MsRoomUserInfo>;
    public watchinfo: any;
    public brigades: Array<any>;
    constructor(status:number, state:number, maxPlayer:number, mode:number, canWatch:number,
                roomProperty:number, owner:number, createFlag:number, userInfos:Array<MsRoomUserInfo>,
        watchinfo?:any, brigades?:Array<any>);
}

/**
 * 获取房间列表返回类型的子类型，房间信息类型，MsGetRoomListExRsp 类型中使用
 * @param {string} roomID       房间ID
 * @param {string} roomName     房间名称
 * @param {number} maxPlayer    房间可容纳最多人数
 * @param {number} gamePlayer   当前房间游戏人数
 * @param {number} watchPlayer  当前房间观战人数
 * @param {number} mode         创建房间时，开发者自己定义的 mode 数据
 * @param {number} canWatch     是否可观战 1-可以 2-不可以
 * @param {string} roomProperty 房间属性，开发者自定义数据，比如地图
 * @param {number} owner        房主ID
 * @param {number} state        房间状态 0-StateNil 1-StateOpen 2-StateClosed
 * @param {string} createTime   房间创建时间
 */
declare class MsRoomAttribute{
    public roomID:string;
    public roomName:string;
    public maxPlayer:number;
    public gamePlayer:number;
    public watchPlayer:number;
    public mode:number;
    public canWatch:number;
    public roomProperty:string;
    public owner:number;
    public state:number;
    public createTime:string;
    public watchSet:MVS.MsWatchSet;
    constructor(roomID:string, roomName:string, maxPlayer:number, gamePlayer:number, watchPlayer:number,
                mode:number, canWatch:number, roomProperty:string, owner:number, state:number, createTime:string, watchSet:MVS.MsWatchSet);
}

/**
 * 获取房间列表扩展回调接口参数类型
 * @param {number} status               接口请求状态 200-成功， 其他异常
 * @param {number} total                房间总数
 * @param {Array<MsRoomAttribute>} roomAttrs 房间列表信息
 */
declare class MsGetRoomListExRsp{
    public status:number;
    public total:number;
    public roomAttrs:Array<MsRoomAttribute>;
    constructor(status:number, total:number, roomAttrs:Array<MsRoomAttribute>);
}

/**
 * 注册用户返回信息
 * @param {number} status 接口状态值，注意：这里是 0-成功 其他失败，与别的接口不同
 * @param {number} userID 用户ID  这个和 id 字段是一样的，推荐使用userID 字段，id 将废弃
 * @param {string} token  验证标识，在用户登录的时候需要，token 会过期的
 * @param {string} name   系统随机分配的用户名称，不可以修改系统里的值，开发者要在游戏界面显示其他名称，直接替换就可以了
 * @param {string} avatar 系统随机分配的用户头像，不可以修改系统里的值，开发者可自己拿到值后替换
 */
declare class MsRegistRsp{
    public status:number;
    public id:number;
    public userID:number;
    public token:string;
    public name:string;
    public avatar:string;
    constructor(status:number,userID:number,token:string,name:string,avatar:string)
}

/**
 * 登录回调参数类型
 * @param status    接口请求状态 200-成功， 其他异常
 * @param roomID    房间ID，通常为0，如果有具体的房间ID，就可以调用reconnect接口重新连接到房间
 */
declare class MsLoginRsp{
    public status:number;
    public roomID:string;
    constructor(status,roomID)
}

/**
 * 网关服务连接回调参数类型
 * @param {number} gameID 游戏ID
 * @param {number} gsExist 暂时无用
 */
declare class MsHeartBeatResponse{
    public gameID:number;
    public gsExist:number;
    constructor(gameID:number, gsExist:number)
}

/**
 * 获取房间列表返回参数类型
 * @param {string} roomID       房间ID
 * @param {string} roomName     房间名称
 * @param {number} maxplayer    最多可容纳人数(创建房间时设置)
 * @param {number} mode         房间模式(创建房间时开发者自己定义)
 * @param {number} canWatch     可观战人数 1-可以 2-不可以
 * @param {string} roomProperty 房间属性值，开发者createRoom或者setRoomProperty接口修改
 */
declare class MsRoomInfoEx{
    public roomID:string;
    public roomName:string;
    public maxPlayer:number;
    public mode:number;
    public canWatch:number;
    public roomProperty:string;
    constructor(roomID:string, roomName:string,maxplayer:number,mode:number,canWatch:number,roomProperty:string);
}

/**
 * 离开房间回调参数类型
 * @param {number} status 接口调用状态 200-成功
 * @param {string} roomID 房间ID
 * @param {number} userID 用户ID
 * @param {string} cpProto 开发者自定义数据
 */
declare class MsLeaveRoomRsp{
    public status:number;
    public roomID:string;
    public userId:number;
    public userID:number;//新增
    public cpProto:string;
    constructor(status:number, roomID:string, userID:number, cpProto:string);
}


/**
 * 有人离开房间回调消息类型
 * @param {number} userID 离开房间者ID
 * @param {string} roomID 当前房间ID
 * @param {number} owner  当前房主ID
 * @param {string} cpProto 自定义数据
 */
declare class MsLeaveRoomNotify{
    public userId:number;
    public userID:number;
    public roomID:string;
    public owner:number;
    public cpProto:string;
    constructor(userID:number, roomID:string, owner:number, cpProto:string)
}

/**
 * 收到踢人消息回调类型
 * @param {number} userID       被踢者ID
 * @param {number} srcUserID    发起踢人的ID
 * @param {string} cpProto      开发者自定义数据
 * @param {number} owner        当前房间的房主ID
 */
declare class MsKickPlayerNotify{
    public userId:number;
    public userID:number;
    public srcUserId:number;
    public srcUserID:number;
    public cpProto:string;
    public owner:number;
    constructor(userID:number, srcUserID:number, cpProto:string, owner:number);
}


/**
 * 自己踢人回调类型
 * @param {number} status 踢人接口调用状态 200-成功
 * @param {number} owner  当前房间的房主
 * @param {number} userID 被踢者ID
 */
declare class MsKickPlayerRsp{
    public status:number;
    public owner:number;
    public userID:number;
    constructor(status:number, owner:number, userID:number);
}



/**
 * 消息组订阅回调
 * @param {number} status 接口调用状态 200-成功
 * @param {Array<number>} groups 订阅的组
 */
declare class MsSubscribeEventGroupRsp{
    public status:number;
    public groups:Array<number>;
    constructor(status:number, groups:Array<number>);
}



/**
 * 自己发送消息回调
 * @param {number} status 消息发送状态 200-成功
 * @param {number} sequence 消息事件序列号，与sendEvent 和 sendEventEx 返回的 sequence 对应
 */
declare class MsSendEventRsp{
    public status:number;
    public sequence:number;
    constructor(status:number, sequence:number);
}


/**
 * 收到其他玩家消息回调
 * @param {number} srcUserID 消息发送者用户ID
 * @param {string} cpProto 消息内容
 */
declare class MsSendEventNotify{
    public srcUserId:number;
    public srcUserID:number;
    public cpProto:string;
    constructor(srcUserID:number, cpProto:string);
}

/**
 * gameServer 消息通知回调
 * @param {number} srcUserID 默认为0
 * @param {string} cpProto 消息内容
 */
declare class MsGameServerNotifyInfo{
    public srcUserID:number;
    public srcUserId:number;
    public cpProto:string;
    constructor(srcUserID:number, cpProto:string);
}


/**
 * 订阅组消息接收回调
 * @param {number} srcUserID 消息发送者
 * @param {Array<string>} groups 消息组
 * @param {string} cpProto 开发者自定义数据
 */
declare class MsSendEventGroupNotify{
    public srcUid:number;
    public srcUserID:number;
    public groups:Array<string>;
    public cpProto:string;
    constructor(srcUserID:number, groups:Array<string>, cpProto:string);
}


/**
 * 检测房间异步回调，外部开发者不用关心
 * @param {number} userID
 * @param {Array<number>} checkins
 * @param {Array<number>} players
 * @param {number} maxPlayers
 */
declare class MsCheckInNotify{
    public userID:number;
    public checkins:Array<number>;
    public players:Array<number>;
    public maxPlayers:number;
    constructor(userID:number, checkins:Array<number>, players:Array<number>,maxPlayers:number);
}

/**
 * 使用Matchvs封装的 http回调类型
 */
declare class MatchvsNetWorkCallBack{
    constructor()
    onMsg(buf:string);
    onErr(errCode:number,errMsg:string);
}


/**
 * 暂时无用
 * @param {number} status
 * @param {number} seq
 */
declare class MsGatewaySpeedResponse{
    public status:number;
    public seq:number;
    constructor(status:number, seq:number)
}


/**
 * 设置帧同步回调
 * @param {number} status 状态值 200-成功
 */
declare class MsSetChannelFrameSyncRsp{
    public status:number;
    constructor(status:number)
}


/**
 * 发送帧回调数据类型
 * @param {number} mStatus 状态值 200-成功
 */
declare class MsSendFrameEventRsp{
    public mStatus:number;
    constructor(mStatus:number)
}


/**
 * 帧信息类型
 * @param {number} srcUserID 发送帧信息用户ID
 * @param {string} cpProto   开发者自定义数据
 * @param {string} timestamp 时间
 */
declare class MsFrameItem {
    public srcUserID:number;
    public cpProto:string;
    public timestamp:string;
    constructor(srcUserID:number,cpProto:string,timestamp:string)
}

/**
 * 同步帧数据类型
 * @param {number} frameIndex 当前帧号
 * @param {Array<MsFrameItem>} frameItems 当前帧信息
 * @param {number} frameWaitCount 等待的帧数量
 */
declare class MsFrameData{
    public frameIndex:number;
    public frameItems:Array<MsFrameItem>;
    public frameWaitCount:number;
    constructor(frameIndex:number,frameItems:Array<MsFrameItem>,frameWaitCount:number)
}

/**
 * 有其他用户网络状态回调
 * @param {number} state 1-网络异常，正在重连  2-重连成功 3-重连失败，退出房间
 * @param {string} roomID 房间号
 * @param {number} userID 用户ID
 * @param {number} state  用户状态 1-用户掉线  2-用户已经登录游戏，待定重连 3-用户离开房间了
 * @param {number} owner  当前房间房主ID
 */
declare class MsNetworkStateNotify{
    public roomID:string;
    public userID:number;
    public state:number;
    public owner:number;
    constructor(roomID:string, userID:number, state:number, owner:number);
}

/**
 * 设置房间属性回调返回类型
 * @param {number} status
 * @param {string} roomID
 * @param {number} userID
 * @param {string} roomProperty
 */
declare class MsSetRoomPropertyRspInfo{
    public status:number;
    public roomID:string;
    public userID:number;
    public roomProperty:string;
    constructor(status:number, roomID:string, userID:number, roomProperty:string)
}

/**
 * 设置房间属性异步回调返回类型
 * @param {string} roomID
 * @param {number} userID
 * @param {string} roomProperty
 */
declare class MsRoomPropertyNotifyInfo{
    public roomID:string;
    public userID:number;
    public roomProperty:string;
    constructor(roomID:string, userID:number, roomProperty:string)
}

/**
 * 自己打开房间回调类型
 * @param {number} status
 * @param {string} cpProto
 */
declare class MsReopenRoomResponse {
    public status  : number;
    public cpProto : string;

	constructor(status:number, cpProto:string)
}

/**
 * 收到打开房间回调类型
 * @param {string} roomID 房间ID
 * @param {number} userID 用户ID
 * @param {string} cpProto 开发者自定义数据类型
 */
declare class MsReopenRoomNotify{
    public roomID  : string;
    public userID  : number;
    public cpProto : string;

	constructor(roomID:string,userID:number, cpProto:string)
}

declare class MatchvsResponse {
    constructor();//构造函数

    /**
     * 初始化回调
     * @param {number} status 200-成功
     */
    initResponse(status:number);

    /**
     * 注册用户回调
     * @param {MsRegistRsp} userInfo
     */
    registerUserResponse(userInfo:MsRegistRsp);

    /**
     * 登录回调
     * @param {MsLoginRsp} login
     */
    loginResponse(login:MsLoginRsp);

    /**
     * 网关心跳回调
     * @param {MsHeartBeatResponse} rsp
     */
    heartBeatResponse(rsp:MsHeartBeatResponse);

    /**
     * 登出回调
     * @param {number} status
     */
    logoutResponse(status:number);

    /**
     * 手动创建房间
     * @param {MsCreateRoomRsp} rsp
     */
    createRoomResponse(rsp:MsCreateRoomRsp);

    /**
     * 获取房间列表信息，只可以获取手动创建的房间列表
     * @param {number} status 接口调用状态 200-成功 其他-异常
     * @param {Array<MsRoomInfoEx>} roomInfos
     */
    getRoomListResponse(status:number, roomInfos:Array<MsRoomInfoEx>);

    /**
     * 获取房间列表扩展接口回调
     * @param {MsGetRoomListExRsp} rsp
     */
    getRoomListExResponse(rsp:MsGetRoomListExRsp);

    /**
     * 获取房间详细信息回调
     * @param {MsGetRoomDetailRsp} rsp
     */
    getRoomDetailResponse(rsp:MsGetRoomDetailRsp);

    /**
     * 加入房间回调，包含随机加入房间，指定加入房间，tags加入房间
     * @param {number} status
     * @param {Array<MsRoomUserInfo>} roomUserInfoList
     * @param {MsRoomInfo} roomInfo
     */
    joinRoomResponse(status:number, roomUserInfoList:Array<MsRoomUserInfo>, roomInfo:MsRoomInfo);


    /**
     * 加入房间异步回调，其他人加入房间的时候，用户会收到该消息
     * @param {MsRoomUserInfo} roomUserInfo
     */
    joinRoomNotify(roomUserInfo:MsRoomUserInfo);

    /**
     * 禁止加入房间回调
     * @param {MsJoinOverRsp} rsp
     */
    joinOverResponse(rsp:MsJoinOverRsp);

    /**
     * 收到关闭房间消息，与joinOpenNotify相反
     * @param {MsJoinOverNotifyInfo} notifyInfo
     */
    joinOverNotify(notifyInfo:MsJoinOverNotifyInfo);

    /**
     * 自己离开房间回调
     * @param {MsLeaveRoomRsp} rsp
     */
    leaveRoomResponse(rsp:MsLeaveRoomRsp);

    /**
     * 收到别人离开房间异步回调
     * @param {MsLeaveRoomNotify} leaveRoomInfo
     */
    leaveRoomNotify(leaveRoomInfo:MsLeaveRoomNotify);

    /**
     * 自己踢人回调
     * @param {MsKickPlayerRsp} rsp
     */
    kickPlayerResponse(rsp:MsKickPlayerRsp);

    /**
     * 收到踢人的消息
     * @param {MsKickPlayerNotify} knotify
     */
    kickPlayerNotify(knotify:MsKickPlayerNotify);

    /**
     * 自己发送消息回调
     * @param {MsSendEventRsp} rsp
     */
    sendEventResponse(rsp:MsSendEventRsp);

    /**
     * 收到其他玩家发送的消息
     * @param {MsSendEventNotify} eventInfo
     */
    sendEventNotify(eventInfo:MsSendEventNotify);

    /**
     * 收到 来自gameService的消息回调，此时的 userID会为0
     * @param {MsGameServerNotifyInfo} eventInfo
     */
    gameServerNotify(eventInfo:MsGameServerNotifyInfo);

    /**
     *
     * @param {number} errCode
     * @param {string} errMsg
     */
    errorResponse(errCode:number, errMsg:string);

    /**
     * 暂时无用
     * @param {number} delay
     */
    networkDelay(delay:number);


    /**
     * 对方网络状态异步回调, 有其他用户出现了网络异常，就会通知到这个接口
     * @param {MsNetworkStateNotify} netnotify
     */
    networkStateNotify(netnotify:MsNetworkStateNotify);

    /**
     * 消息订阅回调
     * @param {number} status
     * @param {Array<string>} groups
     */
    subscribeEventGroupResponse(status:number, groups:Array<string>);


    /**
     * 分组消息发送回调
     * @param {number} status
     * @param {number} dstNum
     */
    sendEventGroupResponse(status:number, dstNum:number);

    /**
     * 分组消息发送异步回调
     * @param {number} srcUserID
     * @param {Array<string>} groups
     * @param {string} cpProto
     */
    sendEventGroupNotify(srcUserID:number, groups:Array<string>, cpProto:string);

    /**
     * 设置帧同步回调
     * @param {MsSetChannelFrameSyncRsp} rsp
     */
    setFrameSyncResponse(rsp:MsSetChannelFrameSyncRsp);

    /**
     * 设置帧同步异步回调
     * @param notify {MVS.MsSetFrameSyncNotify}
     */
    setFrameSyncNotify(notify:MVS.MsSetFrameSyncNotify);

    /**
     * 发送帧同步回调，目前没有是走
     * @param {MsSendFrameEventRsp} rsp
     */
    sendFrameEventResponse(rsp:MsSendFrameEventRsp);

    /**
     * 帧同步消息有玩家调用 sendFrameEvent 的时候，所有用户(包括自己)会收到这个回调
     * @param {MsFrameData} data
     */
    frameUpdate(data:MsFrameData);

    /**
     * 房间心跳回调
     * @param {number} data
     */
    hotelHeartBeatRsp(data:number);

    /**
     * 待定
     * @param {MsGatewaySpeedResponse} rsp
     */
    gatewaySpeedResponse(rsp:MsGatewaySpeedResponse);

    /**
     * 房间检测异步回调
     * @param {MsCheckInNotify} rsp
     */
    roomCheckInNotify(rsp:MsCheckInNotify);

    /**
     * 断开连接回调
     * @param {number} status
     */
    disConnectResponse(status:number);

    /**
     * 设置房间属性回调
     * @param {MsSetRoomPropertyRspInfo} rsp
     */
    setRoomPropertyResponse(rsp:MsSetRoomPropertyRspInfo);

    /**
     * 设置房间属性异步回调
     * @param {MsRoomPropertyNotifyInfo} notify
     */
    setRoomPropertyNotify(notify:MsRoomPropertyNotifyInfo);

    /**
     * 断线重连接口回调，接口参数与joinRoomResponse是一样的
     * @param {number} status
     * @param {Array<MsRoomUserInfo>} roomUserInfoList
     * @param {MsRoomInfo} roomInfo
     */
    reconnectResponse(status:number, roomUserInfoList:Array<MsRoomUserInfo>, roomInfo:MsRoomInfo);

	 /**
     * 允许房间加人的通知
     * @param {MsReopenRoomNotify} data
     */
	joinOpenNotify(data:MsReopenRoomNotify);

	 /**
     * 设置允许房间加人的结果
     * @param {MsReopenRoomResponse} data
     */
	joinOpenResponse(data:MsReopenRoomResponse);

    /**
     * 加入观战服务回调
     * @param rsp {MVS.MsJoinWatchRoomRsp} 状态值 200 表示成功，其他值请看官网错误码文档
     */
    joinWatchRoomResponse(rsp:MVS.MsJoinWatchRoomRsp):void

    /**
     * 加入观战服务异步回调
     * @param user
     */
    joinWatchRoomNotify(user:MsRoomUserInfo):void

    /**
     * 离开观战服务回调
     * @param status 接口调用状态值 200 表示成功
     */
    leaveWatchRoomResponse(status:number):void

    /**
     * 离开观战服务异步回调
     * @param user
     */
    leaveWatchRoomNotify(user:MVS.MsExitLiveRoomNotify):void

    /**
     *  获取房间列表回调
     * @param rooms 房间列表信息
     */
    getWatchRoomsResponse(rooms:MsGetRoomListExRsp):void

    /**
     * 设置观战开始位置回调
     * @param status 接口调用状态
     */
    setLiveOffsetResponse(status:number):void

    /**
     *
     * @param notify
     */
    liveOverNotify(notify:MVS.MsLiveOverNotify):void

    /**
     *
     * @param data
     */
    liveFrameUpdate(data:MsFrameData):void

    /**
     * 角色切换回调
     * @param status 接口调用状态
     */
    changeRoleResponse(status:MVS.MsChangeRoleRsp):void

    /**
     * 超时时间设置回调函数
     * @param {number} status 回调状态 200成功
     */
    setReconnectTimeoutResponse(status:number):void

    /**
     * 创建组队同步放回信息
     * @param {*} rps
     * @param {number} rps.status
     * @param {string} rps.teamID
     * @param {number} rps.owner
     * @memberof MatchvsResponse
     */
    createTeamResponse(rps:any):void

    /**
     * 加入队伍返回信息
     * @param {*} rsp
     * @param {*} rsp.team //队伍信息
     * @param {number} rsp.team.teamID 队伍号
     * @param {string} rsp.team.password 队伍验证信息
     * @param {number} rsp.team.capacity 队伍人数容量
     * @param {number} rsp.team.mode 模式-开发者自定义的值
     * @param {number} rsp.team.owner 队长
     * @param {number} rsp.status 加入队伍状态值
     * @param {Array<any>} rsp.userList [{userID:, userProfile:,}]
     * @memberof MatchvsResponse
     */
    joinTeamResponse(rsp:any):void

    /**
     * 加入队伍异步返回信息，有人加入队伍的时候，在队伍中的其他人会收到这个接口的通知
     * @param {*} rsp
     * @param {*} rsp.user 队伍中的用户
     * @param {number} rsp.user.userID 用户ID
     * @param {string} rsp.user.userProfile 加入队伍时，传入的自定义信息
     * @memberof MatchvsResponse
     */
    joinTeamNotify(rsp:any):void

    /**
     * 离开队伍回调信息
     * @param {*} rsp
     * @param {number} rsp.userID 离开者ID
     * @param {number} rsp.teamID 离开的队伍号
     * @param {number} rsp.status 状态值 200 成功
     * @memberof MatchvsResponse
     */
    leaveTeamResponse(rsp:any):void

    /**
     * 有人离开队伍，其他人收到的通知接口
     * @param {*} rsp
     * @param {number} rsp.teamID 离开的队伍
     * @param {number} rsp.userID 离开者
     * @param {number} rsp.owner 队长
     * @memberof MatchvsResponse
     */
    leaveTeamNotify(rsp:any):void

    /**
     * 队伍中发起匹配者会收到这个回调，表示正在匹配中
     * @param {*} rsp
     * @param {number} rsp.status 匹配状态
     * @memberof MatchvsResponse
     */
    teamMatchResponse(rsp:any):void

    /**
     * 发起匹配后，队伍中所有人都会收到匹配结果通知
     * @param {*} rsp
     * @param {number} rsp.status 配置的状态，200 成功，422 超时
     * @param {Array<any>} rsp.brigades 配置到队伍，大队伍列表信息
     * @param {number} rsp.brigades.brigadeID 大队伍ID号
     * @param {Array<any>} rsp.brigades.teamList 小队伍列表
     * @param {string} rsp.brigades.teamList.teamID 小队伍ID号
     * @param {number} rsp.brigades.teamList.capacity 小队伍容量
     * @param {number} rsp.brigades.teamList.mode 小队伍模式，开发者自定义数据
     * @param {number} rsp.brigades.teamList.owner 小队伍队长
     * @param {Array<any>} rsp.brigades.teamList.playerList 小队伍玩家列表
     * @param {number} rsp.brigades.teamList.playerList.userID 小队伍玩家ID
     * @param {string} rsp.brigades.teamList.playerList.userProfile 小队伍玩家自定义数据
     * @memberof MatchvsResponse
     */
    teamMatchResultNotify(rsp:any):void
    /**
     * 队伍中如果有人发起匹配，其他人会收到这个开启匹配的通知
     * @param {*} rsp
     * @param {*} rsp.teamID 队伍号
     * @param {*} rsp.userID 发起匹配者ID
     * @memberof MatchvsResponse
     */
    teamMatchStartNotify(rsp:any):void

    /**
     *
     * @param {number} rsp.status 状态值
     * @param {number} rsp.frameCount 帧数量
     * @param {number} rsp.msgCount 消息数量
     */
    getOffLineDataResponse(rsp:any);
}


/**
 * 引擎
 */
declare class MatchvsEngine {

    // public mChannel:string;
    // public mPlatform:string;
    // public mConfig:any;
    constructor();//构造函数

    /**
     * matchvs sdk 初始化，后续收到的回调是都是由该对象初始化的pResponse对象控制。
     * @param {MatchvsResponse} pResponse 这个参数需要保证全局唯一，避免在重定MatchvsResponse类型值时收不到 相关接口的
     *                                    Response，
     * @param {string} pChannel     默认填写 "Matchvs"
     * @param {string} pPlatform    有 release和alpha 两个值，对应两个不同环境。
     * @param {number} gameID       游戏ID，官网生成
     * @returns {number}
     */
    init(pResponse: MatchvsResponse, pChannel: string, pPlatform: string, gameID: number, pAppkey: string, pGameVersion: number): number

    /**
     * 用于独立部署的初始化接口，初始化，后续收到的回调是都是由该对象初始化的pResponse对象控制。
     * @param {MatchvsResponse} pResponse 这个参数需要保证全局唯一，避免在重定MatchvsResponse类型值时收不到 相关接口的
     * @param {string} endPoint matchvs 服务部署的地址 有端口就要加上端口号,例如：www.matchvs.com:12345
     * @param {number} gameID   独立部署配置的 游戏ID
     * @returns {number} 0-成功
     */
    premiseInit(pResponse: MatchvsResponse, endPoint:string, gameID:number, pAppkey: string): number

    /**
     * 登录
     * @param {number} pUserID 用户ID，该值必须使用 registerUser接口回调的用户ID
     * @param {string} pToken  用户验证字段，用于验证 userID
     * @param {number} pGameID      游戏ID，由 matchvs 官网生成
     * @param {number} pGameVersion 开发者自定义 默认 1
     * @param {string} pAppkey      游戏key 由 matchvs 官网生成
     * @param pDeviceID             用于区分 用户在不同设备登录情况，用户只能在一个设备登录，默认填1，如果允许一个设备登录就要开发者
     *                              自定义唯一值，或者获取 设备ID值
     * @returns {number}
     */
    login(pUserID: number, pToken: string, pDeviceID: string): number

    /**
     * 用户网关速度，暂时不用
     * @returns {number}
     */
    speed():number

    /**
     * 开发者调用此接口主动创建房间，房间参数由开发者自己定义。
     * @param {MsCreateRoomInfo} createRoomInfo 房间信息
     * @param {string} userProfile 附带数据，默认指定 ""
     * @param {MVS.MsWatchSet} watchSet 可选参数，指定房间观战参数
     * @returns {number}
     */
    createRoom(createRoomInfo:MsCreateRoomInfo, userProfile:string, watchSet?:MVS.MsWatchSet): number


    /**
     * 反初始化
     * @returns {number}
     */
    uninit():number

    /**
     * 获取房间列表信息, 推荐使用 getRoomListEx接口，此接口获取的信息较少
     * @param {MsRoomFilter} filter
     * @returns {number}
     */
    getRoomList(filter:MsRoomFilter):number

    /**
     * 获取房间列表扩展接口，该接口只能获取 createRoom 接口且 visibility=1 创建的房间，而且筛选值也只能使用与
     * createRoom 接口相同的值。
     * @param {MsRoomFilterEx} filter 获取房间列表的筛选值
     * @returns {number}
     */
    getRoomListEx(filter:MsRoomFilterEx):number

    /**
     * 获取房间详细信息
     * @param {string} roomID 房间ID
     * @returns {number}
     */
    getRoomDetail(roomID:string):number

    /**
     * 设置房间属性，调用 createRoom成功创建房间后，还可以使用此接口来重新改变房间的属性
     * 比如：修改房间的地图等等。
     * @param {string} roomID 房间ID
     * @param {string} roomProperty 开发者自定义的属性值
     * @returns {number}
     */
    setRoomProperty(roomID:string, roomProperty:string):number

    /**
     * 随机加入房间
     * @param {number} maxPlayer 房间能容纳的最多人数，该值最大不能超过20
     * @param {string} userProfile 加入房间附带消息，由用户自己定义，比如：头像，分数等
     * @returns {number}
     */
    joinRandomRoom(maxPlayer:number, userProfile:string):number

    /**
     * 属性加入房间，这个属性跟 createRoom 接口传入的属性是不同的，该接口是指，使用开发者自己定义不同的
     * 属性字段由服务器该属性的房间，调用该接口成功后，就在房间中啦；比如：选择不同的地图加入房间，地图相同的人就会加入到
     * 同一个房间。matchinfo 类型的 tags 是 {key=value,key1=value2} 类型，可以指定多个属性。
     * @param {MsMatchInfo} matchinfo 匹配属性规则类型
     * @param {string} userProfile 加入房间附带消息，由用户自己定义，比如：头像，分数等
     * @param {MVS.MsWatchSet} watchSet matchvsinfo 中的 canWatch设置为1(可观战),需要设置这个参数
     * @returns {number}
     */
    joinRoomWithProperties(matchinfo:MsMatchInfo, userProfile:string, watchSet?:MVS.MsWatchSet):number

    /**
     * 加入指定房间，通过rooID 加入到指定的房间
     * @param {string} roomID  要加入的房间ID
     * @param {string} userProfile 开发者自定义数据，可以比如：用户头像，分数等
     * @returns {number}
     */
    joinRoom(roomID:string,userProfile:string):number

    /**
     * 断线重连，断线后在20秒内可以直接调用这个接口再次加入房间，如果需要判断是否
     * 具备重连条件则可以先调用 login接口查看 loginResponse 的roomID参数是否不为 0
     * 如果不为0，就可以调用此接口重新连接到房间。
     * @returns {number}
     */
    reconnect():number;

    /**
     * 房间内任何人都可以调用禁止加入房间接口，具体的有开发者自己控制
     * @param {string} cpProto 禁止加入房间附带的数据
     * @returns {number}
     */
    joinOver(cpProto:string):number

    /**
     * 离开房间
     * @param {string} cpProto 离开房间附带的数据
     * @returns {number}
     */
    leaveRoom(cpProto:string):number

    /**
     * 踢人，房主内任何人都可以相互踢人，具体由谁踢人的逻辑由开发者自定义
     * @param {number} userID 被踢者用户ID
     * @param {string} cpProto 踢人附带的消息
     * @returns {number}
     */
    kickPlayer(userID:number, cpProto:string):number

    /**
     * 发送帧同步消息
     * @param {string} cpProto
     * @param {MVS.FrameOpt} op  0-只发送客户端 1-只发送GS 2-客户端和GS
     * @returns {number}
     */
    sendFrameEvent(cpProto:string, op?:number):number

    /**
     * 设置帧同步接口
     * frameRate ex:10/s . = 0 is off,>0 is on.
     * @param {number} frameRate
     * @param {number} enableGS 0-gs不参与帧同步 1-gs参与帧同步
     * @param {any} other 其他数据
     * @param {any} other.cacheFrameMS 其他数据
     * @returns {number}
     */
    setFrameSync(frameRate:number, enableGS?:number , other?:number):number


    /**
     * 注册用户
     * @returns {number} 0-接口调用成功
     */
    registerUser():number

    /**
     * 指定订阅的分组发送消息，玩家调用subscribeEventGroup组队成功后可以使用此接口相互发送消息，
     * 同一组队的玩家可以收到消息
     * @param {Array<string>} groups 要发送数据的分组
     * @param {string} data 要发送的数据
     * @returns {number} 1-失败 0-成功
     */
    sendEventGroup(groups:Array<string>, data:string):number

    /**
     * 订阅组，玩家可以使用此接口 进行组队，多个玩家订阅相同的组就可以相互发送消息，
     * @param {Array<string>} confirms  要创建的订阅组(加入组队)
     * @param {Array<string>} cancles   要取消的订阅组(退出组队)
     * @returns {number} 1-失败 0-成功
     */
    subscribeEventGroup(confirms:Array<string>, cancles:Array<string>):number

    /**
     * 发送消息的扩展，sequence 的用途和 sendEvent 返回的 sequence 相同
     * @param {number} msgType          0-包含destUids  1-排除destUids
     * @param {string} data             要发送的数据
     * @param {number} desttype         0-客户端+not CPS  1-not客户端+ CPS   2-客户端 + CPS
     * @param {Array<number>} userIDs   玩家ID集合 [1,2,3,4,5]
     * @returns {{sequence: number, result: number}}
     */
    sendEventEx(msgType:number, data:string, desttype:number, userIDs:Array<number>):any

    /**
     * 发送消息，retuen 值 sequence 与接口回调 sendEventResponse 收到的 sequence 对应
     * 网络消息传递存在延时，不确定 sendEventResponse 是再哪一次 sendEvent 发送的，通过 sequence 确定。
     * @param {string} data 要发送的数据
     * @returns {{sequence: number, result: number}}
     */
    sendEvent(data:string):any

    /**
     * 退出登录
     * @param {number} cpProto 开发者自定义数据
     * @returns {number}
     */
    logout(cpProto:string):number

	/**
     * 设置允许房间加人，与 joinOver 对应
     * @param {number} cpProto 开发者自定义数据
     * @returns {number}
     */
    joinOpen(cpProto:string):number

    /**
     * 加入观战房间
     * @param roomID 房间号
     * @param userProfile 自定义数据
     */
    joinWatchRoom(roomID:string, userProfile:string):number

    /**
     * 离开观战房间
     * @param cpProto 自定义数据
     */
    leaveWatchRoom(cpProto:string):number

    /**
     * 打开观战，设置从哪个时间段开始接收数据
     * @param offsetMS {number} -1 表示从头， 0 表示不追 >0 表示最近多少ms
     */
    setLiveOffset(offsetMS:number):number

    /**
     * 获取观战房间列表
     * @param filter 获取观战列表的过滤条件与 getRoomListEx 接口类似
     */
    getWatchRoomList(filter:MsRoomFilterEx):number

    /**
     * 玩家与观战者的角色转换
     * @param userProfile 附加信息
     * @param rType 0-切换到游戏模式，1-切换到观战模式 如果返回 -30 表示你当前模式与切换模式相同
     */
    changeRole(userProfile:string, rType:number):number

    /**
     * 断线后重连超时时间设置
     * @param {number} timeout 时间以秒为单位
     */
    setReconnectTimeout(timeout:number):number

    /**
     * 创建组队
     * @param {MVS.MsCreateTeamInfo} teaminfo
     * @returns {number}
     * @memberof MatchvsEngine
     */
    createTeam(teaminfo: MVS.MsCreateTeamInfo):number

    /**
     * 加入组队队伍，队伍必须是由 createTeam 接口创建的
     * @param {MVS.MsJoinTeamInfo} teaminfo
     * @returns {number}
     * @memberof MatchvsEngine
     */
    joinTeam(teaminfo:MVS.MsJoinTeamInfo):number

    /**
     * 离开组队队伍
     * @returns {number}
     * @memberof MatchvsEngine
     */
    leaveTeam():number

    /**
     * 加入的队伍之后，可以由队伍中的任何一个人发起队伍匹配
     * @param {MVS.MsTeamMatchInfo} matchInfo
     * @returns {number}
     * @memberof MatchvsEngine
     */
    teamMatch(matchInfo:MVS.MsTeamMatchInfo):number

    /**
     * 获取断线期间的帧数据，只有开启的帧同步功能才能有效
     * @param cacheFrameMS
     */
    getOffLineData(cacheFrameMS:number):number
}

declare class md5 {
	 constructor();//构造函数
	/**
	*
	*/
	hex_md5 (s:string) :string
}

declare class MatchvsHttp {
	constructor(callBack);//构造函数
	get(url);
}
