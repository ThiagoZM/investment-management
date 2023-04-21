import { userControllerFactory } from "./factories";
import express from 'express';

const userController = userControllerFactory();
const userRouter = express.Router({ mergeParams: true });

userRouter.get('', (req, res) => userController.index(req, res));
userRouter.get('/:userId', (req, res) => userController.getOne(req, res));
userRouter.post('', (req, res, next) => userController.create(req, res, next));
userRouter.put('/:userId', (req, res) => userController.update(req, res));
userRouter.delete('/:userId', (req, res) => userController.delete(req, res));

export { userRouter };

