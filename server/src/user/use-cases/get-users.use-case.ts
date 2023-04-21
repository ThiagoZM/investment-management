import { IGetUsersRepository } from "../protocols/i-get-users-repository";
import { IGetUsersUseCase } from "../protocols/i-get-users-use-case";
import { UserModel } from "../user.model";

export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(private _userRepository: IGetUsersRepository) { }

  async execute(filter: any): Promise<UserModel[]> {
    return await this._userRepository.getAll(filter);
  }
}