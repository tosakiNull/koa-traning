import { Context } from 'koa';

interface Error {
    code: string;
}

export default (err: Error, ctx:Context):void => {
    let status:number  = 500;

    switch (err.code) {
        case '10001':
            status = 400;
            break;
        case '10002':
            status = 409;
            break;
        default:
            status = 500;
            break;
    }

    ctx.status = status;
    ctx.body = err;
};
