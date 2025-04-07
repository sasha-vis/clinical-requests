import bcrypt from 'bcrypt';

async function generateHashes() {
	console.log('Admin123 hash:', await bcrypt.hash('Admin123', 10));
	console.log('Doctor123 hash:', await bcrypt.hash('Doctor123', 10));
}

generateHashes();
