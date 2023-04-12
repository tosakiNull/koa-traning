import dayjs from "dayjs";
import { Context } from 'koa';
import jwt from "jsonwebtoken";
import ENV from "@/config/config.default";
import UserService from "@/service/user.service";
import ErrorType from "@/constants/error.type";

const { JWT_SECRET } = ENV;
const { userRegisterError, passwordChangeError, userLoginError, getUserListError } = ErrorType;
const { createUser, getUserInfo, updateById, getAllUser } = UserService;

class UserController {
    async getUsers(ctx:Context) {
        try {
            const users = await getAllUser();

            ctx.body = {
                ret: users,
            };
        } catch(err) {
            console.error(err);
            ctx.app.emit('error', getUserListError, ctx);
        }

        // TODO: 欠分頁
    }

    async register(ctx:Context) {
        const { user_name, password } = ctx.request.body;

        try {
            const res = await createUser(user_name, password);

            ctx.body = {
                code: 0,
                message: "success",
                result: {
                    id: res.id,
                    user_name: res.user_name,
                },
            };
        } catch(err) {
            console.error(err);
            ctx.app.emit('error', userRegisterError, ctx);
        }
    }

    async login(ctx:Context) {
        const { user_name } = ctx.request.body;

        try {
            // 取得用戶訊息 payload 給 id, user_name, is_admin
            const { password, ...resUser} = await getUserInfo({ user_name });

            ctx.body = {
                code: 0,
                message: "success",
                result: {
                    token: jwt.sign(resUser, JWT_SECRET, { expiresIn: '1d' }), // 過期時間設一天
                },
            }
        } catch(err) {
            console.error('登入錯誤', err); // 寫log用
            ctx.app.emit('error', userLoginError, ctx);
            return;
        }
    }

    async password(ctx: Context) {
        // 取得當前登入用戶與修改密碼
        const { id } = ctx.state.user;
        const { password } = ctx.request.body;

        try {
            // 操作DB
            if (await updateById({ id, password })) {
                ctx.body = {
                    code: 0,
                    message: "修改密碼成功",
                    result: '',
                }

                return;
            }

            console.error('修改密碼失敗');
            ctx.app.emit('error', passwordChangeError, ctx);
        } catch (err) {
            console.error(err);
        }
    }
}

export default new UserController();
