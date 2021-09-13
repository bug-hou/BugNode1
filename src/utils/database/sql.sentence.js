const insertSql = {
    create_user: "insert into users(username,password,email) values(?,?,?)",
}

const updateSql = {
    update_user_avator: "update users set avator = ? where id = ?",
    update_user_webback: "update users set webbackimage = ? where id = ?",
    update_user_phoneback: "update users set phonebackimage = ? where id = ?"
}

const selectSql = {
    check_user: "select username,id from users where username = ? && password = ?",
    check_exist: "select id from users where username = ?",
    get_count: "select * from weather_district_id where province = ? && city = ?",
    get_citys: "select city from weather_district_id where province = ? GROUP BY city",
    get_province: "select province from weather_district_id group by province",
}

module.exports = {
    insertSql,
    updateSql,
    selectSql
}