# 目录说明

### 目录作用说明

src：主文件
utils：用来写一些辅助工具
router：定义路由
middles：定义中间件
utils/key：存放公钥和私钥
utils/assistFun：存放工具类函数
server：操作数据库

### 文件说明

main：入口文件，用来开启服务器

##### rotuer 文件下

index.js：导出一个函数，动态对每个路由进行实例化
studentInfo.router.js：用于学生获取课程表的信息
entryInto.router.js：登录路由
bdapi.router.js：使用百度相关的 api 接口

#### utils 文件下

env.js：获取到.env 中定义的参数(运用的插件:dotenv)
error.js：对所有错误信息做处理

##### utiles/database 文件下

connect.js：对数据库进行连接
sql.sentence.js：所有的 sql 语句

##### utils/assitFun 文件下

infoParse.js：对信息进行处理
paramsExist.js：检验参数是否存在
captcha.js：生成验证码
encrype.js：加密

##### middles 文件下

studentInfo.middle.js：所有关于 student 路由的中间件
entry.middle.js：所有关于注册和登录的中间件

# 请求 url 说明

##### 学生课程表

1. /student/capture：获取验证码(get 无参)
2. /student/login：登录教务系统(post username,password,capture)
3. /student/select/course：自选某年的课程表

##### 登录注册

1. /entry/login：登录(post username,password,captcha)
2. /entry/captcha：获取验证码(get 无参)
3. /entry/email：获取邮箱验证码(post captcha,email)
4. /entry/register：注册账号(post username,password,captcha)

##### 获取天气信息和城市信息

1. /weather/provinces：获取县(get)
2. /weather/citys?province=省份：获取市(get)
3. /weather/district?province=省&city=市：获取县(get)
4. /weather/data?cityId=510800：获取对应的天气信息(get)

##### 新闻

1. /news/:type：获取新闻(get)
2. /new/types：获取新闻列表(get)
3. /new/detail/:uniquekey：获取新闻详情信息(get)

# 使用的插件

1. koa：开启服务器
2. koa-router：创建路由
3. koa-multer：解析 post 中的 form-data 参数(一般为文件上传)(通过 ctx.req.body 获取)
4. koa-bodyparser：解析 post 传递的参数(通过 ctx.request.body 获取)
5. dotenv：来解析根目录的.env 文件获取文件中定义的参数
<!-- 对dotenv插件的简单使用进行说明 -->
6. 获取到.env 文件
   dotenv.config({
   **都有默认值**
   path:(.env 文件路径，默认为根目录.env)
   encoding:(指定文件的字符集)
   })
7. 获取对象值
dotenv.config().parsed:获取.env 文件的属性
<!-- dotenv使用简绍完毕 -->
8. mysql2：连接 mysql
9. svg-capatch：生成验证码
10. axios：发送网络请求
11. jsonwebtoken：对用户信息进行加密
