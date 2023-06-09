
import type { Context, Next } from 'koa';
import ENV from '@/config/config.default';
import errorMsg, { ResponseMsg } from '@/constants/error.type';
import type { StateUser } from './type';

const { cartFormatError } = errorMsg;
const { JWT_SECRET } = ENV;

// 校驗
export const validator = (rules:{ [key: string]: any }) => {
    return (
        async (ctx: Context, next: Next) => {
            try {
                ctx.verifyParams(rules)
            } catch (error) {
                const msg: ResponseMsg = { ...cartFormatError };
                msg.result = error;
                return ctx.app.emit("error", msg, ctx)
            }

            await next();  // 交由下個中間件處理
        }
    );
};
