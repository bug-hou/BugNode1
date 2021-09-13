const connection = require("../utils/database/connect");
const SQL = require("../utils/database/sql.sentence");

const insertAvator = async (avator, id) => {
    const [result] = await connection.execute(SQL.updateSql.update_user_avator, [avator, id]);
    return result
}

const insertWebBack = async (webback, id) => {
    const [result] = await connection.execute(SQL.updateSql.update_user_webback, [webback, id]);
    return result;
}

const insertPhoneBack = async (phoneBack, id) => {
    const [result] = await connection.execute(SQL.updateSql.update_user_phoneback, [phoneBack, id]);
    return result;
}

module.exports = {
    insertAvator,
    insertPhoneBack,
    insertWebBack
}

