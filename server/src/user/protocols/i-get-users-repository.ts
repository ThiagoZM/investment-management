import { UserModel } from "../user.model";

export interface IGetUsersRepository {
  getAll(filter: any): Promise<Array<UserModel>>;
}