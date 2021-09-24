const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const Router = require('koa-router')

let router = new Router()
const app = new Koa()

const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))

app
  .use(router.routes())
  .use(router.allowedMethods()); 


app.listen(6677)