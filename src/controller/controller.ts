const EventEmitter = require('events').EventEmitter;

export class Controller extends EventEmitter {
    /**
     * 初始化
     *
     * @param  {object} app Koa's Application
     * @param  {object} namespace 命名空間
     */
    constructor(app: any, namespace: any) {
        super();

        const routes = this.routes();
    }

    /**
     * 設定綁定的路徑
     *
     * @return {array}
     */
    routes() {
        return [];
    }
}

export default Controller;
