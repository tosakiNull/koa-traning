import { Op } from 'sequelize';
import CartModel from '@/model/cart.model';
import GoodsModel from '@/model/goods.model';

class CartService {
    async createOrUpdate(user_id: number, goods_id: number) {
        const res = await CartModel.findOne({
            where: {
                [Op.and]: { // user_id 與 goods_id 都符合
                    user_id,
                    goods_id,
                }
            },
        });

        if (res) {
            // 有購物車紀錄 number + 1
            await res.increment('number');
            return await res.reload(); // 更新取得紀錄
        } else {
            // 無購物車紀錄,建立
            return CartModel.create({
                user_id,
                goods_id,
            });
        }
    }

    async findCarts(pageNum: number, pageSize: number) {
        // 不用讓client發兩次request, 一次查完組裝
        const offset = (pageNum - 1) * pageSize;
        const { count, rows } = await CartModel.findAndCountAll({
            attributes: ['id', 'number', 'selected'], // 要拿取的列 attributes => field
            offset,
            limit: pageSize,
            include: { // 連表查詢-與cart.model內的belongsTo對應
                model: GoodsModel, // 引用foreignKey
                as: 'goods_info', // 設定別名
                attributes: ['id', 'goods_name', 'goods_price', 'goods_img'], // 要拿取的列
            },
        });

        return {
            pagination: {
                first_result: pageNum,
                max_results: pageSize,
                total: count,
            },
            ret: rows,
        }
    }

    async patchCarts(query: { id: string, number?: number, selected?: boolean}) {
        const { id, number, selected } = query;

        const res = await CartModel.findByPk(id);

        if (!res) return '';

        number !== undefined ? (res.number = number) : '';
        selected !== undefined ? (res.selected = selected) : '';

        return await res.save();
    }

    async deleteCart(ids: number[]) {
        console.log(ids);

        const res = await CartModel.destroy({
            where: {
                id: {
                    [Op.in]: ids,
                }
            }
        });

        return res;
    }

    async selectAllCarts(userId:number, all_selected: boolean = false) {
        return await CartModel.update(
            { selected: all_selected },
            { where: { user_id: userId } }
        )
    }
}

export default new CartService();
