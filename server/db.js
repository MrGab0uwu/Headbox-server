import { createPool } from 'mysql2/promise';

// Pool tiene metodos para la conexcion con la base de datos
export const pool = createPool({
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	password: 'aex1lol',
	database: 'escuela',
});
