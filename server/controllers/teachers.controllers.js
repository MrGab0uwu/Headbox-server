import { pool } from '../db.js';

export const getTeachers = async (req, res) => {
	try {
		const [result] = await pool.query('SELECT * FROM profesor');
		res.json(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getTeacher = async (req, res) => {
	try {
		const id = req.params.id;
		const [result] = await pool.query(
			'SELECT * FROM profesor where clave_P = ?',
			id
		);

		if (result.length == 0)
			return res.status(404).json({ message: 'Teacher not found' });

		res.json(result[0]);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createTeacher = async (req, res) => {
	try {
		const { mat_alu, nom_alu, edad_alu, sem_alu, gen_alu, clave_C1 } = req.body;
		const [result] = await pool.query(
			'INSERT INTO alumno(mat_alu,nom_alu,edad_alu,sem_alu,gen_alu,clave_C1) VALUES (?,?,?,?,?,?)',
			[mat_alu, nom_alu, edad_alu, sem_alu, gen_alu, clave_C1]
		);
		console.log(result.insertId);
		res.json({
			mat_alu,
			nom_alu,
			edad_alu,
			sem_alu,
			gen_alu,
			clave_C1,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const updateTeacher = async (req, res) => {
	try {
		const [result] = await pool.query('UPDATE alumno SET ? WHERE mat_alu = ?', [
			req.body,
			req.params.id,
		]);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: 'Teacher not found' });

		res.send(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deleteTeacher = async (req, res) => {
	try {
		const [result] = await pool.query(
			'DELETE FROM profesor WHERE clave_P = ?',
			[req.params.id]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: 'Teacher not found' });

		res.json(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
