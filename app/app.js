const apiInit = require('./api/initializer');
const config = require('config');

const responseTime = require('koa-response-time');
const Koa = require('koa');
const serve = require('koa-static');
const cors = require('koa-cors');
const body = require('koa-body');
//const body = require('koa-bodyparser');
//const body = require('koa-better-body');
const convert = require('koa-convert');
const websockify = require('koa-websocket');
const noCache = require('koa-no-cache');

let application = {
    port: (config.application.server.port || 5050),
    bind: (config.application.server.bind || '127.0.0.1')
}


let app = websockify(new Koa());
app.use(responseTime());


app.use(convert(serve('static', { defer: false })));
app.use(convert(cors({ origin: '*', allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'PATCH'] })));
app.use(body());



app.on('error', (err, ctx) => console.error('-----------------\n* Server error occured - error:\n', err, '\n* context:\n', ctx));
app.listen(application.port, application.bind, () => console.info('API Application Started', application));

app = apiInit(app);

module.exports = app;