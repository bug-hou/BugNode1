const svgCaptcha = require("svg-captcha");

// 随机生成rgb颜色
function randomColor() {
    var str = "#";
    for (var i = 0; i < 6; i++) {
        str += Math.floor(Math.random() * 16).toString(16);
    }
    return str;
}

// 随机生成数字验证码
const createNumberCaptcha = () => {
    var codeConfig = {
        size: 6, // 验证码长度
        ignoreChars: "0o1i", // 验证码字符中排除 0o1i
        noise: Math.round(Math.random() * 3 + 3), // 干扰线条的数量
        height: 44,
        // background: randomColor(),
        color: true,
    };
    return svgCaptcha.create(codeConfig);
};

const createExpressCaptcha = () => {
    return svgCaptcha.createMathExpr({
        mathMin: 1,
        mathMax: 20,
        mathOperator: "+-",
        size: 4,
        noise: Math.round(Math.random() * 5 + 3),
        color: true,
        background: randomColor(),
        height: 44,
    });
};

module.exports = {
    createNumberCaptcha,
    createExpressCaptcha,
};
