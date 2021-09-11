module.exports = {
    params_not_exits: {
        status: 401,
        info: "params not exist,参数不存在"
    },
    params_error: {
        status: 401,
        info: "params error,参数错误"
    },
    captcha_error: {
        status: 401,
        info: "captcha error,验证码错误"
    },
    username_not_exist: {
        status: 401,
        info: "username is not exist,用户名不存在"
    },
    username_exist: {
        status: 401,
        info: "username is exits,用户名存在"
    },
    verity_error: {
        status: 401,
        info: "params verity error,参数验证失败"
    },
    sql_sentence_error: {
        status: 401,
        info: "sql sentence error, sql语句错误"
    }
}