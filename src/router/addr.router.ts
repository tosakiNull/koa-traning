import Router from "koa-router";
import AddrController from '@/controller/addr.controller';
import { auth } from '@/middleware/auth.middleware';
import { validator } from '@/middleware/addr.middleware';

const { addAddr, getAddList, updateAddr, deleteAddr, updateDefAddr } = AddrController;

const router = new Router();

router.prefix('/address');

// 加入地址
router.post(
    '/',
    auth,
    validator({
        consignee: 'string',
        phone: { type: 'string', format: /^\d{10}$/ },
        address: 'string',
    }),
    addAddr,
);

// 取得地址列表
router.get('/', auth, getAddList);

// 修改地址
router.put(
    '/:id',
    auth,
    validator({
        consignee: 'string',
        phone: { type: 'string', format: /^\d{10}$/ },
        address: 'string',
    }),
    updateAddr,
);

// 刪除地址
router.delete('/:id', auth, deleteAddr);

// 設置默認
router.patch('/:id', auth, updateDefAddr);

export default router;

