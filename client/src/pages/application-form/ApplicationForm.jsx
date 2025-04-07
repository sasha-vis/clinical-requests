import { useState } from 'react';
import axios from 'axios';
import { IMaskInput } from 'react-imask';
import styles from './ApplicationForm.module.css';

export function ApplicationForm() {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		problem: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePhoneAccept = (value) => {
		setFormData((prev) => ({ ...prev, phone: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			await axios.post('/api/applications', formData);
			setSubmitStatus({ type: 'success', message: 'Заявка успешно отправлена!' });
			setFormData({ name: '', phone: '', problem: '' });
		} catch (error) {
			console.error('Ошибка отправки:', error);
			setSubmitStatus({
				type: 'error',
				message:
					error.response?.data?.message ||
					'Произошла ошибка при отправке заявки',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Форма подачи заявки</h2>

			{submitStatus && (
				<div className={`${styles.alert} ${styles[submitStatus.type]}`}>
					{submitStatus.message}
				</div>
			)}

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label className={styles.label}>ФИО</label>
					<input
						className={styles.input}
						name="name"
						type="text"
						value={formData.name}
						onChange={handleChange}
						placeholder="Иванов Иван Иванович"
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Телефон</label>
					<IMaskInput
						className={styles.input}
						mask="+375 (00) 000-00-00"
						definitions={{ 0: /[0-9]/ }}
						value={formData.phone}
						onAccept={handlePhoneAccept}
						placeholder="+375 (__) ___-__-__"
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Описание проблемы</label>
					<textarea
						className={styles.textarea}
						name="problem"
						value={formData.problem}
						onChange={handleChange}
						placeholder="Опишите вашу проблему подробно..."
						rows={5}
					/>
				</div>

				<button
					type="submit"
					className={styles.submitButton}
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<span className={styles.buttonLoader}></span>
					) : (
						'Отправить заявку'
					)}
				</button>
			</form>
		</div>
	);
}
