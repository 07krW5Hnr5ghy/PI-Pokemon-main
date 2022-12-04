import express,{Express,Request,Response,NextFunction} from 'express';
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
import routes from './routes/index';

require('./db');

const server : Express = express();

//server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);
/*server.get('/',(req:Request,res:Response)=>{
  res.send('hi');
});*/

// Error catching endware.
server.use((err:Error, req: Request, res:Response, next:NextFunction) => { 
  // eslint-disable-line no-unused-vars
  const message = err.message || err;
  console.error(err);
  res.send(message);
});

export default server;
