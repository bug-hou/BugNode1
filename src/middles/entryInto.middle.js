// 创建验证码
const createCaptcha = require("../utils/captcha");
const useCrypto = require("../utils/encrype");

const createCaptchaMiddle = async (ctx, next) => {
    // 获取验证码信息对象
    const captcha = createCaptcha.createNumberCaptcha();
    // 获取验证码的值
    const code = captcha.text;
    // 对验证码的值进行加密
    const cryptoCode = useCrypto.useMd5Crypto(code);
    // 将验证码通过cookie返回给前端
    ctx.cookies.set("captcha", cryptoCode);
    ctx.type = "image/svg";
    ctx.body = captcha.data;
}

module.exports = {
    createCaptchaMiddle
}