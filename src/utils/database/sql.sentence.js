const insertSql = {
    create_user: "insert into users(username,password) values(?,?)"
}

const selectSql = {
    check_user: "select username,id from users where username = ? && password = ?",
    check_exist: "select id from users where username = ?"
}

module.exports = {
    insertSql,
    selectSql
}