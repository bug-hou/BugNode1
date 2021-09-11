const connect = require("../utils/database/connect");
const sqlSentence = require("../utils/database/sql.sentence")

// 注册一个用户
const insertUsername = async (username, password) => {
    const [result] = await connect.execute(sqlSentence.insertSql.create_user, [username, password]);
    return result;
}

// 检验用户是否存在
const checkUsername = async (username) => {
    const [result] = await connect.execute(sqlSentence.selectSql.check_exist, [username]);
    return result
}

// 获取用户信息
const getUsername = async (username, password) => {
    const result = await connect.execute(sqlSentence.selectSql.check_user, [username, password]);
    return result[0];
}

module.exports = {
    insertUsername,
    checkUsername,
    getUsername
}