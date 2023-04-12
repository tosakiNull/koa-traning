
import jwt from 'jsonwebtoken';
import type { Context, Next } from 'koa';
import ENV from '@/config/config.default';
import errorMsg, { ResponseMsg } from '@/constants/error.type';
import type { StateUser } from './type';

const { InvalidGoodsId } = errorMsg;
const { JWT_SECRET } = ENV;

// 認證
export const validator = async (ctx: Context, next: Next) => {
    try {
        ctx.verifyParams({
            goods_id: 'number',
        })
    } catch (error) {
        const msg: ResponseMsg = { ...InvalidGoodsId };
        msg.result = error;
        return ctx.app.emit("error", msg, ctx)
    }

    await next();  // 交由下個中間件處理
};
