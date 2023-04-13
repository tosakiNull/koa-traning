import type { Context, Next } from 'koa';
import errorMsg, { ResponseMsg } from '@/constants/error.type';

const { addrFormatError } = errorMsg;

// 校驗
export const validator = (rules:{ [key: string]: any }) => {
    return (
        async (ctx: Context, next: Next) => {
            try {
                await ctx.verifyParams(rules)
            } catch (error) {
                const msg: ResponseMsg = { ...addrFormatError };
                msg.result = error;
                return ctx.app.emit("error", msg, ctx);
            }

            await next();  // 交由下個中間件處理
        }
    );
};
