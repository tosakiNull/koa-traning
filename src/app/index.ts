import Koa from 'koa';
import KoaLogger from 'koa-logger';
import { koaBody } from 'koa-body';
import session from 'koa-session';
// import parameter from 'koa-parameter';
import path from 'path';
import router from '@/router/index';
import errorHandle from './errorHandle';
import sessionConfig from '@/plugins/session/session.config';

const parameter = require('koa-parameter');

// const views = require('koa-views');

const app = new Koa();
const logger = KoaLogger();

// // 靜態地址/template地址
const staticPath = path.join(__dirname, '../uploads');
// const viewsPath = path.join(__dirname, '../views');

app.use(logger);
app.use(parameter(app));
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: staticPath, // 這裡不要用相對路徑(../upload)因為對應的不是當前路徑而是process.cwd()
        keepExtensions: true,
    }
}));
app.use(session(sessionConfig, app));
app.use(require('koa-static')(staticPath));
// app.use(views(viewsPath, { extension: 'pug' }));
app.use(router.routes());
app.use(router.allowedMethods()); // 對不支持的http請求以501響應

// 監聽emit的錯誤事件
app.on('error', errorHandle);

export default app;


