import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import seq from '../db/seq';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare user_name: string;
    declare password: string;
    declare is_admin: CreationOptional<boolean>;
    declare createdAt: CreationOptional<string>;
    declare updatedAt: CreationOptional<string>;
}

// User schema
const UserModel = seq.define<User>('train_users', {
    // id 會自動建立
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
    },
    user_name: {
        type: DataTypes.STRING(23),
        allowNull: false,
        unique: true,
        comment: '用戶名, 唯一',
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '用戶密碼',
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否為管理員, 0:非管理員, 1:是管理員',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

UserModel.sync({ force: false }); // force 是否強制建表

export default UserModel;
