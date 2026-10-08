const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); // 1. Add the path module

const env = process.argv[2] || "development";
// 2. Use path.resolve to guarantee Node finds the file no matter where the script is called from
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

function log(message) {
    const time = new Date().toISOString();
    console.log(`[${time}] [${env.toUpperCase()}] ${message}`);
}

const app = express();

// 3. Convert the port to a Number and add a fallback (8080) if env parsing fails
const PORT = Number(process.env.PORT) || 8080;
const APP = process.env.APP || "DEVELOPMENT";

app.get('/', (req, res) => {
  res.send('Hello World ' + APP);
});

app.get('/health', (req, res) => {
    log("Health check called");
    res.status(200).json({
        status: "UP"
    });
});

app.listen(PORT, () => {
   log("Server running on port " + PORT); // Added a space after 'port' for cleaner logs
});

