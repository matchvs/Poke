const axios         = require('axios');

class HttpRequest {
    constructor() {
    }

    /**
     * 
     * @param {string} url 请求的接口地址
     * @param {string} method 请求方式，包括 get, post, put, delete 等 restful 接口 method 字段
     * @param {object} args 请求参数
     * @param {Function} callback 请求回调
     */
    do(url, method, args, callback) {
        axios({
            method: method,
            url: url,
            data: method == 'get' ? {} : args,
            params: method == 'get' ? args : {},
            headers: { 'Content-Type': 'application/json' },
        }).then(function (response) {
            if (response.status != 200) {
                if (callback) {
                    callback && callback(null, { status: response.status, statusText: response.statusText });
                } else {
                    console.log("请求错误状态值：", status);
                }
                return;
            }
            if (callback) {
                callback(response.data, null);
            } else {
                console.log("请求成功：", JSON.stringify(response.data));
            }
        }).catch(function (error) {
            let err = {};
            if (error.response) {
                err = {
                    status: error.response.status,
                    statusText: error.response.statusText,
                }
            } else {
                err = {
                    status: 400,
                    statusText: error.message,
                }
            }
            if (callback) {
                callback(null, err)
            } else {
                console.log("请求错误:", error.stack);
            }
        });
    }

    /**
     * 组合 url 防止出现 host + path 出现两个 // 符号
     * @param {string} host 
     * @param  {...string} params 
     */
    static url_Join(host, ...params) {
        let p = "";
        params.forEach(a => {
            if (typeof a == "object") {
                throw 'the parameter can only be string ';
            }
            if (a.substring(0,1) == '/'){
                p = p + a;
            }else{
                p = p + '/' + a;
            }
        });
        if (host.substring(host.length - 1, host.length) == '/') {
            p = host.substring(0, host.length - 1) + p;
        } else {
            p = host + p;
        }
        return p;
    }
    /**
     * post 请求方式
     * @param {string} url 请求API地址
     * @param {Function} callback 请求回调 (res, err)=>{}
     */
    get(url, callback) {
        this.do(url, "get", {}, callback);
    }

    /**
     * post 请求方式
     * @param {string} url 请求API地址
     * @param {object} args 请求参数
     * @param {Function} callback 请求回调 (res, err)=>{}
     */
    post(url, args, callback) {
        console.log("创建排行榜：", url);
        this.do(url, 'post', args, callback);
    }

    /**
     * put 请求方式
     * @param {string} url 请求API地址
     * @param {object} args 请求参数
     * @param {Function} callback 请求回调 (res, err)=>{}
     */
    put(url, args, callback) {
        this.do(url, 'put', args, callback);
    }

    /**
     * put 请求方式
     * @param {string} url 请求API地址
     * @param {object} args 请求参数
     * @param {Function} callback 请求回调 (res, err)=>{}
     */
    delete(url, args, callback) {
        this.do(url, 'delete', args, callback);
    }
}

module.exports = HttpRequest;