# simple-comment
基于vue3 + Vite + notion API简单开发的一个在线留言板

[**在线预览**](https://vite-comment.vercel.app/)

**技术栈：vue3 + vite + tailwindCss + koa + notion API **

## 数据关联

### 数据管理

Notion 使用了数据库的方式管理笔记，笔记之间可以建立链接，与关系型数据库的设计非常类似。Notion 的笔记集合相当于数据库中的表，每个笔记就是表中的一行，笔记的属性则为列,可以利用 Notion API 和 koa 来添加上后端接口

##### 创建应用集成

 打开https://www.notion.so/my-integrations，登录账号，创建一个应用集成，获取API的key

##### 数据库模型

在Notion中创建一个新的table,各列添加数据项

- user-->text类型，用户昵称
- avatar-->url类型，用户头像
- content-->text类型，内容
- replyTo & replies-->ReLation关系类型，选择关联的数据库
- time-->Created time，创建时间类型

## 部署流程

#### 部署

Vercel 对于我们个人使用来说，它是免费的，可以部署开发者的练习项目，关联git仓库可以实现实时更新部署

##### 封装函数计算版本

因为 Vercel 它是一个函数计算平台，那么它就不能让我们直接运行 koa 项目，所以需要封装一下，在项目根目录新建一个 `api`目录，所有的函数计算的函数都需要放在这个 `api`目录下边，直接把 koa的相关代码放到 `api` 目录下边入口文件为`index.js`

```js
//index.js
//注释启动服务的代码
//app.listen(xxx)
//添加导出模块app koa
module.exports = app;
```

在项目根目录下添加一个vercel的配置文件，`vercel.json`,写上重写规则

```json
//vercel.json
{
	"rewrites":[{
		"source":"/api/(.*)",//匹配所有以 /api 开头的 URL
        "destination":"/api"//重写到 /api这个路径下边
	}]
}
```

因为前端我们部署到 vercel 后，默认走的是前端路由，它会直接去 `dist`目录找有没有 `api`这个目录，以匹配 `/api` 路径，而 `dist`里边没有 `api`这个目录，所以需要把 `/api`转发到 vercel 的函数计算服务中，这样可以直接走到我们后台的 koa 这个函数计算的服务里边去，它就会处理 `/api`这个路径。 

##### 关联部署

在vercel上关联github仓库，选择部署的项目，即可完成部署访问页面
