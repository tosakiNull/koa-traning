import Router from "koa-router";

import { userValidator, verifyUser, cryptPassword, verifyLogin } from "@/middleware/user.middleware";
import { auth } from "@/middleware/auth.middleware";
import UserController from '@/controller/user.controller';

const { getUsers, register, login, password } = UserController;

const router = new Router();

router.prefix('/user');

router.get("/", getUsers);

router.get("/bar", function (ctx: any) {
    ctx.body = "this is a bar response";
});

router.post("/register", userValidator, verifyUser, cryptPassword, register); // 先給 userValidator => verifyUser 兩者驗証過後才執行 register

router.post("/login", userValidator, verifyLogin, login);

router.patch("/password", auth, cryptPassword, password);

export default router;
