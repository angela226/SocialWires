import { Request, Response } from 'express';
import { pool } from '../../../../../database/database';
import { request } from 'http';


const messagesControllers:any = {
	getDataMessageById: async (req: Request, res: Response) => {
		try{
			const id_message = req.params.id
			const messages = await pool.query('SELECT * FROM messages WHERE id = ?',[id_message]);
			res.send(messages)
		}catch(err){
			res.status(404)
		}
	},
	getDataMyMessage: async (req: Request, res: Response) => {
		try{
			const id_user = req.headers.id_user
			const messages = await pool.query('SELECT * FROM messages WHERE user_id = ?',[id_user]);
			res.send(messages)
		}catch(err){
			res.status(404)
		}
	},
	getDataMessages: async (req: Request, res: Response) => {		
		const messages = await pool.query('SELECT * FROM messages');
		res.status(200).json({ type: true, status: 200, data: messages[0] });
	},
	deleteMessage: async (req: Request, res: Response) => {		
		const id_message = req.params.id;
		const messages = await pool.query('DELETE FROM messages WHERE id = ?;',[id_message]);
		res.status(200).json({ status: 200, delete:true });
	},
	createMessage: async (req: Request, res: Response) => {
		const { user_id, title, text, comments = [], reactions = [] } = req.body;
		const [result] = await pool.promise().query(
			'INSERT INTO messages (user_id, title, text, comments, reactions) VALUES (?, ?, ?, ?, ?)',
			[user_id, title, text, JSON.stringify(comments), JSON.stringify(reactions)]
		);
		const createdAt = new Date().toISOString();
		const message = {
			id: result.insertId,
			user: user_id,
			title,
			text,
			comments,
			reactions,
			createdAt
		};
		res.status(200).json(message);
	},
	getDataMessage: async (req: Request, res: Response) => {

	},
	createComment: async (req: Request, res: Response) => {
		const { id } = req.params
		const { autor, texto } = req.body;

		// hacer una consulta a la bd  con el id del request

		
		try {
			const query = {
			  text: 'INSERT INTO comentarios (autor, texto) VALUES ($1, $2) RETURNING *',
			  values: [autor, texto],
			};
			const result = await pool.query(query);
			const comment_user = result.rows[0];
		



			// verificar que user_id diferente al bearer_token

		
			
		const { comment } = req.body

		// hacemos un update al comentario en la base de datos y le agregamos el comentario

		console.log('que comment', comment)
		console.log('que id', id)
		res.status(200).json({message: "todo ok!"})
	} catch (err) {console.log(err)}
}}
export { messagesControllers };
