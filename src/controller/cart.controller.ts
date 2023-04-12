import dayjs from "dayjs";
import { Context } from 'koa';
import jwt from "jsonwebtoken";
import ENV from "@/config/config.default";
import CartService from "@/service/cart.service";
import ErrorType from "@/constants/error.type";

// const { JWT_SECRET } = ENV;
const { InvalidGoodsId } = ErrorType;
const { createOrUpdate, findCarts } = CartService;

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
}

export default new CartController();
