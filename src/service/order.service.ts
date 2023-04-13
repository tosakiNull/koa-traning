import { Op } from 'sequelize';
import OrderModel from '@/model/order.model';

type OrderAddParams = {
    user_id: number;
    address_id: number;
    goods_info: string;
    total: string;
    order_number: string;
}

type OrderGetQuery = {
    pageNum: number;
    pageSize: number;
    status: number;
}

class OrderService {
    async addOrder(params: OrderAddParams) {
        return await OrderModel.create(params);
    }

    async getOrderList(query: OrderGetQuery) {
        const { pageNum, pageSize, status } = query;
        const offset = (pageNum - 1) * pageSize;

        const { count, rows } = await OrderModel.findAndCountAll({
            attributes: ['goods_info', 'order_number', 'total', 'status'],
            where: { status },
            offset,
            limit: pageSize * 1,
        });

        return {
            pageNum,
            pageSize,
            count,
            result: rows,
        }
    }

    async updateOrder(id: number, status: number) {
        return await OrderModel.update(
            { status },
            { where: { id } },
        );
    }
}

export default new OrderService();
