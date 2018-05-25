# gs-server for Poke



gameServer 代码发布需要修改 GameData Conf 接口中 DATA_STORAGE_ENV 值，0  alpha 环境，1release环境。

#### gameServer 通信协议

协议公用结构：

```javascript
//请求结构
var event ={
    action:0,
    data:{
        //这里根据业务定义
    },
}
//响应结构
var event = {
    action:0,
    status:0, //0成功 1，失败
    data:{
    	//根据业务定义
	}
}
```



协议命令：

```javascript
MSG_EVENT:{
        READY:113,                  //准备游戏
        RESET_ROOM:140,             //重置房间
        TURN_CALL_LAND:179,         //轮流叫地主
        REPROT_SCORE:181,			//上报分数
        CLEAR_SCROE:183,			//清理分数
    },

    RSP_EVENT:{
        SEND_CARD:177,              //发牌
        NEXT_CALL_LAND:178,         //下一个叫地主
        LAND_CALL_OVER:180,         //结束叫地主
        REPROT_RESULT:182,          //上报分数
        RESET_OK:141,               //重置OK
    }
```

- 准备游戏：data 里面数据

```javascript
//请求结构
var event ={
    action:113,
    data:{
        //不限制
    },
}
//响应结构
var event = {
    action:177,
    status:0, //0成功 1，失败
    data:{
    	userCards: [ //用户牌列表
            {
              userID: 84667,//用户
              card: [牌]
            }
          ],
          lanownList: [底牌],
          callOwner: 84539 //第一个叫地主的人
	}
}
```

- 重置房间

```javascript
//请求结构
var event ={
    action:140,
    data:{
        //不限制
    },
}

//响应结构
var event = {
    action:141,
    status:0, //0成功 1，失败
    data:{
    	userID: 85565
	}
}

```

- 上报分数

```javascript
//请求结构
var event ={
    action:181,
    data:{
        times:1, //倍数
        model:1, //1替换，2累加
        value:1	// 1 胜利，0 失败
    },
}

//响应结构
var event = {
    action:182,
    status:0, //0成功 1，失败
    data:{
        userID: 85565,
        rank: 1,//当前排名
        totleScore: 2760708 //总分数
	}
}
```

- 轮流叫地主

```javascript
//请求结构
var event ={
    action:179,
    data:{
        value:0, //
    },
}
//响应结构
var event = {
    action:178,//没有产生地主
    status:0, //0成功 1，失败
    data:{
        userID: 84539,
        nextUser:84535,
        value: 0
	}
}
var event = {
    action:180,//产生地主
    status:0, //0成功 1，失败
    data:{
        landOwner: 84539,
        landCards: [],
        value: 2
	}
}
```

#### 数据保存结构

全局数据通过 http接口保存和获取 http://vsopen.matchvs.com 接口详情看 [接口说明](http://www.matchvs.com/service?page=datasave)

保存数据：/wc5/setGameData.do?

获取数据：/wc5/getGameData.do?

删除数据：/wc5/delGameData.do?

- 排行榜数据保存：排行榜保存数据结构，排行榜保存 10 个人的数据。

```javascript
var data = {
    key:"rankList",
    value:[
        {key:userID,value:totleScore}
    ]
}
```

- 全局用户数据保存

```javascript
var userinfo = {
    key:userID,
    value:{
        rank:0,
        avator:"",
        nickname:"微信昵称",
        value:0,
    }
}
```

