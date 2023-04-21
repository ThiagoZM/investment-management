import { Transaction } from "sequelize";

export interface IDeleteUserRepository {
  delete(
    userId: string,
    transaction?: Transaction
  ): Promise<number>
}