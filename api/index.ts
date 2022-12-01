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

import express,{Express,Request,Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app:Express = express();
const port = process.env.PORT;

app.get('/',(req:Request, res:Response) => {
  res.send('Express + TypeScript Server is running.');
});

app.listen(port, ()=>{
  console.log(`Server is running at https://localhost:${port}`);
});