import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import mongo from './mongo';
import apiContentType from './middlewares/apiContentType';
import apiErrorHandler from './middlewares/apiErrorHandler';
import authRouter from './routers/authRouter';
import { authMiddleware, requireAuth } from './middlewares/auth';
import createRoles from './helpers/createRoles';

const app = express();
app.use(json());
app.use(authMiddleware);

const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(apiContentType);

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/admin-only', requireAuth('admin'), (req, res) => res.send("Gratz, you're an admin"));
app.use('/auth', authRouter);

const listen = () => {
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
};

mongo.once('open', async () => {
  await createRoles();
  console.log('Mongo connection open');
  listen();
});

app.use(apiErrorHandler);
