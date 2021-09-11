const Router = require("koa-router");

const privateMiddle = require("../middles/weather.middle");

const route = new Router({ prefix: "/weather" });

// 获取到城市列表
route.get("/provinces", privateMiddle.getProvinceList, endHandler);

// 获取省份对应的城市
route.get("/citys", privateMiddle.getCityList, endHandler);

// 获取市对应的县
route.get("/district", privateMiddle.getDistrictList, endHandler);

// 获取到天气信息
route.get("/data", privateMiddle.getWeatherInfo, endHandler);

function endHandler(ctx, next) {
  ctx.body = {
    data: ctx.result,
    success: true,
    info: "天气信息获取成功",
  };
}

module.exports = route;

