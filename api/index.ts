//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/* JS code
const server = require('./src/app.js');
const { db } = require('./src/db.js');
console.log(server);

// Syncing all the models at once.
db.sync({ force: false, alter:false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`listening at ${process.env.PORT}`); // eslint-disable-line no-console
  });
});*/
import http from 'http';
import express,{Application} from 'express';
import dotenv from 'dotenv';
import router from './src/routes';

dotenv.config();

const app:Application = express();
const port = process.env.PORT || 3001;
export const server = http.createServer(app);


app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});