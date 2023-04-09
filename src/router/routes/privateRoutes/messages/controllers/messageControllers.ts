import { Request, Response } from 'express';
import { pool } from '../../../../../database/database';
//import { request } from 'http';
import jwt from 'jsonwebtoken';




const messagesControllers: any = {
	getDataMessageById: async (req: Request, res: Response) => {
		try {
			const id_message = req.params.id
			const messages = await pool.query('SELECT * FROM messages WHERE id = ?', [id_message]);
			res.send(messages)
		} catch (err) {
			res.status(404)
		}
	},
	getDataMyMessage: async (req: Request, res: Response) => {

		const token: any = req.headers.authorization?.split(' ')[1];

		if (!token) {
			res.status(401).json({ mensaje: 'Token de portador no proporcionado' });
		}

		try {

			//Aqui obtenemos el token de tipo bearer
			const decoded: any = jwt.verify(token, 'secret');
			const unescapedStr = JSON.parse(JSON.parse(decoded.data));

			const messages = await pool.query(`SELECT * FROM messages WHERE user_id = '${unescapedStr.uuid_user}'`);
			res.status(200).send(messages);
		} catch (error) {
			res.status(401).json({ mensaje: error });
		}

	},

	//con este se obtiene todos los mensajes
	getDataMessages: async (req: Request, res: Response) => {
		const token: any = req.headers.authorization?.split(' ')[1];

		if (!token) {
			res.status(401).json({ mensaje: 'Token de portador no proporcionado' });
		}

		try {

			//Aqui obtenemos el token de tipo bearer
			const decoded: any = jwt.verify(token, 'secret');
			const unescapedStr = JSON.parse(JSON.parse(decoded.data));

			const messages = await pool.query(`SELECT m.id, m.user_id, m.title, m.text, m.createdAt,
			CONCAT('[', GROUP_CONCAT(JSON_OBJECT('comment', c.comment)), ']') AS comments,
			CONCAT('[', GROUP_CONCAT(JSON_OBJECT('reaction', r.reaction)), ']') AS reactions
	 FROM messages m
	 LEFT JOIN comments c ON m.id = c.message_id
	 LEFT JOIN reactions r ON m.id = r.message_id
	 
	 GROUP BY m.id`);
			res.status(200).send(messages);
		} catch (error) {
			res.status(401).json({ mensaje: error });
		}


	},
	deleteMessage: async (req: Request, res: Response) => {
		const id_message = req.params.id;
		const messages = await pool.query('DELETE FROM messages WHERE id = ?;', [id_message]);
		res.status(200).json({ status: 200, delete: true });
	},

	createMessage: async (req: Request, res: Response) => {
		const token: any = req.headers.authorization?.split(' ')[1];


		if (!token) {
			res.status(401).json({ mensaje: 'Token de portador no proporcionado' });
		}

		try {
			//Aqui obtenemos el token de tipo bearer
			const decoded: any = jwt.verify(token, 'secret');
			const unescapedStr = JSON.parse(JSON.parse(decoded.data));

			//obtenemos la data que nos envia el front
			const { title, text } = req.body;

			//aqui se insertan los datos en la base de datos
			const { result } = await pool.promise().query(
				'INSERT INTO messages (user_id, title, text) VALUES (?, ?, ?)',
				[unescapedStr.uuid_user, title, text]
			);
			const createdAt = new Date().toISOString();
			const message = {
				user: unescapedStr.uuid_user,
				title,
				text,
				createdAt
			};
			res.status(200).json(message);
		} catch (error) {
			res.status(401).json({ mensaje: error });
		}


	},
	createReaction: async (req: Request, res: Response) => {
		try {
			if (req.params.idComment) {
				const idMessage = req.params.idComment
				const { reaction } = req.body
				const { result } = await pool.promise().query(
					'INSERT INTO reactions  (message_id, reaction) VALUES (?, ?)',
					[parseInt(idMessage), reaction]
				);


				res.status(200).json({ coment: 'save successfully' });
			}
		} catch (error) {
			res.status(200).json(error);
		}




	},//Aqui se crea una reaction
	createComment: async (req: Request, res: Response) => {
		try {
			if (req.params.idComment) {
				const idMessage = req.params.idComment
				const { comment } = req.body
				const { result } = await pool.promise().query(
					'INSERT INTO comments  (message_id, comment) VALUES (?, ?)',
					[parseInt(idMessage), comment]
				);


				res.status(200).json({ coment: 'save successfully' });
			}
		} catch (error) {
			res.status(200).json(error);
		}
	}
}
export { messagesControllers };
