import express from 'express';
import {
	addApplication,
	getApplications,
} from '../controllers/applications.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

export const applicationsRouter = express.Router();

applicationsRouter.post('/', addApplication);
applicationsRouter.get('/', authenticate, getApplications);
