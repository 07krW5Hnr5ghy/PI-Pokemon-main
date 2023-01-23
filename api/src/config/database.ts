import "reflect-metadata";
require('dotenv').config();
import { DataSource } from "typeorm";
import {Pokemon} from "../entity/Pokemon";
const {
    DB_USER, DB_PASSWORD, DB_HOST,DB_NAME
} = process.env;

export default new DataSource({
    type:"postgres",
    host:DB_HOST,
    port: 5432,
    username: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    synchronize: true,
    logging:false,
    entities:[Pokemon],
    migrations:[],
    subscribers:[],
});