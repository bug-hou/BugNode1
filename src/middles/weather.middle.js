const privateServer = require("../server/weather.server");
const myError = require("../utils/error");
const { paramsExist } = require("../utils/assistFun/paramsExist")
const axios = require("axios");
const ENV = require("../utils/env");

// 得到所有的省份
const getProvinceList = async (ctx, next) => {
    const result = await privateServer.getProvinceList();
    if (!paramsExist(result)) {
        return ctx.app.emit("error", ctx, myError.sql_sentence_error);
    }
    ctx.result = result;
    await next();
};

// 获取到省份对应的市
const getCityList = async (ctx, next) => {
    const province = ctx.query.province;
    if (!paramsExist(province)) {
        return ctx.app.emit("error", ctx, myError.params_not_exits);
    }
    const result = await privateServer.getCityList(province);
    if (!paramsExist(result)) {
        return ctx.app.emit("error", ctx, myError.sql_sentence_error);
    }
    ctx.result = result;
    next();
};

// 获取到对应的县
const getDistrictList = async (ctx, next) => {
    const { province, city } = ctx.query;
    if (!paramsExist(province, city)) {
        return ctx.app.emit("error", ctx, myError.params_not_exits);
    }
    const result = await privateServer.getDistrictList(province, city);
    if (!paramsExist(result)) {
        return ctx.app.emit("error", ctx, myError.sql_sentence_error);
    }
    ctx.result = result;
    next();
};
// 获取天气信息
const getWeatherInfo = async (ctx, next) => {
    const { cityId } = ctx.query;
    if (!cityId) {
        return ctx.app.emit("error", ctx, myError.params_error);
    }
    const result = await requestWeather(cityId);
    ctx.result = result.data;
    await next();
};


const requestWeather = async (cityId) => {
    const result = await axios.default.get(
        `http://api.map.baidu.com/weather/v1/?district_id=${cityId}&data_type=all&ak=${ENV.BAIDU_KEY}`,
    );
    return result;
};

module.exports = {
    getProvinceList,
    getCityList,
    getDistrictList,
    getWeatherInfo,
};
