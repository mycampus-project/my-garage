import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import mongo from './mongo';
import apiContentType from './middlewares/apiContentType';
import apiErrorHandler from './middlewares/apiErrorHandler';
import userRouter from './routers/userRouter';
import authMiddleware from './middlewares/auth/authMiddleware';

const app = express();
app.use(json());
app.use(authMiddleware);

const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(apiContentType);

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/user', userRouter);

const listen = () => {
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
};

mongo.once('open', () => {
  console.log('Mongo connection open');
  listen();
});

app.use(apiErrorHandler);
