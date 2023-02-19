import "reflect-metadata";
require('dotenv').config();
import { DataSource } from "typeorm";
import {Pokemon} from "../entity/Pokemon";
import {Type} from "../entity/Type";
const {
    PGUSER, PGPASSWORD, PGHOST,PGDATABASE,PGPORT
} = process.env;
console.log(`${__dirname}/../entity/*.{ts,js}`);
// config of postgres database
export default new DataSource({
    type:"postgres",
    host:PGHOST,
    port: 5432,
    username: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    synchronize: true,
    ssl:true,
    logging:"all",
    entities:[`${__dirname}/../entity/*.{ts,js}`],
    subscribers:[],
});