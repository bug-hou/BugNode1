const Router = require("koa-router");

const privateMiddle = require("../middles/new.middle");

const route = new Router({ prefix: "/news" });

// 获取新闻的类型
route.get("/types", (ctx, next) => {
    ctx.type = "application/json"
    ctx.body = JSON.stringify(types);
});

route.get("/:type", privateMiddle.getNews);

route.get("/detail/:uniquekey", privateMiddle.getNewDetail);

module.exports = route;

var types = [
    { title: "top", name: "推荐" },
    {
        title: "guonei",
        name: "国内",
    },
    {
        title: "guoji",
        name: "国际",
    },
    {
        title: "yule",
        name: "娱乐",
    },
    {
        title: "tiyu",
        name: "体育",
    },
    {
        title: "junshi",
        name: "军事",
    },
    {
        title: "keji",
        name: "科技",
    },
    {
        title: "caijing",
        name: "财经",
    },
    {
        title: "shishang",
        name: "时尚",
    },
    {
        title: "youxi",
        name: "游戏",
    },
    {
        title: "qiche",
        name: "汽车",
    },
    {
        title: "jiankang",
        name: "健康",
    },
];
