// 自動依照文件加載路由
import fs from 'fs';
import Router from 'koa-router';

import userRouter from './user.router';
import goodsRouter from './goods.router';
import cartRouter from './cart.router';
import addrRouter from './addr.router';
import orderRouter from './order.router';

const router = new Router();

router.use(userRouter.routes());
router.use(goodsRouter.routes());
router.use(cartRouter.routes());
router.use(addrRouter.routes());
router.use(orderRouter.routes());

// fs.readdirSync(__dirname).forEach((file:any) => {
//     // console.log(file);
//     if (file !== 'index.ts') { // 排除自己
//         const r = require(`${file}`);

//         // 註冊中間件
//         router.use(r.routes());
//     }

// });

export default router;
