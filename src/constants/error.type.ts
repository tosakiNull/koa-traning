// import type { ResponseMsg } from './type';

export type ResponseMsg = {
    code: string,
    message: string,
    result: any,
}

type ErrorMsg = Record<string, ResponseMsg>

export const errorMsg = {
    userFormateError: {
        code: '10001',
        message: '用戶名或密碼錯誤',
        result: '',
    },
    userAlreadyExitedError:  {
        code: '10002',
        message: '用戶已存在',
        result: '',
    },
    userRegisterError: {
        code: '10003',
        message: '用戶註冊錯誤',
        result: '',
    },
    userNotFoundError: {
        code: '10004',
        message: '用戶不存在',
        result: '',
    },
    userLoginError: {
        code: '10005',
        message: '登入錯誤',
        result: '',
    },
    invalidPassword: {
        code: '10006',
        message: '密碼錯誤',
        result: '',
    },
    passwordChangeError: {
        code: '10007',
        message: '修改密碼失敗',
        result: '',
    },
    getUserListError: {
        code: '10008',
        message: '取得使用者列表失敗',
        result: '',
    },
    tokenExpiredError: {
        code: '10101',
        message: '憑證過期,請重新登入',
        result: '',
    },
    invalidTokenError: {
        code: '10102',
        message: '無效的token',
        result: '',
    },
    hasNoAdminPermissionError: {
        code: '10103',
        message: '無管理員權限',
        result: '',
    },
    fileUploadError: {
        code: '10201',
        message: '上傳商品圖片失敗',
        result: '',
    },
    fileUnsupportedError: {
        code: '10202',
        message: '不支持的文件格式',
        result: '',
    },
    goodsFormateError: {
        code: '10203',
        message: '參數格式錯誤',
        result: '',
    },
    publishGoodsError: {
        code: '10204',
        message: '發布商品出錯',
        result: '',
    },
    updateGoodsError: {
        code: '10205',
        message: '修改商品失敗',
        result: '',
    },
    InvalidGoodsId: {
        code: '10206',
        message: '無效的商品ID',
        result: '',
    },
    deleteGoodsError: {
        code: '10207',
        message: '刪除商品失敗',
        result: '',
    },
    offGoodsError: {
        code: '10208',
        message: '下架失敗',
        result: '',
    },
    cartFormatError: {
        code: '10301',
        message: '購物車格式錯誤',
        result: '',
    },
    addrFormatError: {
        code: '10401',
        message: '地址格式錯誤',
        result: '',
    },
    addAddrError: {
        code: '10402',
        message: '添加地址失敗',
        result: '',
    },
    getAddrError: {
        code: '10403',
        message: '取得地址列表失敗',
        result: '',
    },
    updateAddrError: {
        code: '10404',
        message: '更新地址資訊失敗',
        result: '',
    },
    deleteAddrError: {
        code: '10405',
        message: '地址刪除失敗',
        result: '',
    },
    orderFormatError: {
        code: '10501',
        message: '訂單格式錯誤',
        result: '',
    },
    addrOrderError: {
        code: '10502',
        message: '新增訂單錯誤',
        result: '',
    },
} satisfies ErrorMsg;

export default errorMsg;
