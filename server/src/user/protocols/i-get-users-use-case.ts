import { UserModel } from "../user.model";

export interface IGetUsersUseCase {
  execute(filter: any): Promise<Array<UserModel>>;
}