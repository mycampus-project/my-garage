import express from 'express';

import { getMe, postLogin } from '../controllers/authController';

const userRouter = express.Router();

userRouter.post('/login', postLogin);
userRouter.get('/me', getMe);

export default userRouter;
