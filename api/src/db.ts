require('dotenv').config();
import {Sequelize,Op,Model} from 'sequelize';
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME
} = process.env;

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