import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
// import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';
import seq from '../db/seq';
import GoodsModel from './goods.model';

export interface Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
    id: number;
    goods_id: number,
    user_id: number,
    number: number,
    selected: boolean,
}

const Cart = seq.define('cart', {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用戶id',
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '購物車內數量',
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否選中商品(放在購物車)',
    },
}, {
    paranoid: true, // 偏執表 => 執行軟刪除
});

Cart.sync({ // 創建表
    force: false,
}); // force 是否強制建表

// Cart表依賴Goods內的goods_id,因為要取商品資料
Cart.belongsTo(GoodsModel, {
    foreignKey: 'goods_id', // 外key
    as: 'goods_info', // 設定別名
});

export default Cart;
