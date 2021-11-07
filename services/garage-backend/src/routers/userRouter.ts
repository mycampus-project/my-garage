import express from 'express';

import { loginHandler } from '../controllers/userContoller';

const userRouter = express.Router();

userRouter.post('/login', loginHandler);

export default userRouter;
