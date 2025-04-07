import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
	const token = req.signedCookies.token;

	if (!token) {
		return res.status(401).json({ error: 'Ошибка: Требуется авторизация' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userEmail = decoded.email;
		next();
	} catch (err) {
		res.status(401).json({ error: 'Ошибка: Токен невалиден' });
	}
};
