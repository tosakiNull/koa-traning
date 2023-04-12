import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    user_name: string;
    password: string;
    is_admin: boolean;
}
