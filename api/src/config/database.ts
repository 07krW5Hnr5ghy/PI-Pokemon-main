import "reflect-metadata";
require('dotenv').config();
import { DataSource } from "typeorm";
import {Pokemon} from "../entity/Pokemon";
import {Type} from "../entity/Type";
const {
    PGUSER, PGPASSWORD, PGHOST,PGDATABASE,PGPORT
} = process.env;

// config of postgres database
export default new DataSource({
    type:"postgres",
    host:PGHOST,
    port: 5432,
    username: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    synchronize: true,
    logging:"all",
    entities:[Pokemon,Type],
    subscribers:[],
});