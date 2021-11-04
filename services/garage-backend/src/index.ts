import express from 'express';

// import mongo from './mongo';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

const listen = () => {
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
};

listen();
console.log(process.env.MONGODB_URL);
// mongo.once('open', () => console.log('Mongo connection open'));
