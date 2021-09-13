const Router = require("koa-router");

const fs = require("fs")
const path = require("path")

const ENV = require("../utils/env");
const { paramsExist } = require("../utils/assistFun/paramsExist");
const myError = require("../utils/error")

const route = new Router({ prefix: "/show" });

route.get("/avator/:id", async (ctx, next) => {
    const { id } = ctx.params;
    if (!paramsExist(id)) {
        return ctx.app.emit("error", ctx, myError.params_not_exits)
    }
    const result = fs.createReadStream("./" + ENV.AVATOR_ADDRESS + "/" + id)
    const ext = id.split(".")[1]
    ctx.type = "image/" + ext;
    ctx.body = result;
})

route.get("/webback/:id", async (ctx, next) => {
    const { id } = ctx.params;
    if (!paramsExist(id)) {
        return ctx.app.emit("error", ctx, myError.params_not_exits)
    }
    const result = fs.createReadStream("./" + ENV.AVATOR_ADDRESS + "/" + id)
    const ext = id.split(".")[1]
    ctx.type = "image/" + ext;
    ctx.body = result;
})

route.get("/phoneback/:id", async (ctx, next) => {
    const { id } = ctx.params;
    if (!paramsExist(id)) {
        return ctx.app.emit("error", ctx, myError.params_not_exits)
    }
    const result = fs.createReadStream("./" + ENV.AVATOR_ADDRESS + "/" + id)
    const ext = id.split(".")[1]
    ctx.type = "image/" + ext;
    ctx.body = result;
})

module.exports = route;