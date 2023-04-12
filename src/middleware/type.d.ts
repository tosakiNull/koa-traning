import type { Context, Next, ParameterizedContext } from 'koa';

export type StateUser = {
    id?: number;
    user_name?: string;
    is_admin?: boolean;
};

export type GoodFile = {
    file: {
        path: string;
    };
}

type FileUpload = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

export type ValidatorUser = Pick<StateUser, 'id', 'user_name'>;

// export interface RequestBody {
//     [key: string]: any;
// };

declare module 'koa' {
    namespace Application {
        interface DefaultState {
            user: StateUser;
        }
        // interface Request {
        //     body?: unknown & StateUser & RequestBody;
        // }
    }

    // interface Request {
    //     body?: StateUser & RequestBody;
    //     files?: Files & GoodFile & FileUpload;
    // }
}

declare namespace formidable {
    interface File extends FileUpload {
        path: string;
    }
}

