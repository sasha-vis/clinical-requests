import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
		},
		problem: {
			type: String,
			maxlength: 500,
		},
	},
	{ timestamps: true },
);

export const Application = mongoose.model('Application', applicationSchema);
