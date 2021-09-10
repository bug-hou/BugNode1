// 获取中间件
const privateMiddles = require("../middles/studentInfo.middle")

const Router = require("koa-router");

const route = new Router({ prefix: "/student" });

route.get("/capture", privateMiddles.getCapture);

route.post("/login", privateMiddles.verifyId, privateMiddles.getCourseInfo, privateMiddles.dataAnalyse);

route.post("/select/course", privateMiddles.selectCourse, privateMiddles.dataAnalyse);

module.exports = route