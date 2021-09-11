// 创建验证码
const createCaptcha = require("../utils/assistFun/captcha");
const useCaptcha = require("../utils/assistFun/encrype");
const paramsExist = require("../utils/assistFun/paramsExist");
const myError = require("../utils/error")
const privateServers = require("../server/entry.server")
const nodeMailer = require("nodemailer")
const util = require('util');

const createCaptchaMiddle = async (ctx, next) => {
    // 获取验证码信息对象
    const captcha = createCaptcha.createNumberCaptcha();
    // 获取验证码的值
    const code = captcha.text;
    // 对验证码的值进行加密
    console.log(code)
    const cryptoCode = useCaptcha.useMd5Crypto(code);
    // 将验证码通过cookie返回给前端
    ctx.cookies.set("captcha", cryptoCode);
    ctx.type = "image/svg";
    ctx.body = captcha.data;
}

// 验证验证码是否正确
const verityCaptcha = async (ctx, next) => {
    const { username, password, captcha } = ctx.request.body;
    const cryptoCode = ctx.cookies.get("captcha");
    // 对参数进行检验
    if (!paramsExist.paramsExist(username, password, captcha, cryptoCode)) {
        return ctx.app.emit("error", ctx, myError.params_not_exits)
    }
    // 对传入的code进行加密
    const code = useCaptcha.useMd5Crypto(captcha);

    // 验证验证码是否正确
    if (code !== cryptoCode) {
        return ctx.app.emit("error", ctx, myError.captcha_error)
    }

    ctx.username = username;
    ctx.password = password;

    await next();
}

// 验证用户是否存在
const verityUserExist = async (ctx, next) => {
    // 检验用户名是否存在
    const result = await privateServers.checkUsername(ctx.username);
    if (!result.length) {
        return ctx.app.emit("error", ctx, myError.username_not_exist)
    }
    await next()
}

// 生成token和验证码密码
const createToken = async (ctx, next) => {
    const result = await privateServers.getUsername(ctx.username, ctx.password);

    if (!result.length) {
        return ctx.app.emit("error", ctx, myError.verity_error)
    }
    const { id, username } = result[0];

    const token = await crypto.tokenEnCrypt({ id, username });

    ctx.body = {
        token
    }
}

// 验证参数
const verifyPamars = async (ctx, next) => {
    const { captcha } = ctx.request.body;
    const cryptoCode = ctx.cookies.get("captcha");
    // 对参数进行检验
    if (!paramsExist.paramsExist(captcha, cryptoCode)) {
        return ctx.app.emit("error", ctx, myError.params_not_exits)
    }
    // 对传入的code进行加密
    const code = useCaptcha.useMd5Crypto(captcha);

    // 验证验证码是否正确
    if (code !== cryptoCode) {
        return ctx.app.emit("error", ctx, myError.captcha_error)
    }
    // 验证码正确进入下一步
    await next();
}

// 发送电子邮箱
const sendEmail = async (ctx, next) => {
    // 获取到用户的邮件
    const { emailUser } = ctx.request.body;
    // 对参数进行检验
    if (!paramsExist.paramsExist(emailUser)) {
        return ctx.app.emit("error", ctx, myError.params_not_exits)
    }
    // 生成随机验证码
    let code = Math.floor(Math.random() * 900000 + 100000);

    await sendEmails(emailUser, code);
    console.log(code)
    const cryptoCode = useCaptcha.useMd5Crypto(code + "");
    ctx.cookies.set("emailCaptcha", cryptoCode)
    ctx.body = "获取成功"
}

// 验证码传递的参数和验证码
const verityRegisterParams = async (ctx, next) => {
    const { username, password, captcha } = ctx.request.body;
    const cryptoCode = ctx.cookies.get("emailCaptcha");
    // 对参数进行检验
    if (!paramsExist.paramsExist(username, password, captcha, cryptoCode)) {
        return ctx.app.emit("error", ctx, myError.params_not_exits)
    }
    // 对传入的code进行加密
    const code = useCaptcha.useMd5Crypto(captcha);
    // 验证验证码是否正确
    if (code !== cryptoCode) {
        return ctx.app.emit("error", ctx, myError.captcha_error)
    }

    ctx.username = username;
    ctx.password = password;

    await next();
}

// 创建一个用户信息
const createUserInfo = async (ctx, next) => {
    const checkResult = await privateServers.checkUsername(ctx.username);
    if (paramsExist.paramsExist(checkResult[0])) {
        return ctx.app.emit("error", ctx, myError.username_exist)
    }
    await privateServers.insertUsername(ctx.username, ctx.password);
    ctx.body = "创建成功"
}

// 封装的一个方法
const sendEmails = async (emailUser, code) => {
    let transporter = nodeMailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: "qq", // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: "2510596084@qq.com",
            // 这里密码不是qq密码，是你设置的smtp授权码，去qq邮箱后台开通、查看
            pass: "ogemlgjjssoieccd",
        },
    });
    let mailOptions = {
        from: "2510596084@qq.com", // sender address
        to: emailUser, // list of receivers
        subject:
            "欢迎注册origination起始页本次你的验证码为" +
            code +
            "验证码有效期为15分钟", // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: `<p>欢迎注册origination起始页本次你的验证码为${code}验证码有效期为15分钟<p/>`, // html body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false;
        }
        return info;
    });
};
module.exports = {
    createCaptchaMiddle,
    verityCaptcha,
    verityUserExist,
    createToken,
    verifyPamars,
    sendEmail,
    verityRegisterParams,
    createUserInfo
}