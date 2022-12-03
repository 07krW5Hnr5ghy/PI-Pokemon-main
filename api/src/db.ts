require('dotenv').config();
import {Sequelize,Op,Model} from 'sequelize';
import fs from 'fs';
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME
} = process.env;

console.log(DB_USER);

export let sequelize = process.env.NODE_ENV === "production" ? new Sequelize({
  database:DB_NAME,
  dialect:"postgres",
  host:DB_HOST,
  port:5432,
  username:DB_USER,
  password:DB_PASSWORD,
  pool:{
    max:3,
    min:1,
    idle:10000,
  },
  dialectOptions:{
    ssl:{
      require:true,
      rejectUnauthorized:false,
    },
    keepAlive:true,
  },
  ssl:true
}) : new Sequelize(`${DB_NAME}`,`${DB_USER}`,`${DB_PASSWORD}`,{
  host:`${DB_HOST}`,
  logging:false,
  dialect:'postgres',
});

const basename = path.basename(__filename);

const modelDefiners : Model[] = [];
console.log(modelDefiners);

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

/*// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);*/

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon,Type } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Pokemon.belongsToMany(Type,{through:"PokemonXType"});
Type.belongsToMany(Pokemon,{through:"PokemonXType"});


/*module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  db: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op,
};*/
