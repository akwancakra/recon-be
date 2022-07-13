import express from "express";
import cors from 'cors';
import db from './config/Database.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';

dotenv.config();
const app = express();

try {
    // CONNECT
    await db.authenticate();
    console.log('Database succesfully connected!');
} catch (error) {
    console.error(error);
}

// COOKIE-PARSER
app.use(cookieparser());
// CORS
// MAKE ONLY CAN ACCESS BY LOCALHOST PORT 3000
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
// FOR ROUTES
app.use(router);

// ONLINE LOCAL
app.listen(5000, () => console.log('Server running at port 5000'));