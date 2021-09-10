// 获取定义在env中的参数
const ENV = require("../utils/env")
// 将对象转化为字符串
const { stringify } = require("querystring");
// 对课表数据数据进行处理
const { Statistic } = require("../utils/infoParse");
// 检验参数是否存在
const { paramsExist } = require("../utils/paramsExist")
// 获取错误信息
const ERROR = require("../utils/error")

// ---------------------------------- 

// 用来发送网络请求
const axios = require("axios");
// 对请求的文件从gbk编码转化为utf-8编码
const iconv = require("iconv-lite");

// 创建一个install请求实例
const install = axios.default.create({
    baseURL: ENV.JWXT_HOSTNAME,
    timeout: 5000,
});

// 得到验证码
const getCapture = async (ctx, next) => {
    // 访问教务系统首页获取到VIEWSTATE参数的值
    const defaultRes = await install.get("/default2.aspx");

    const viewStateReg = /(?<=name="__VIEWSTATE" value=").*?(?=")/;
    var result = viewStateReg.exec(defaultRes.data);

    if (!paramsExist(result[0])) {
        return ctx.app.emit("error", ctx, ERROR[0])
    }
    const [viewStateValue] = result;
    // 将viewStateValue值通过cookie传递给客户机
    ctx.cookies.set("viewStateValue", viewStateValue);

    // 获取教务系统的验证码
    const captureRes = await install.get("/CheckCode.aspx", {
        responseType: "arraybuffer",
    });
    // 获取验证码中的cookie值
    const session = /(?<=ASP.NET_SessionId=).*?(?=; path=\/)/.exec(
        captureRes.headers["set-cookie"][0]
    );
    // 验证是否获取成功
    if (!paramsExist(session[0])) {
        return ctx.app.emit("error", ctx, ERROR[0])
    }
    const [cookie] = session;
    // 将获取的cookie值发送到客户机
    ctx.cookies.set("ASP.NET_SessionId", cookie);
    // 设置响应体的类型和响应值
    ctx.type = "image/gif";
    ctx.body = captureRes.data;
};

// 验证传递的参数
const verifyId = async (ctx, next) => {
    // 获取学号，密码，验证码
    var { username, password, capture } = ctx.request.body;
    // 获取客户机中的viewStateValue的值
    var viewStateValue = ctx.cookies.get("viewStateValue");
    // 获取到客户机中验证码的cookie的值
    var sessionId = ctx.cookies.get("ASP.NET_SessionId");
    // 对参数进行验证
    if (!paramsExist(username, password, capture, viewStateValue, sessionId)) {
        return ctx.app.emit("error", ctx, ERROR[0]);
    }
    const response = await install.post(
        "/default2.aspx",
        stringify({
            __VIEWSTATE: viewStateValue,
            txtUserName: username,
            TextBox2: password,
            txtSecretCode: capture,
            Textbox1: "",
            RadioButtonList1: "(unable to decode value)",
            Button1: "",
            lbLanguage: "",
            hidPdrs: "",
            hidsc: "",
        }),
        {
            headers: {
                Cookie: "ASP.NET_SessionId=" + sessionId,
                "Content-Type": "application/x-www-form-urlencoded",
                Origin: "http://118.122.80.196:8088",
                Referer: "http://118.122.80.196:8088/default2.aspx",
            },
            responseType: "arraybuffer",
        }
    );
    const data = iconv.decode(response.data, "gbk");
    if (/(?<=id="xhxm">).*?(?=<\/span>)/.test(data.toString("utf-8")))
        await next();
    else {
        return ctx.app.emit("error", ctx, ERROR[1]);
    }
};

// 获取到课程信息
const getCourseInfo = async (ctx, next) => {
    const { username } = ctx.request.body;
    const sessionId = ctx.cookies.get("ASP.NET_SessionId");
    if (!paramsExist(username, sessionId)) {
        return ctx.app.emit("error", ctx, ERROR[0])
    }
    const response = await install.get(
        `/xskbcx.aspx?xh=${username}&gnmkdm=N121603`,
        {
            headers: {
                Referer: `http://118.122.80.196:8088/xskbcx.aspx?xh=${username}&gnmkdm=N121603`,
                Cookie: "ASP.NET_SessionId=" + sessionId,
            },
            responseType: "arraybuffer",
        }
    );
    const data = iconv.decode(response.data, "gbk");
    ctx.data = data.toString("utf-8");
    await next();
};

// 对数据进行分析
const dataAnalyse = async (ctx, next) => {
    // 对数据进行分析
    const coursesInfo = new Statistic(ctx.data);
    ctx.cookies.set("viewStateValue", coursesInfo.viewStateValue);
    // 
    ctx.type = "application/json";
    ctx.body = {
        userInfo: coursesInfo.userInfo,
        selectTime: coursesInfo.selectYearInfo,
        coursesInfo: coursesInfo.coursesArray,
    };
};

// 选取某年的课程表
const selectCourse = async (ctx, next) => {
    const { id, xnd, xqd } = ctx.request.body;
    var viewStateValue = ctx.cookies.get("viewStateValue");
    var sessionId = ctx.cookies.get("ASP.NET_SessionId");
    if (!paramsExist(id, xnd, xqd, sessionId, viewStateValue)) {
        return ctx.app.emit("error", ctx, ERROR[0]);
    }
    const response = await axios.default.post(
        `http://118.122.80.196:8088/xskbcx.aspx?xh=${id}&gnmkdm=N121603`,
        stringify({
            __EVENTTARGET: "xnd",
            __EVENTARGUMENT: "",
            __VIEWSTATE: viewStateValue,
            xnd,
            xqd,
        }),
        {
            headers: {
                Referer: `http://118.122.80.196:8088/xskbcx.aspx?xh=${id}&gnmkdm=N121603`,
                Cookie: "ASP.NET_SessionId=" + sessionId,
                "Content-Type": "application/x-www-form-urlencoded",
                Origin: "http://118.122.80.196:8088",
            },
            responseType: "arraybuffer",
        }
    );
    const data = iconv.decode(response.data, "gbk");
    ctx.data = data.toString("utf-8");
    next();
};

module.exports = {
    getCapture,
    verifyId,
    getCourseInfo,
    dataAnalyse,
    selectCourse,
};
