const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const env = process.argv[2] || "development";
const fs = require('fs');
dotenv.config({ path: `.env.${env}` });

// Ensure the logs directory exists

const logDir = path.join(__dirname, 'logs'); 
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true });

} 
const logFile = path.join(logDir, 'app.log');

function log(message) {
	const time = new Date().toISOString();
	const line = `[${time}] [${env.toUpperCase()}] ${message}`;
	console.log(line);
	fs.appendFileSync(logFile, line + '\n'); 
}

const app = express();
const PORT = process.env.PORT; 
const APP = process.env.APP;

app.get('/', (req, res) => { 
	log("Root endpoint called"); 
	res.send("Hello World from Express fron" + APP);

});


app.get('/health', (req, res) => { 
	log("Health check called"); 
	res.status(200).json({ 
		status: "UP"
	});
});	

app.listen(PORT, () => {
	log("Server is running on port" + PORT);
});	
