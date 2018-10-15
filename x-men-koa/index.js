const Koa = require('koa')
const app = new Koa();
const route = require('koa-route')
const xMenService = require('./services/x-men-service')
const bodyParser = require('koa-body-parser')

app.use(bodyParser())
app.use(route.get('/xmen/', (ctx, next) => {
    if(ctx.query.name) {
        ctx.body = xMenService.getAllXmenFilteredByName(ctx.query.name)
    }
    else ctx.body = xMenService.getAllXmen()
}));

app.use(route.get('/xmen/:id', async (ctx, id, next) => {
    console.log(1)
    const start = Date.now()
    await next()
    console.log(3)
    const finished = Date.now() - start
    console.log(`Response time ${finished}`)
}))

app.use(route.get('/xmen/:id', (ctx, id)=> {
    console.log(2)
    const xMan = xMenService.getXMan(id)
    if(xMan)
        ctx.body = xMan;
    else return ctx.throw(`Could not find X-Man with id: ${id}`, 404)
}))

app.use(route.post('/xmen/', (ctx) => {
    const requestBody = ctx.request.body
    ctx.body = xMenService.addXMan(requestBody)
}))
app.listen(3000)