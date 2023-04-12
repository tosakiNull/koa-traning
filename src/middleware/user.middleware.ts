import bcryptjs from 'bcryptjs';
import type { Context } from 'koa';
import UserService from "@/service/user.service";
import ErrorType from "@/constants/error.type";
import type { ValidatorUser } from './type';

const {
    userFormateError,
    userAlreadyExitedError,
    userRegisterError,
    userNotFoundError,
    userLoginError,
    invalidPassword,
} = ErrorType;
const { getUserInfo } = UserService;

export const userValidator = async (ctx: Context, next:Function) => {
    const { user_name, password } = ctx.request.body as ValidatorUser;

    ctx.state.a;

    // 合法判斷
    if (!user_name || !password) {
        console.error('用戶名/密碼為空', ctx.request.body); // 寫log用

        ctx.app.emit('error', userFormateError, ctx); // 將下方ctx.body 改用 ctx.app.emit 處理,由app的on統一處理
        // ctx.status = 400;
        // ctx.body = {
        //     code: '10001',
        //     message: '用戶名或密碼錯誤',
        //     result: '',
        // };

        return;
    }

    await next();  // 交由下個中間件處理
};

export const verifyUser = async (ctx: any, next:Function) => {
    const { user_name } = ctx.request.body;

    try {
        // 用戶是否存在
        const res = await getUserInfo({ user_name });

        if (res) {
            console.error('用戶已存在', { user_name }); // 寫log用
            ctx.app.emit('error', userAlreadyExitedError, ctx); // 將下方ctx.body 改用 ctx.app.emit 處理,由app的on統一處理
            return;
        }
    } catch(err) {
        console.error('註冊錯誤', err); // 寫log用
        ctx.app.emit('error', userRegisterError, ctx);
        return;
    }

    await next();  // 交由下個中間件處理
};

export const cryptPassword = async (ctx: any, next:Function) => {
    const { password } =  ctx.request.body;

    const salt = bcryptjs.genSaltSync(10); // 10次加鹽
    const hash = bcryptjs.hashSync(password, salt); // 保存秘文

    ctx.request.body.password = hash;

    await next();
};

export const verifyLogin = async (ctx: any, next:Function) => {
    const { user_name, password } = ctx.request.body;

    // 判斷用戶是否存在
    try {
        // 用戶是否存在
        const res = await getUserInfo({ user_name });

        if (!res) {
            console.error('用戶不存在', { user_name }); // 寫log用
            ctx.app.emit('error', userNotFoundError, ctx); // 將下方ctx.body 改用 ctx.app.emit 處理,由app的on統一處理
            return;
        }

        // 比對密碼
        if (!bcryptjs.compareSync(password, res.password)) {
            console.error('密碼錯誤', { user_name }); // 寫log用
            ctx.app.emit('error', invalidPassword, ctx);
            return;
        }
    } catch(err) {
        console.error('登入錯誤', err); // 寫log用
        ctx.app.emit('error', userLoginError, ctx);
        return;
    }

    await next();
};
