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

class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
    declare id: CreationOptional<number>;
    declare goods_id: number;
    declare user_id: number;
    declare number: CreationOptional<number>;
    declare selected: CreationOptional<boolean>;
    declare createdAt: CreationOptional<string>;
    declare updatedAt: CreationOptional<string>;
}

const CartModel = seq.define<Cart>('cart', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
    },
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

CartModel.sync({ // 創建表
    force: false,
}); // force 是否強制建表

// Cart表依賴Goods內的goods_id,因為要取商品資料
CartModel.belongsTo(GoodsModel, {
    foreignKey: 'goods_id', // 外key
    as: 'goods_info', // 設定別名
});

export default CartModel;
