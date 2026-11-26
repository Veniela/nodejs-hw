
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(pinoHttp());

// GET /notes - отримати всі нотатки
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

// GET /notes/:noteId - отримати нотатку за ID
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// GET /test-error - тестування обробки помилок
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// Middleware для неіснуючих маршрутів (404)
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// Middleware для обробки помилок (500)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
