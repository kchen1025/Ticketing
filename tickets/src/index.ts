import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@ticketing-system/common';
import { createTicketRouter } from '../routes/new';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({ signed: false, secure: true }));

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(currentUser);

app.use(createTicketRouter);

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be definedd');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000???');
  });
};

start();
