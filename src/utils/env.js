const dotenv = require("dotenv");

// 获取到根目录.ENV文件中的参数
const result = dotenv.config().parsed;

const keys = Object.getOwnPropertyNames(result);

const ENV = {};

// 对对象中的参数获取，并且进行大写转化，导出
keys.forEach(item => {
    ENV[item.toUpperCase()] = result[item]
})

module.exports = ENV