import GoodsModel, { Goods } from '@/model/goods.model';

type GoodsInfo = {
    id: number;
    goods_name: string;
    goods_price: number;
    goods_num: number;
    goods_img: string;
    createdAt: string;
    updatedAt: string;
    deleteAt: string | null;
};

type GoodsCreateInfo = Pick<GoodsInfo, 'goods_name' | 'goods_price' | 'goods_num' | 'goods_img'>;

type Pagination = {
    first_result: number;
    max_results: number;
    total: number;
}

type AllGoods = {
    pagination: Pagination;
    ret: GoodsInfo[];
}

class GoodsService {
    async createGoods(goods:GoodsCreateInfo) {
        const { createdAt, updateAt, ...res} = await GoodsModel.create(goods) as Goods;

        return res ? res.dataValues : null;
    }

    async updateGoods(id:string, goods:GoodsCreateInfo): Promise<boolean> {
        const res = await GoodsModel.update(goods, { where: { id } });

        return res[0] > 0 ? true : false;
    }

    // 硬/軟刪除
    async deleteGoods(id:string): Promise<boolean> {
        const res = await GoodsModel.destroy({ where: { id } });

        return res > 0 ? true : false;
    }

    // 上架
    async restoreGoods(id:string): Promise<boolean> {
        const res = await GoodsModel.restore({ where: { id } });

        return (typeof res === 'number' && res === 0) ?  false : true;
    }

    // : Promise<AllGoods>
    async getAllGoods(pageNum:number, pageSize:number) {
        // findCountAll = count + findAll
        const offset = (pageNum - 1) * pageSize;
        // const count = await GoodsModel.count();
        // const rows = await GoodsModel.findAll({ offset, limit: pageSize });

        const { count, rows } = await GoodsModel.findAndCountAll({ offset, limit: pageSize })

        return {
            pagination: {
                first_result: pageNum,
                max_results: pageSize,
                total: count,
            },
            ret: rows,
        };
    }
}

export default new GoodsService();
