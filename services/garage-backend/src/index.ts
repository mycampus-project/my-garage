import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import mongo from './mongo';
import apiContentType from './middlewares/apiContentType';
import apiErrorHandler from './middlewares/apiErrorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(apiContentType);

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

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
