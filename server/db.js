import { createPool } from 'mysql2/promise';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } from './config.js';

// Pool tiene metodos para la conexcion con la base de datos
export const pool = createPool({
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
});
