const Crypto = require("crypto");
const fs = require("fs")
const jwt = require("jsonwebtoken")
const { resolve } = require("path")

// 使用md5加密
function useMd5Crypto(code) {
    // 创建一个md5加密的对象
    const md5 = Crypto.createHash("md5");
    const md5Code = md5.update(code);
    return md5Code.digest("hex")
}

const tokenEnCrypt = async (id, username) => {
    const privateKey = fs.readFileSync(resolve(__dirname, "../key/private.key"), { flag: "r", encoding: "utf-8" })
    const token = jwt.sign({ id, username }, privateKey, {
        expiresIn: 60 * 60 * 24 * 30,
        algorithm: "RS256",
    });
    console.log("我是token")
    console.log(token)
    return token;
};
const tokenDeCrypt = (token) => {
    const publicKey = fs.readFileSync(resolve(__dirname, "../key/public.key"), { flag: "r", encoding: "utf-8" });
    try {
        const user = jwt.verify(token, publicKey, {
            algorithms: ["RS256"],
        });
        return user;
    } catch (error) {
        return new Error(error);
    }
};
module.exports = {
    useMd5Crypto,
    tokenEnCrypt,
    tokenDeCrypt
}