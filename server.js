const Koa = require("koa")
const router = require("koa-router")()
const jsonp = require("koa-jsonp")
const { Client } = require("@notionhq/client")


const app = new Koa()

//使用中间件
app.use(jsonp())

require("./.env").config();

const NOTION_TOKEN = process.env.NOTION_TOKEN
const NOTION_DB_ID = process.env.NOTION_DB_ID
const NOTION_CURR_USER_ID = process.env.NOTION_CURR_USER_ID
console.log(NOTION_TOKEN)

const notion = new Client({
    auth: NOTION_TOKEN
})

router.get("/", function (ctx, next) {
    ctx.body = "hello koa2"
})

router.get("/new", function (ctx, next) {
    ctx.body = "hello new koa2"
})

app.use(router.routes())

app.listen(3001)