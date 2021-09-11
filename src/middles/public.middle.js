const verify = require("../utils/assistFun/encrype")
const { paramsExist } = require("../utils/assistFun/paramsExist")
const myError = require("../utils/error")


// 验证用户是否登录
const parseToken = async (ctx, next) => {
    // 获取到登录token
    const authorization = ctx.headers.authorization;
    // 验证是否存在
    if (!paramsExist(authorization)) {
        return ctx.app.emit("error", ctx, myError.params_not_exits);
    }
    const token = authorization.replace("Bearer ", "");
    const user = verify.tokenDeCrypt(token);
    if (!user) {
        return ctx.app.emit("error", ctx, myError.params_not_exits);
    }
    ctx.user = user;
    await next();
};


module.exports = {
    parseToken
}