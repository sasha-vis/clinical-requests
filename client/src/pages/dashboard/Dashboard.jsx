import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

export function Dashboard() {
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchApplications = async () => {
			try {
				const response = await axios.get('/api/applications', {
					withCredentials: true,
				});
				setApplications(response.data);
			} catch (err) {
				setError('Ошибка загрузки заявок');
				console.error('Fetch error:', err);
				if (err.response?.status === 401) {
					navigate('/login');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchApplications();
	}, [navigate]);

	const handleLogout = async () => {
		try {
			await axios.post('/api/auth/logout', {}, { withCredentials: true });
			navigate('/login');
		} catch (err) {
			console.error('Logout error:', err);
		}
	};

	if (loading) return <div className={styles.loading}>Загрузка...</div>;
	if (error) return <div className={styles.error}>{error}</div>;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Панель управления</h1>
				<button onClick={handleLogout} className={styles.logoutButton}>
					Выйти
				</button>
			</div>

			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th className={styles.th}>Дата</th>
							<th className={styles.th}>ФИО</th>
							<th className={styles.th}>Телефон</th>
							<th className={styles.th}>Проблема</th>
						</tr>
					</thead>
					<tbody>
						{applications.map((app) => (
							<tr key={app._id} className={styles.tr}>
								<td className={styles.td}>
									{new Date(app.createdAt).toLocaleString()}
								</td>
								<td className={styles.td}>{app.name}</td>
								<td className={styles.td}>{app.phone}</td>
								<td className={styles.td}>{app.problem || '-'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
