import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			await axios.post('/api/auth/login', formData, { withCredentials: true });
			navigate('/dashboard');
		} catch (err) {
			const errorMessage = err.response.data.error;
			setError(errorMessage);
			console.error('Login error:', err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginCard}>
				<div className={styles.loginHeader}>
					<h2 className={styles.loginTitle}>Вход в систему</h2>
					<p className={styles.loginSubtitle}>
						Пожалуйста, введите ваши учетные данные
					</p>
				</div>

				{error && (
					<div className={styles.errorMessage}>
						<span className={styles.errorIcon}>!</span>
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className={styles.loginForm}>
					<div className={styles.formGroup}>
						<label htmlFor="email" className={styles.formLabel}>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							className={styles.formInput}
							placeholder="Введите ваш email"
							required
							autoComplete="username"
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="password" className={styles.formLabel}>
							Пароль
						</label>
						<input
							id="password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							className={styles.formInput}
							placeholder="Введите ваш пароль"
							required
							autoComplete="current-password"
						/>
					</div>

					<button
						type="submit"
						className={styles.loginButton}
						disabled={isLoading}
					>
						{isLoading ? (
							<span className={styles.buttonSpinner}></span>
						) : (
							'Войти'
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
