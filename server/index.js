import './env.js';
import express from 'express';
import router from './router.js';
import cors from 'cors';
import connectDB from './config/db.js';
import scheduler from './utils/scheduler.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { initConfig } from './utils/config.js';

const app = express();
const PORT = process.env.PORT || 5000;

const whitelist = ['https://simenmh.com', 'https://www.simenmh.com'];

if (process.env.NODE_ENV === 'development') {
  whitelist.push('http://localhost:3000', undefined);
}
app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(router);

app.use(notFound);
app.use(errorHandler);

connectDB();
initConfig();
scheduler.init();
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}/ 🚀`
  )
);
