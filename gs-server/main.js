const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const GS = require('gameserver-nodejs');
const App = require('./src/app');

const CONFIG_PATH = path.resolve(__dirname, './conf/config.json');

/**
 * gameServer入口
 * 读取配置文件，初始化日志，启动gameServer服务
 */
function main() {
    fs.readFile(CONFIG_PATH, function(err, data) {
        if (err) throw err;
        let conf = JSON.parse(data);
        log4js.configure(conf.log);

        let app = new App();
        let gs = new GS(conf.addr, app);
        let pushHander = gs.start();
        app.setPushHander(pushHander);
        
        const log = log4js.getLogger();
        log.info('Game server started, listen on:', conf.addr);
    });
}

main();
