import express from 'express';

import { loginHandler, validateTokenHandler } from '../controllers/userContoller';

const userRouter = express.Router();

userRouter.post('/login', loginHandler);

userRouter.post('/validate', validateTokenHandler);

export default userRouter;
