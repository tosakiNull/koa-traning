import { Context } from 'koa';
import AddrService from "@/service/addr.service";
import ErrorType, { ResponseMsg } from "@/constants/error.type";

const { addrFormatError, getAddrError, updateAddrError, deleteAddrError } = ErrorType;
const { addAddr, getAddrList, updateAddr, removeAddr, updateDefAddr } = AddrService;

class CartController {
    async addAddr(ctx: Context) {
        const userId = ctx.state.user.id;
        const { consignee, phone, address } = ctx.request.body;

        try {
            const res = await addAddr({userId, consignee, phone, address });
            ctx.body = {
                code: 0,
                message: "添加地址成功",
                result: res,
            }
        } catch (err) {
            console.error(err);
            ctx.app.emit('error', addrFormatError, ctx);
        }
    }

    async getAddList(ctx: Context) {
        const userId = ctx.state.user.id;

        try {
            const res = await getAddrList(userId);
            ctx.body = {
                code: 0,
                message: "取得地址列表成功",
                result: res,
            }
        } catch (err) {
            console.error(err);
            ctx.app.emit('error', getAddrError, ctx);
        }
    }

    async updateAddr(ctx: Context) {
        const id = ctx.params.id;
        const { consignee, phone, address }  = ctx.request.body;

        try {
            const res = await updateAddr(id, { consignee, phone, address });
            ctx.body = {
                code: 0,
                message: "更新地址資訊成功",
                result: res,
            }
        } catch (err) {
            console.error(err);
            ctx.app.emit('error', updateAddrError, ctx);
        }
    }

    async deleteAddr(ctx: Context) {
        const id = ctx.params.id;

        try {
            const res = await removeAddr(id);
            ctx.body = {
                code: 0,
                message: "刪除地址成功",
                result: res,
            }
        } catch (err) {
            console.error("地址刪除失敗", err);
            ctx.app.emit('error', deleteAddrError, ctx);
        }
    }

    async updateDefAddr(ctx: Context) {
        // TODO: 需要判斷使用者、id 是否合法(ex: 不存在id, 不是這個用戶)
        const userId = ctx.state.user.id;
        const id = ctx.params.id;

        try {
            const res = await updateDefAddr(id, userId);
            ctx.body = {
                code: 0,
                message: "修改默認地址成功",
                result: res,
            }
        } catch (err) {
            console.error("修改默認地址失敗", err);
            ctx.app.emit('error', updateAddrError, ctx);
        }
    }
}

export default new CartController();
