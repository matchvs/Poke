# gs-server for Poke



gameServer 代码发布需要修改 GameData Conf 接口中 DATA_STORAGE_ENV 值，0  alpha 环境，1release环境。

## 发牌

请求数据: action=113

```javascript
var event = {
    action:113 //事件码
};
```

当房间所有人都准了就会发牌。

返回数据：action=177

```json
{
  "action": 177, //事件码
  "userCards": [ //用户牌列表
    {
      "userID": 84667,//用户
      "card": [//牌
      ]
    }
  ],
  "lanownList": [//底牌
  ],
  "callOwner": 84539 //第一个叫地主的人
}
```



## 叫地主

请求数据:action=179

```javascript
var event = {
    action:179, //事件码
    score:3 	//分数
};
```

还没有产生地主时返回数据

```json
{
  "action": 178,
  "userID": 84539,
  "nextUser":84535,
  "score": 2
}
```



产生了地主后返回数据：

action=180

```json
{
  "action": 180,
  "landOwner": 84539,
  "landCards": [
  ],
  "score": 2
}
```



##  上报分数

请求数据：action = 181

```javascript
var event = {
    action:181,
    rankValue:1
};
```

返回数据：action = 182

```javascript
//返回status = 0 成功 1 失败
{ action: 182,
  userID: 85565,
  status: 0,
  rank: 1,//当前排名
  totleScore: 2760708 //总分数 
}
```



## 重置房间信息

请求数据：action:140

```javascript
var event = {
    action:140
};
```

返回信息：action = 141

```javascript
{ 
    action: 141, 
    userID: 85565, 
    status: 0 
}
```



