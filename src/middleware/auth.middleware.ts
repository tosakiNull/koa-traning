
import jwt from 'jsonwebtoken';
import type { Context, Next } from 'koa';
import ENV from '@/config/config.default';
import errorMsg from '@/constants/error.type';
import type { StateUser } from './type';

const { tokenExpiredError, invalidTokenError, hasNoAdminPermissionError } = errorMsg;
const { JWT_SECRET } = ENV;

// 認證
export const auth = async (ctx: Context, next: Next) => {
    // 驗證是否登入(有登入才有token)
    const { authorization } = ctx.request.header;

    const token:string = authorization?.replace('Bearer ', '') || '';

    try {
        // 包含payload 訊息 { id, user_name, is_admin }
        const user = jwt.verify(token, JWT_SECRET) as StateUser;

        // 掛在ctx.state.user 上, 可全局拿到user
        ctx.state.user = user;
    } catch (err:any) {
        // 這裡印出 jwt 解析 toke時拋出的錯誤(可於jsonwebtoken查看拋出類型)
        // 僅先訂兩個
        switch(err.name) {
            case 'TokenExpiredError':
                console.error('token已過期');
                return ctx.app.emit('error', tokenExpiredError, ctx);
            case 'JsonWebTokenError':
                console.error('無效的token');
                return ctx.app.emit('error', invalidTokenError, ctx);
            default:
                console.error(err);
                break;
        }

        return;
    }

    await next();  // 交由下個中間件處理
};

// 授權
export const hasAdminPermission = async (ctx:Context, next:Next) => {
    const { is_admin } = ctx.state.user;

    if (!is_admin) {
        console.error(`無管理員權限 ${is_admin}`);
        return ctx.app.emit('error', hasNoAdminPermissionError, ctx);
    }

    await next();  // 交由下個中間件處理
};

// 處理session
export const checkSession = async (ctx: Context, next:Next) => {
    // 要存session id, ip

    await next();  // 交由下個中間件處理
};
