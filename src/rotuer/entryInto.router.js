// 使用中间件
const privateMiddles = require("../middles/entryInto.middle")

const Router = require("koa-router")

const route = new Router({ prefix: "/entry" });

route.get("/captcha",privateMiddles.createCaptchaMiddle)