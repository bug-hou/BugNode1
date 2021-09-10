const ENV = require("./utils/env")
const createRoute = require("./rotuer/index")

// 以上为src中自定义的文件

const Koa = require("koa");

// 以上为通过npm下载的插件

// 用来解析post中的urlencode中的data
const parser = require("koa-bodyparser")

// 实例化一个app
const app = new Koa();

// 用来解析post请求的参数
app.use(parser())
// 动态对router中定义的路由进行实例化
createRoute.apply(app)


app.listen(ENV.APP_PORT, ENV.APP_HOSTNAME, () => {
    console.log("端口为" + ENV.APP_PORT + "的服务器开启成功")
})

