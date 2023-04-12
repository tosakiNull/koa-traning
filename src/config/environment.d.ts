// declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_PORT: number;
            MYSQL_HOST: string;
            MYSQL_PORT: number;
            MYSQL_USER: string;
            MYSQL_PWD: string;
            MYSQL_DB: string;
            JWT_SECRET: string;
        }
    }
// }

export {};
