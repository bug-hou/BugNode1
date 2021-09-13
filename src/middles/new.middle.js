const ERROR = require("../utils/error");
const ENV = require("../utils/env")
const axios = require("axios")
const { paramsExist } = require("../utils/assistFun/paramsExist")

// 获取新闻的列表
const getNews = async (ctx, next) => {
    const type = ctx.params.type;
    const { page = 1, page_size = 30, is_filter = 1 } = ctx.query;
    if (!typelist.includes(type)) {
        return ctx.app.emit("error", ctx, ERROR.params_not_exits);
    }
    const result = await queryNews(type, page, page_size, is_filter);
    ctx.body = result
};

// 获取新闻的详情
const getNewDetail = async (ctx, next) => {
    const uniquekey = ctx.params.uniquekey;
    if (!paramsExist(uniquekey)) {
        return ctx.app.emit("error", ctx, ERROR.params_not_exits);
    }
    const result = await getNewsDetail(uniquekey);
    ctx.body = result
};

// 发送新闻列表详情
const queryNews = async (type, page = 1, page_size = 30, is_filter = 1) => {
    const result = await axios.default.get(
        `http://v.juhe.cn/toutiao/index?type=${type}&key=${ENV.JH_NEW_KEY}`,
        {
            params: {
                page,
                page_size,
                is_filter,
            },
            timeout: 5000,
        },
    );
    return result.data
};
// 发送新闻详情详情
const getNewsDetail = async (uniquekey) => {
    const result = await axios.default.get(
        `http://v.juhe.cn/toutiao/content?key=${ENV.JH_NEW_KEY}&uniquekey=${uniquekey}`,
    );
    return result.data
};


module.exports = {
    getNews,
    getNewDetail,
};

// 新闻标题总和
var typelist = [
    "top",
    "guonei",
    "guoji",
    "yule",
    "tiyu",
    "junshi",
    "keji",
    "caijing",
    "shishang",
    "youxi",
    "qiche",
    "jiankang",
];
