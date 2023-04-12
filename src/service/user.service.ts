import UserModel from '@/model/User';

interface UserInfoQuery {
    id?: number;
    user_name?: string;
    password?: string;
    is_admin?: boolean;
    createdAt?: string;
    updatedAt?: string;
};

type Rsp = {
    id?: number;
    user_name?: string;
    password?: string;
}

class UserService {
    /**
     * 取得所有使用者清單
     *
     * @returns {Promise<UserInfoQuery>} 使用者列表
     */
    async getAllUser(): Promise<UserInfoQuery> {
        const res = await UserModel.findAll();

        return res as UserInfoQuery;
    }

    async createUser(user_name: string, password: string): Promise<Rsp> {
        const res = await UserModel.create({
            user_name,
            password,
        });

        return res as Rsp;
    }

    async getUserInfo<Promise>(query:UserInfoQuery = {}) {
        const { id, user_name, password, is_admin } = query;

        const whereOpt = {};

        // 若參數存在則copy一份到whereOpt內
        id && Object.assign(whereOpt, { id });
        user_name && Object.assign(whereOpt, { user_name });
        password && Object.assign(whereOpt, { password });
        is_admin && Object.assign(whereOpt, { is_admin });

        const res = await UserModel.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'], // 用*會影響效能
            where: whereOpt,
        });

        return res ? res.dataValues : null;
    }

    async updateById<Promise>(query:UserInfoQuery = {}) {
        const { id, user_name, password, is_admin } = query;

        const whereOpt = { id };
        const newUser = {};

        user_name && Object.assign(newUser, { user_name });
        password && Object.assign(newUser, { password });
        is_admin && Object.assign(newUser, { is_admin });

        const res = await UserModel.update(newUser, {
            where: whereOpt,
        });

        console.log(res);

        return res[0] > 0 ? true : false;
    }
}

export default new UserService();
