// 使用中间件
const privateMiddles = require("../middles/entry.middle")


const Router = require("koa-router")

const route = new Router({ prefix: "/entry" });

// 获取验证码
route.get("/captcha", privateMiddles.createCaptchaMiddle);

// 登录
route.post("/login", privateMiddles.verityCaptcha, privateMiddles.verityUserExist, privateMiddles.createToken)

// 注册
route.post("/register", privateMiddles.verityRegisterParams, privateMiddles.createUserInfo)

// 发送验证码
route.post("/email", privateMiddles.verifyPamars, privateMiddles.sendEmail)


module.exports = route;