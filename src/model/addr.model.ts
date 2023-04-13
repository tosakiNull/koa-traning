import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
// import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';
import seq from '../db/seq';

class Addr extends Model<InferAttributes<Addr>, InferCreationAttributes<Addr>> {
    declare id: CreationOptional<number>;
    declare user_id: number;
    declare consignee: string;
    declare phone: string;
    declare address: string;
    declare is_default: CreationOptional<boolean>;
    declare createdAt: CreationOptional<string>;
    declare updatedAt: CreationOptional<string>;
}

const AddrModel = seq.define<Addr>('addr', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用戶id",
    },
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "收件人姓名",
    },
    phone: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        comment: "收件人手機",
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "收件人地址",
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "是否為默認地址 0: 不是, 1:是",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

AddrModel.sync({ // 創建表
    force: false,
}); // force 是否強制建表

export default AddrModel;
