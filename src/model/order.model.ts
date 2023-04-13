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

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare id: CreationOptional<number>;
    declare user_id: number;
    declare address_id: number;
    declare goods_info: string;
    declare order_number: string;
    declare total: string;
    declare status: CreationOptional<number>;
    declare createdAt: CreationOptional<string>;
    declare updatedAt: CreationOptional<string>;
}

const OrderModel = seq.define<Order>('order', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用戶ID',
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '地址ID',
    },
    goods_info: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '商品詳細',
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '訂單總金額',
    },
    order_number: {
        type: DataTypes.CHAR,
        allowNull: false,
        comment: '唯一訂單號',
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '訂單狀態 0: 未支付, 1: 以支付, 2: 已發貨, 3: 已簽收, 4: 取消',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

OrderModel.sync({ // 創建表
    force: false,
}); // force 是否強制建表

export default OrderModel;
