# 目录说明
### 目录作用说明
src：主文件
utils：用来写一些辅助工具
router：定义路由
middles：定义中间件
utils/key：存放公钥和私钥

### 文件说明
main：入口文件，用来开启服务器
##### rotuer文件下
index.js：导出一个函数，动态对每个路由进行实例化
studentInfo.router.js：用于学生获取课程表的信息
entryInto.router.js：登录路由
##### utils文件下
env.js：获取到.env中定义的参数(运用的插件:dotenv)
infoParse.js：对信息进行处理
paramsExist.js：检验参数是否存在
error.js：对所有错误信息做处理
connect.js：对数据库进行连接
##### middles文件下
studentInfo.middle.js：所有关于student路由的中间件

# 请求url说明
##### 学生课程表
1. /student/capture：获取验证码(get 无参)
2. /student/login：登录教务系统(post username,password,capture)
3. /student/select/course：自选某年的课程表


# 使用的插件
1. koa：开启服务器
2. koa-router：创建路由
3. koa-multer：解析post中的form-data参数(一般为文件上传)(通过ctx.req.body获取)
4. koa-bodyparser：解析post传递的参数(通过ctx.request.body获取)
5. dotenv：来解析根目录的.env文件获取文件中定义的参数
<!-- 对dotenv插件的简单使用进行说明 -->
1. 获取到.env文件
dotenv.config({
    **都有默认值**
    path:(.env文件路径，默认为根目录.env)
    encoding:(指定文件的字符集)
})
2. 获取对象值
dotenv.config().parsed:获取.env文件的属性
<!-- dotenv使用简绍完毕 -->
6. mysql2：连接mysql
7. svg-capatch：生成验证码
8. axios：发送网络请求