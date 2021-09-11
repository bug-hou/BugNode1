const Router = require("koa-router");

const ENV = require("../utils/env")
const { addSuffix } = require("../utils/assistFun/file")
const publicMiddles = require("../middles/public.middle")

const multer = require("koa-multer");

// 上传头像图片
const avatorInfo = multer({
    dest: "./" + ENV.AVATOR_ADDRESS,
})
const avatorHandle = avatorInfo.single("avator");

// 上传背景图片
const webBackImage = multer({
    dest: "./" + ENV.WEB_BACK_IMAGE
})
const webBackHandle = webBackImage.single("webBack")

// 上传手机端背景图片
const phoneImage = multer({
    dest: "./" + ENV.PHONE_IMAGE
})
// 获取手机端壁纸
const phoneHandle = phoneImage.single("phoneBack")

const route = new Router({ prefix: "/image" });

// 头像接口
route.post("/avator", publicMiddles.parseToken, avatorHandle, async (ctx, next) => {
    const { filename, mimetype, size } = ctx.req.file;
    console.log(filename)
    addSuffix(filename, mimetype, ENV.AVATOR_ADDRESS);
    ctx.body = "上传成功"
})

// web端头像接口
route.post("/webback", webBackHandle, async (ctx, next) => {
    const { filename, mimetype, size } = ctx.req.file;
    addSuffix(filename, mimetype, ENV.WEB_BACK_IMAGE);
    ctx.body = "上传成功"
})

// 
route.post("/phoneback", phoneHandle, async (ctx, next) => {
    const { filename, mimetype, size } = ctx.req.file;
    addSuffix(filename, mimetype, ENV.PHONE_IMAGE);
    ctx.body = "上传成功"
})

module.exports = route;
