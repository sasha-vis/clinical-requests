db = db.getSiblingDB('clinical_requests');

const hashedPasswords = {
	admin: '$2b$10$KTFYaJLZV5Y0fPOc6FvuHOqit/UDSvXXhvs0VzprUgZt1TNf4MyNS',
	doctor: '$2b$10$DN.dkBvoFusiknh94hZMh.2NfdRYQX9PYNpW0WWQhqNCrFqZcl7T6',
};

db.users.insertMany([
	{
		email: 'admin@clinic.com',
		password: hashedPasswords.admin,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		email: 'doctor@clinic.com',
		password: hashedPasswords.doctor,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]);

db.applications.insertMany([
	{
		name: 'Иван Иванов',
		phone: '+375 (29) 666-66-66',
		problem: 'Головная боль, температура',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Петр Петров',
		phone: '+375 (29) 777-77-77',
		problem: '',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Мария Сидорова',
		phone: '+375 (29) 888-88-88',
		problem: 'Консультация кардиолога',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Алексей Алексеев',
		phone: '+375 (29) 999-99-99',
		problem: 'Аллергическая реакция',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Елена Еленова',
		phone: '+375 (29) 333-33-33',
		problem: 'Плановый осмотр',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]);

print('Database initialized successfully!');
