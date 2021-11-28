import express from 'express';
import cors from 'cors';

import mongo from './mongo';
import apiErrorHandler from './middlewares/apiErrorHandler';
import authRouter from './routers/authRouter';
import { authMiddleware, requireAuth } from './middlewares/auth';
import createRoles from './helpers/createRoles';
import thingRouter from './routers/thingRouter';
import userRouter from './routers/userRouter';
import typeRouter from './routers/typeRouter';
import bookingRouter from './routers/bookingRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('./uploads'));
app.use(authMiddleware);

const PORT = process.env.PORT ?? 3000;

app.use(cors());

app.use('/things', thingRouter);
app.use('/users', userRouter);
app.use('/types', typeRouter);
app.use('/bookings', bookingRouter);

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.use('/auth', authRouter);
app.get('/admin-only', requireAuth('admin'), (req, res) => res.send("Gratz, you're an admin"));

app.use(apiErrorHandler);

process.on('uncaughtException', (error) => {
  console.log(error);
});

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

export default app;
