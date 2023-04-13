import dayjs from "dayjs";
import { Context } from 'koa';
import jwt from "jsonwebtoken";
import ENV from "@/config/config.default";
import CartService from "@/service/cart.service";
import ErrorType from "@/constants/error.type";

// const { JWT_SECRET } = ENV;
const { InvalidGoodsId, cartFormatError } = ErrorType;
const { createOrUpdate, findCarts, patchCarts, deleteCart, selectAllCarts } = CartService;

class CartController {
    async addCart(ctx: Context) {
        const userId = ctx.state.user.id;
        const goodsId = ctx.request.body.goods_id;

        // TODO: 要middleware判斷goods_id是否合法
        try {
            const res = await createOrUpdate(userId, goodsId);
            ctx.body = {
                code: 0,
                message: "添加購物車成功",
                result: res,
            }
        } catch (err) {
            console.error(err);
            ctx.app.emit('error', InvalidGoodsId, ctx);
        }
    }

    async cartList(ctx: Context) {
        const { page_number = 1, page_size = 10 } = ctx.request.query;
        const pageNumber = Number(page_number);
        const pageSize = Number(page_size);

        try {
            const res = await findCarts(pageNumber, pageSize);
            ctx.body = {
                code: 0,
                message: "取得購物車成功",
                result: res,
            }
        } catch (err) {
            console.error("購物車取得失敗");
            // ctx.app.emit('error', InvalidGoodsId, ctx);
        }
    }

    async updateCart(ctx:Context) {
        const { id } = ctx.params;
        const { number, selected } = ctx.request.body;

        if (number === undefined && selected === undefined) {
            console.error("格式錯誤 number && selected 未定義");
            const msg = { ...cartFormatError };
            msg.result = "格式錯誤 number 與 selected 至少需傳一項";
            return ctx.app.emit('error', msg, ctx);
        }

        try {
            const res = await patchCarts({ id, number, selected });
            ctx.body = {
                code: 0,
                message: "更新購物車成功",
                result: res,
            }
        } catch (err) {
            console.error("購物車更新失敗");
            ctx.app.emit('error', cartFormatError, ctx);
        }
    }

    async removeCart(ctx:Context) {
        const { ids } = ctx.request.body;

        try {
            const res = await deleteCart(ids);
            ctx.body = {
                code: 0,
                message: "刪除購物車成功",
                result: res,
            }
        } catch (err) {
            console.error("刪除購物車失敗");
            ctx.app.emit('error', cartFormatError, ctx);
        }
    }

    async selectAll (ctx:Context) {
        const { id: user_id } = ctx.state.user;
        const { all } = ctx.request.body;

        try {
            const res = await selectAllCarts(user_id, all);
            const text = all ? '選中' : '不選';

            ctx.body = {
                code: 0,
                message: `商品全部${text}`,
                result: res,
            }
        } catch (err) {
            console.error("商品全部選中失敗");
            ctx.app.emit('error', cartFormatError, ctx);
        }
    }
}

export default new CartController();
