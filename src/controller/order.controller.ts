import { Context } from 'koa';
import OderService from "@/service/order.service";
import ErrorType, { ResponseMsg } from "@/constants/error.type";

const { addrOrderError } = ErrorType;
const { addOrder, getOrderList, updateOrder } = OderService;

class OrderController {
    async addOrder(ctx: Context) {
        const user_id = ctx.state.user.id;
        const { address_id, goods_info, total } = ctx.request.body;
        const order_number = 'ID_' + Date.now();

        try {
            const res = await addOrder({user_id, address_id, goods_info, total, order_number });
            ctx.body = {
                code: 0,
                message: "添加訂單成功",
                result: res,
            }
        } catch (err) {
            console.error(err);
            ctx.app.emit('error', addrOrderError, ctx);
        }
    }

    async getOrderList(ctx: Context) {
        const { page_num = 1, page_size = 10, status = 0 } = ctx.request.query;
        const pageNum = Number(page_num);
        const pageSize = Number(page_size);
        const nStatus = Number(status);

        try {
            const res = await getOrderList({ pageNum, pageSize, status: nStatus });
            ctx.body = {
                code: 0,
                message: "取得訂單列表成功",
                result: res,
            }
        } catch (err) {
            console.error(err);
            // ctx.app.emit('error', addrOrderError, ctx);
        }
    }

    async updateOrder(ctx: Context) {
        const id = ctx.params.id;
        const { status } = ctx.request.body;
        const nStatus = Number(status);

        try {
            const res = await updateOrder(id, nStatus);
            ctx.body = {
                code: 0,
                message: "更新訂單狀態成功",
                result: res,
            }
        } catch (err) {
            console.error(err);
            // ctx.app.emit('error', addrOrderError, ctx);
        }
    }
}

export default new OrderController();
