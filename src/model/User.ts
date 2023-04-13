import { Model, DataTypes, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';
import UserSeq from '../db/seq';

// type UserAttributes = {
//     id: number;
//     user_name: string;
//     password: string;
//     is_admin: boolean;
//     createdAt: string;
//     updatedAt: string;
// }

// type UserCreationAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

// interface User extends Model<UserAttributes, UserCreationAttributes> {
//     user_name: string;
//     password: string;
//     is_admin: boolean;
// }
interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    user_name: string;
    password: string;
    is_admin: boolean;
}

// User schema
const User = UserSeq.define('train_users', {
    // id 會自動建立
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
    }
});

User.sync({ force: false }); // force 是否強制建表

export default User;

// type IsBoolean<T> = T extends boolean ? true : false;
// type A = { a: number; };
// const b = {};
// b.a;
// cosnt a:`request-${number}`
