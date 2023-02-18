import "reflect-metadata";
require('dotenv').config();
import { DataSource } from "typeorm";
import {Pokemon} from "../entity/Pokemon";
import {Type} from "../entity/Type";
const {
    DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_PORT
} = process.env;

// config of postgres database
export default new DataSource({
    type:"postgres",
    host:DB_HOST,
    port: Number(DB_PORT) || 5432,
    username: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    synchronize: true,
    logging:"all",
    entities:[Pokemon,Type],
    subscribers:[],
});