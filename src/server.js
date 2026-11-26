
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectMongoDB from './db/connectMongoDB.js';
import logger from './middlewares/logger.js';
import notesRoutes from './routes/notesRoutes.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(logger);
app.use(express.json());
app.use(cors());

// Routes
app.use(notesRoutes);

// Middleware для неіснуючих маршрутів
app.use(notFoundHandler);

// Middleware для обробки помилок
app.use(errorHandler);

// Запуск сервера
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();
