1. Запуск бд

Создание базы данных с данными по умолчанию
docker-compose up -d mongodb

Там два пользователя созданные заранее через cd server && node generate-hashes.js:

-   login - admin@clinic.com , password: Admin123
-   login - doctor@clinic.com , password: Doctor123

2. Запуск сервера

cd server && npm install && npm run dev

3. Запуск клиента

cd ../client && npm install && npm run dev
