import { Transaction } from "sequelize";
import { ICreateUserRepository } from "./protocols/i-create-user-repository";
import { IDeleteUserRepository } from "./protocols/i-delete-user-repository";
import { IGetUserRepository } from "./protocols/i-get-user-repository";
import { IGetUsersRepository } from "./protocols/i-get-users-repository";
import { IUpdateUserRepository } from "./protocols/i-update-user-repository";
import { UserModel } from "./user.model";
import { throwDatabaseError, throwInvalidParamError, throwNotFoundError } from "../shared/utils/helpers/throw-helpers";
import { validateNumber, validateString, validateUuid } from "../shared/utils/validators";

export class UserRepository implements
  ICreateUserRepository,
  IGetUserRepository,
  IGetUsersRepository,
  IDeleteUserRepository,
  IUpdateUserRepository {

  async create(user: UserModel, transaction?: Transaction | undefined): Promise<boolean> {
    try {
      return !!(await user.save({ transaction }));
    } catch (error: any) {
      throwDatabaseError(error);
    }
    return false;
  }

  async update(user: UserModel, transaction: Transaction | undefined): Promise<boolean> {
    const currentUser = await this.exist({
      where: { id: user.id }
    });

    if (!currentUser) {
      throwNotFoundError('User not found');
    }

    try {
      await currentUser?.update(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          iof: user.iof,
          spread: user.spread
        },
        { transaction }
      );
      return true;
    } catch (error: any) {
      throwDatabaseError(error);
    }

    return false;
  }

  async getAll(filter: any) {
    try {
      const query = { where: {} };
      const queryFormat = this.formatQuery(filter, query);
      queryFormat.order = [['createdAt', 'DESC']];
      return await UserModel.findAll(queryFormat);
    } catch (error: any) {
      console.error(error);
      throwDatabaseError(error);
    }
    return [];
  }

  async getOne(userId: string) {
    try {
      const user = await UserModel.findOne({
        where: { id: userId }
      });
      return user;
    } catch (error: any) {
      console.error(error);
      throwDatabaseError(error);
    }
  }

  async delete(userId: string, transaction?: Transaction | undefined): Promise<number> {
    try {
      const count = await UserModel.destroy({
        where: { id: userId }
      });
      return count;
    } catch (error: any) {
      console.error(error);
      throwDatabaseError(error);
    }
    return 0;
  }

  private async exist(query: Object): Promise<UserModel | null> {
    const exist = await UserModel.findOne(query);
    return exist;
  }

  private formatQuery(filter: any, query: any) {
    try {
      if (filter.id) {
        validateUuid('id', filter.id);
        query.where.id = filter.id
      }

      if (filter.firstName) {
        validateString('firstName', filter.firstName);
        query.where.firstName = filter.firstName
      }

      if (filter.lastName) {
        validateString('lastName', filter.lastName);
        query.where.lastName = filter.lastName
      }

      if (filter.iof) {
        validateNumber('iof', filter.iof);
        query.where.iof = filter.iof
      }

      if (filter.spread) {
        validateNumber('spread', filter.spread);
        query.where.spread = filter.spread
      }

      return query;
    } catch (error: any) {
      console.error(error);
      throwInvalidParamError('Filter parameters are incorrect');
    }
  }
}