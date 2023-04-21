import { Transaction } from "sequelize";

export interface IDeleteUserTokenRepository {
  delete(
    filter: any,
    transaction?: Transaction
  ): Promise<number>
}