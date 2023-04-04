import { Request, Response } from 'express';
import { pool } from '../../../../../database/database';

const messagesController = {
	getDataMessages: async (req: Request, res: Response) => {
		console.log('first')
		const messages = await pool.promise().query('SELECT * FROM messages');
		res.status(200).json({ type: true, status: 200, data: messages[0] });
	},
	deleteMessage:async (req: Request, res: Response) => {
		const messages = await pool.promise().query('SELECT * FROM messages');
		
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
};
export { messagesController };
