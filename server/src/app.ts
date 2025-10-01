import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v1Routes } from './module/v1';
import { errorMiddleware } from './middleware/error.middleware';

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      id: number;
    }
  }
}

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// routes
app.get('/ping', (req, res) => res.send('pong'));
app.use('/v1', v1Routes);

// error handler
app.use(errorMiddleware);

export { app };
