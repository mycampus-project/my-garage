import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import mongo from './mongo';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());

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
