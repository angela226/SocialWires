import { Request, Response } from 'express';
import { pool } from '../../../../../database/database';

const usersController = {
	getDataUsers: async (req: Request, res: Response) => {
		const users = await pool.promise().query('SELECT uuid_user,username,name,lastname,address,phone,email,id_photo_perfil,id_role,updated_at FROM users');
		console.log(users[0]);
		res.status(200).json({ type: true, status: 200, data: users[0] });
	},
	createuser: async (req: Request, res: Response) => {
        const {
            uuid_user,
            firstname,
            lastname,
            username,
            email,
            password,
            gif
        } =req.body;
        console.log(firstname, lastname, username, email, password)
        const fecha = new Date();
        const time = fecha.getTime();
        const fecha_db = new Date(time);
        const result = await pool.promise().query(
            `INSERT INTO users (uuid_user, username, name, lastname, email, password, updated_at, gif) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [uuid_user, username, firstname, lastname, email, password, fecha_db, gif]
        );

        if (result[0].affectedRows !== 1) {
            res.status(500).json({ type: false, status: 500, message: "Error al crear el usuario" });
        } else {
            res.status(200).json({ type: true, status: 200, message: "Usuario creado exitosamente" });
        }
        // res.status(200).json({ type: true, status: 200});
},
	getDataUser: async (req: Request, res: Response) => {},
};
export { usersController };

