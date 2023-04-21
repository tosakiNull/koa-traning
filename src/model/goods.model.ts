import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import seq from '../db/seq';

export interface Goods extends Model<InferAttributes<Goods>, InferCreationAttributes<Goods>> {
    id: number;
    goods_name: string;
    goods_price: number;
    goods_num: number;
    goods_img: string;
    createdAt: string;
    updateAt: string;
}

const Goods = seq.define('goods', {
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名',
    },
    goods_price: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false,
        comment: '價格',
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '庫存',
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品圖片',
    }
}, {
    paranoid: true, // 偏執表 => 執行軟刪除
});

Goods.sync({
    force: false,
}); // force 是否強制建表

export default Goods;
