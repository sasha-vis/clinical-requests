import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.route.js';
import { applicationsRouter } from './routes/applications.route.js';

dotenv.config();
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Роуты
app.use('/api/auth', authRouter);
app.use('/api/applications', applicationsRouter);

// Подключение к MongoDB
mongoose
	.connect(process.env.DB_URL)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB connection error:', err));

// Запуск сервера
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
