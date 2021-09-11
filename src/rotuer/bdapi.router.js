const Router = require("koa-router");

const privateMiddle = require("../middles/bdapi.middle")

const route = new Router({ prefix: "/bdapi" });

route.get("/data", privateMiddle.getDataList)

module.exports = route;