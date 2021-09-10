const Crypto = require("crypto");

// 使用md5加密
function useMd5Crypto(code) {
    // 创建一个md5加密的对象
    const md5 = Crypto.createHash("md5");
    const md5Code = md5.update(code);
    return md5Code.digest("hex")
}

module.exports = {
    useMd5Crypto
}