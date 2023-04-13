import { Op } from 'sequelize';
import AddrModel from '@/model/addr.model';

type AddrBaseParam = {
    consignee: string,
    phone: string,
    address: string,
}

type addAddrParams = {
    userId: number,
} & AddrBaseParam;

class AddrService {
    async addAddr(params: addAddrParams) {
        // TODO: 這裡之後要限制地址只能有三個,超過不能在新增
        const {userId, consignee, phone, address } = params;
        return await AddrModel.create({
            user_id: userId,
            consignee,
            phone,
            address,
        });
    }

    async getAddrList(user_id: number) {
        return await AddrModel.findAll({
            attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
            where: { user_id },
        })
    }

    async updateAddr(id:number, params: AddrBaseParam) {
        return await AddrModel.update(params, { where: { id } });
    }

    async removeAddr(id: number) {
        return await AddrModel.destroy({ where: { id } });
    }

    async updateDefAddr(id: number, user_id: number) {
        // 只有一個地址是預設的,其他要設false
        await AddrModel.update(
            { is_default: false },
            { where: { user_id }},
        );

        return await AddrModel.update(
            { is_default: true },
            { where: { id } },
        );
    }
}

export default new AddrService();
