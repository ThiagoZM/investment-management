import { Transaction } from "sequelize";
import { UserModel } from "../user.model";

export interface IUpdateUserRepository {
  update(user: UserModel, transaction?: Transaction): Promise<boolean>;
}