import { throwDatabaseError } from "../../shared/utils/helpers/throw-helpers";
import { IUpdateUserRepository } from "../protocols/i-update-user-repository";
import { IUpdateUserUseCase } from "../protocols/i-update-user-use-case";
import { UserDto } from "../protocols/user.dto";
import { UserMapper } from "../user.mapper";

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private _userRepository: IUpdateUserRepository) { }

  async execute(params: UserDto): Promise<boolean> {
    try {
      const user = UserMapper.toDomain(params);
      const updatedUser = await this._userRepository.update(user);
      return updatedUser;
    } catch (error: any) {
      console.error('Error updating User on Database!', error);
      throwDatabaseError(error.message)
    }
    return false;
  }
}
