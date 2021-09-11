const SQL = require("../utils/database/sql.sentence")
const connection = require("../utils/database/connect")

// 对每个省份进行请求
const getProvinceList = async () => {
    const [result] = await connection.execute(SQL.selectSql.get_province, []);
    return result;
};

// 对每个省份的市进行请求
const getCityList = async (province) => {
    const [result] = await connection.execute(SQL.selectSql.get_citys, [
        province,
    ]);
    return result;
};

// 对市的每个县请求
const getDistrictList = async (province, city) => {
    const [result] = await connection.execute(SQL.selectSql.get_count, [
        province,
        city,
    ]);
    return result;
};

module.exports = {
    getCityList,
    getProvinceList,
    getDistrictList,
};
