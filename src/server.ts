// #!/usr/bin/env
require('./plugins/module_alias/index');

import http from 'http';
import ENV from './config/config.default';
import app from './app';

const { APP_PORT } = ENV;

const debug = require('debug')('demo:server');

const port = normalizePort(process.env.PORT || APP_PORT);

const server = http.createServer(app.callback());

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

server.on('listening', onListening);

function normalizePort(portVal: any):number | string | boolean {
    const port:number = parseInt(portVal, 10);

    if (isNaN(port)) {
        return portVal;
    }

    if (port >=0) {
        return port;
    }

    return false;
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr ==='string'? 'pipe'+ addr : 'port'+ addr?.port;

    debug(`Listening on ${bind}`);
}
