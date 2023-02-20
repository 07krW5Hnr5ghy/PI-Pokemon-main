import "reflect-metadata";
require('dotenv').config();
import { DataSource } from "typeorm";
import {Pokemon} from "../entity/Pokemon";
import {Type} from "../entity/Type";
const {
    PGUSER, PGPASSWORD, PGHOST,PGDATABASE,PGPORT
} = process.env;
const port = PGPORT as number | undefined;
// config of postgres database
export default new DataSource({
    type:"postgres",
    host:PGHOST,
    port: port || 5432,
    username: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    synchronize: true,
    ssl:true,
    logging:"all",
    entities:[`${__dirname}/../**/entity/*.{ts,js}`],
    migrations:[`${__dirname}/../**/migrations/*.{ts,js}`],
    subscribers:[],
});