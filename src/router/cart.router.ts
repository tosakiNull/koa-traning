import Router from "koa-router";
import CartController from '@/controller/cart.controller';
import { auth } from '@/middleware/auth.middleware';
import { validator } from '@/middleware/cart.middleware';

const { addCart, cartList, updateCart, removeCart, selectAll } = CartController;

const router = new Router();

router.prefix('/cart');

// 加入購物車
router.post('/', auth, validator({ goods_id: 'number' }), addCart);

// 購物車列表
router.get('/', auth, cartList);

// 更新
router.patch(
    '/:id',
    auth,
    validator({
        number: { type: 'number', required: false },
        selected: { type: 'bool', required: false },
    }),
    updateCart,
);

// 刪除-單/批量
router.delete('/', auth, validator({ all: { type: 'bool', required: false } }), removeCart);

// 全選/全不選
router.post('/selectAll', auth, selectAll);

export default router;

