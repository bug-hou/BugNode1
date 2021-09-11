const { paramsExist } = require("../utils/assistFun/paramsExist")
const myError = require("../utils/error")
const axios = require("axios");

const getDataList = async (ctx, next) => {
    const { data } = ctx.query;
    if (!paramsExist(data)) {
        return ctx.app.emit("error", ctx, myError.params_not_exits)
    }
    // 对中文格式进行转化
    function url_encode(url) {
        url = encodeURIComponent(url);
        url = url.replace(/\%3A/g, ":");
        url = url.replace(/\%2F/g, "/");
        url = url.replace(/\%3F/g, "?");
        url = url.replace(/\%3D/g, "=");
        url = url.replace(/\%26/g, "&");

        return url;
    }
    const dataList = await axios.default.get("http://www.baidu.com/sugrec?json=1&prod=pc&from=pc_web&wd=" + url_encode(data));

    ctx.body = dataList.data;
}


module.exports = {
    getDataList
}