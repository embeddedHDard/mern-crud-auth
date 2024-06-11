import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import authTasks from './routes/tasks.routes.js'
import cookieParser from 'cookie-parser' //para poder leer las cookies
import cors from 'cors'
import { createClient } from 'redis';

const corsOptions = {
   origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
   optionsSuccessStatus: 200,
   credentials: true
 };

 const redisClient = createClient({
  host: 'localhost',  
  port: 6379, 
});

redisClient.on('error', err => console.log('Redis Client Error', err));
await redisClient.connect();

const app = express();
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", authTasks);

export { app, redisClient };