import express,{Express,Request,Response,NextFunction} from 'express';
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
import PokemonRoutes from "./pokemons/pokemons.routes";
import TypeRoutes from "./types/type.routes";

/* server instance */
const server : Express = express();

/* utilities to make the server work */
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

/* http request headers configuration */
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND || 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/* Pokemon and Types router */
server.use('/api', PokemonRoutes);
server.use('/api', TypeRoutes);

// Error catching endware.
server.use((err:Error, req: Request, res:Response, next:NextFunction) => { 
  // eslint-disable-line no-unused-vars
  const message = err.message || err;
  console.error(err);
  res.send(message);
});

export default server;
