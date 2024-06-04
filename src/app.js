import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import authTasks from './routes/tasks.routes.js'
import cookieParser from 'cookie-parser' //para poder leer las cookies
import cors from 'cors'

const corsOptions = {
   origin: 'http://localhost:5173',
   optionsSuccessStatus: 200,
   credentials: true
 };

const app = express();
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", authTasks);

export default app;