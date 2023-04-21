import { NextFunction, Request, Response } from "express";
import { ICreateUserUseCase } from "./protocols/i-create-user-use-case";
import { IDeleteUserUseCase } from "./protocols/i-delete-user-use-case";
import { IGetUserUseCase } from "./protocols/i-get-user-use-case";
import { IGetUsersUseCase } from "./protocols/i-get-users-use-case";
import { IUpdateUserUseCase } from "./protocols/i-update-user-use-case";
import { UserMapper } from "./user.mapper";
import { ErrorHandler } from "../shared/utils/error-handlers/ErrorHandler";

export class UserController {
  constructor(
    private _getUsersUseCase: IGetUsersUseCase,
    private _getUserUseCase: IGetUserUseCase,
    private _createUserUseCase: ICreateUserUseCase,
    private _updateUserUseCase: IUpdateUserUseCase,
    private _deleteUserUseCase: IDeleteUserUseCase
  ) { }

  async index(req: Request, res: Response) {
    try {
      const queryParams = req.params;
      const paramsToFilter = { ...queryParams };
      const users = await this._getUsersUseCase.execute(paramsToFilter);
      const usersDto = users.map((user) => {
        UserMapper.toDTO(user);
      });
      return res.json(usersDto);
    } catch (error: any) {
      if (error instanceof ErrorHandler) {
        console.error(error.showOnConsole());
        return error.messageToClient(res);
      }
      console.log(error);
      return res.status(500).json({ error: 'server error' });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await this._getUserUseCase.execute(userId);
      let userDto = null;
      if (user) {
        userDto = UserMapper.toDTO(user);
      }
      return res.json(userDto);
    } catch (error: any) {
      if (error instanceof ErrorHandler) {
        console.error(error.showOnConsole());
        return error.messageToClient(res);
      }
      console.log(error);
      return res.status(500).json({ error: 'server error' });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const userSavedId = this._createUserUseCase.execute({ ...body });
      res.status(200).json({ id: userSavedId });
      next();
    } catch (error: any) {
      if (error instanceof ErrorHandler) {
        console.error(error.showOnConsole());
        return error.messageToClient(res);
      }
      console.log(error);
      return res.status(500).json({ error: 'server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const body = req.body;
      const { userId } = req.params;
      await this._updateUserUseCase.execute({ ...body, userId });
      return res.status(200).json({ message: 'User updated!' });
    } catch (error: any) {
      if (error instanceof ErrorHandler) {
        console.error(error.showOnConsole());
        return error.messageToClient(res);
      }
      console.log(error);
      return res.status(500).json({ error: 'server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const userDeleted = this._deleteUserUseCase.execute(userId);
      return res.status(200).json({ message: userDeleted });
    } catch (error: any) {
      if (error instanceof ErrorHandler) {
        console.error(error.showOnConsole());
        return error.messageToClient(res);
      }
      console.log(error);
      return res.status(500).json({ error: 'server error' });
    }
  }
}