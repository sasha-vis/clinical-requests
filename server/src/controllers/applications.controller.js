import { Application } from '../models/Application.js';

export const getApplications = async (req, res) => {
	try {
		const applications = await Application.find().sort({ createdAt: -1 });
		res.json(applications);
	} catch (err) {
		res.status(500).json({ error: 'Ошибка получения данных' });
	}
};

export const addApplication = async (req, res) => {
	try {
		const { name, phone, problem } = req.body;
		const newApplication = await Application.create({ name, phone, problem });
		res.status(201).json(newApplication);
	} catch (err) {
		res.status(400).json({ error: 'Ошибка отправки данных' });
	}
};
