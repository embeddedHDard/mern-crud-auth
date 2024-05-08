import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import authTasks from './routes/tasks.routes.js'
import cookieParser from 'cookie-parser' //para poder leer las cookies

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", authTasks);

export default app;