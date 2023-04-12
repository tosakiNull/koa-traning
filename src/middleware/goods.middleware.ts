import type { Context, Next } from 'koa';
import ErrorType from '@/constants/error.type';

type VerityErrors = {
    message: string;
    code: string;
    field: string;
};

type VerityErrorList = {
    code: string;
    errors: VerityErrors[];
    params: {
        [key: string]: any;
    };
};

const { goodsFormateError } = ErrorType;

export const validator = async (ctx: Context, next: Next) => {
    try {
        ctx.verifyParams({
            goods_name: { type: 'string', required: true },
            goods_price: { type: 'number', required: true },
            goods_num: { type: 'number', required: true },
            goods_img: { type:'string', required: true },
        });
    } catch (error: any | VerityErrorList) {
        console.error(error); // 下方包裝錯誤
        goodsFormateError.result = error?.errors[0];
        return ctx.app.emit('error', goodsFormateError, ctx);
    }

    await next();  // 交由下個中間件處理
};
