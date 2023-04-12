import { Context } from 'koa';
import { File } from 'formidable';
import path from 'path';
import ErrorType from '@/constants/error.type';
import GoodsService from '@/service/goods.service';

const {
    fileUploadError,
    fileUnsupportedError,
    publishGoodsError,
    updateGoodsError,
    InvalidGoodsId,
    deleteGoodsError,
    offGoodsError,
} = ErrorType;
const { createGoods, updateGoods, deleteGoods, restoreGoods, getAllGoods } = GoodsService;

class GoodsController {
    async create(ctx:Context) {
        try {
            await createGoods(ctx.request.body);

            ctx.body = {
                code: 0,
                message: "發布成功",
                result: "",
            }

        } catch (error) {
            console.error('發布商品出錯了', error); // 寫log用
            ctx.app.emit('error', publishGoodsError, ctx);
        }
    }

    async upload(ctx:Context) {
        // 取client 傳的 file key 名
        const files = ctx.request.files;

        // TODO: 改成middleware => 讓 formidable去做設置
        const fileTypes = ['image/png', 'image/jpeg', 'image/png'];

        if (files && files.file) {
            // 因為 Files 的型別為 File | File[], 僅需第一項故需判斷
            const file:File = Array.isArray(files.file) ? files.file[0] : files.file;

            if (!fileTypes.includes(file.mimetype || '')) {
                console.error("不支持的文件格式");
                ctx.app.emit("error", fileUnsupportedError, ctx);

                return;
            }

            // 因有配置 koa-static
            // 故可以以下面網址訪問圖片
            // http://127.0.0.1:8803/d76368fb0da27ba932e2d9700.%20toBeTruthy%20())%20;.png
            ctx.body = {
                code: 0,
                message: "success",
                result: {
                    good_img: path.basename(file.filepath), //只拿圖片名稱
                },
            };

            return;
        }

        console.error("上傳商品圖片失敗");
        ctx.app.emit("error", fileUploadError, ctx);
    }

    async update(ctx:Context) {
        try {
            const res = await updateGoods(ctx.params.id, ctx.request.body);

            if (res) {
                ctx.body = {
                    code: 0,
                    message: "修改成功",
                    result: "",
                }
            } else {
                console.error("無效的商品ID");
                return ctx.app.emit("error", InvalidGoodsId, ctx);
            }
        } catch (error) {
            console.error("修改商品失敗");
            ctx.app.emit("error", updateGoodsError, ctx);
        }
    }

    // 硬刪除
    async remove(ctx:Context) {
        try {
            const res = await deleteGoods(ctx.params.id);

            if (res) {
                ctx.body = {
                    code: 0,
                    message: "刪除成功",
                    result: "",
                }
            } else {
                console.error("無效的商品ID");
                return ctx.app.emit("error", InvalidGoodsId, ctx);
            }
        } catch (error) {
            console.error("刪除商品失敗");
            ctx.app.emit("error", deleteGoodsError, ctx);
        }
    }

    // 軟刪除-下架
    async off(ctx:Context) {
        try {
            // 有設定 paranoid 的話會變軟刪除
            const res = await deleteGoods(ctx.params.id);

            if (res) {
                ctx.body = {
                    code: 0,
                    message: "下架成功",
                    result: "",
                }
            } else {
                console.error("無效的商品ID");
                return ctx.app.emit("error", InvalidGoodsId, ctx);
            }

        } catch (error) {
            console.error('下架失敗', error); // 寫log用
            ctx.app.emit('error', offGoodsError, ctx);
        }
    }

    // 軟刪除-重新上架
    async onGoods(ctx:Context) {
        try {
            // 有設定 paranoid 的話會變軟刪除
            const res = await restoreGoods(ctx.params.id);

            if (res) {
                if (res) {
                    ctx.body = {
                        code: 0,
                        message: "上架成功",
                        result: "",
                    }
                } else {
                    console.error("無效的商品ID");
                    return ctx.app.emit("error", InvalidGoodsId, ctx);
                }
            } else {
                console.error("無效的商品ID");
                return ctx.app.emit("error", InvalidGoodsId, ctx);
            }
        } catch (error) {
            console.error('上架失敗', error); // 寫log用
            ctx.app.emit('error', offGoodsError, ctx);
        }
    }

    async findAllGoods(ctx:Context) {
        try {
            const { page_num = 1, page_size = 10 } = ctx.request.query;

            const pageNum = Number(page_num);
            const pageSize = Number(page_size);

            const res = await getAllGoods(pageNum, pageSize);

            ctx.body = {
                code: 0,
                message: "取得資料成功",
                result: res,
            }
        } catch (error) {
            console.error('取得失敗', error); // 寫log用
            ctx.app.emit('error', offGoodsError, ctx);
        }
    }
}

export default new GoodsController();
