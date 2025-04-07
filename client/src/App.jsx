import { Routes, Route } from 'react-router-dom';
import { ApplicationForm, Login, Dashboard } from './pages';
import styles from './App.module.css';

export default function App() {
	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<ApplicationForm />} />
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</div>
	);
}
