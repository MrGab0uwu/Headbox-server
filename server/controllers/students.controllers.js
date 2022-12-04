import { pool } from '../db.js';

export const getStudents = async (req, res) => {
	try {
		const [result] = await pool.query('SELECT * FROM alumno');
		res.json(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getStudent = async (req, res) => {
	try {
		const id = req.params.id;
		const [result] = await pool.query(
			'SELECT * FROM alumno where mat_alu = ?',
			id
		);

		if (result.length == 0)
			return res.status(404).json({ message: 'Student not found' });

		res.json(result[0]);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createStudent = async (req, res) => {
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

export const updateStudent = async (req, res) => {
	try {
		const [result] = await pool.query('UPDATE alumno SET ? WHERE mat_alu = ?', [
			req.body,
			req.params.id,
		]);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: 'Student not found' });

		res.send(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deleteStudent = async (req, res) => {
	try {
		const [result] = await pool.query('DELETE FROM alumno WHERE mat_alu = ?', [
			req.params.id,
		]);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: 'Student not found' });

		res.json(result);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
