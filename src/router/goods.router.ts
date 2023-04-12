import Router from "koa-router";
import GoodsController from '@/controller/goods.controller';
import { auth, hasAdminPermission } from '@/middleware/auth.middleware';
import { validator } from '@/middleware/goods.middleware';

const { create, upload, update, remove, off, onGoods, findAllGoods } = GoodsController;

const router = new Router();

router.prefix('/goods');

// 商品列表
router.get('/', auth, findAllGoods);

// 發布商品
router.post("/", auth, hasAdminPermission, validator, create);

// 圖片上傳
router.post("/upload", auth, hasAdminPermission, upload);
// router.post("/upload", upload); // NOTE: 測試用

// 修改商品
router.put("/:id", auth, hasAdminPermission, validator, update);

// 刪除商品
router.delete("/:id", auth, hasAdminPermission, remove);

// 下架
router.post("/:id/off", auth, hasAdminPermission, off);

// 上架
router.post("/:id/on", auth, hasAdminPermission, onGoods);

export default router;

