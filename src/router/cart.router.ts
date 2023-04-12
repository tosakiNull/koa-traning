import Router from "koa-router";
import CartController from '@/controller/cart.controller';
import { auth, hasAdminPermission } from '@/middleware/auth.middleware';
import { validator } from '@/middleware/cart.middleware';

const { addCart, cartList } = CartController;

const router = new Router();

router.prefix('/cart');

// 加入購物車
router.post('/', auth, validator, addCart);

// 購物車列表
router.get('/', auth, cartList);

export default router;

