import { Sequelize as SetToSqe } from 'sequelize';
import ENV from '../config/config.default';

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = ENV;

// const seq = new SetToSqe('trainingDB', 'DevAuth', 'Dev123', {
//   host: '127.0.0.1',
//   dialect: 'mysql',
// });
const seq = new SetToSqe(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',

  // connection pool
  pool: {
    max: 5, // 最高連線數
    min: 0,
    // acquire: 30000,
    // idle: 10000,
  },
}); // setting close timestamp

// // test connection
// seq.authenticate().then(() => {
//     console.log('connect successful')
// })
// .catch((error:any) => {
//     console.log(error);
// });

export default seq;
