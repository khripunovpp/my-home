import express from 'express';
import homeRoutes from './routes/homeRoutes';
import {errorHandler} from './middlewares/errorHandler';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())

// Routes
app.use('/api/home', homeRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;