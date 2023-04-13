import Router from "koa-router";
import OrderController from '@/controller/order.controller';
import { auth } from '@/middleware/auth.middleware';
import { validator } from '@/middleware/order.middleware';

const { addOrder, getOrderList, updateOrder } = OrderController;

const router = new Router();

router.prefix('/orders');

// 加入訂單
router.post(
    '/',
    auth,
    validator({
        address_id: 'int',
        goods_info: 'string',
        total: 'string',
    }),
    addOrder
);

// 取得訂單列表
router.get('/', auth, getOrderList);

// 更新訂單狀態
router.patch('/:id', auth, validator({ status: 'number' }), updateOrder);

export default router;

