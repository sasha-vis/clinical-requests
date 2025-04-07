import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(401)
				.json({ error: 'Ошибка: Такого пользователя не существует' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ error: 'Ошибка: Неверно введен пароль' });
		}

		const token = jwt.sign({ email }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});

		res.cookie('token', token, {
			httpOnly: true,
			secure: false,
			sameSite: 'lax',
			signed: true,
			maxAge: 24 * 60 * 60 * 1000,
			domain: process.env.COOKIE_DOMAIN,
		}).json({ message: 'Login successful' });
	} catch (err) {
		res.status(500).json({ error: 'Ошибка: Что-то пошло не так' });
	}
};

export const logout = (req, res) => {
	res.clearCookie('token', {
		httpOnly: true,
		secure: false,
		sameSite: 'lax',
		signed: true,
		domain: process.env.COOKIE_DOMAIN,
	}).json({ message: 'Logout successful' });
};
