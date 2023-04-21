import { throwInvalidParamError } from "../../shared/utils/helpers/throw-helpers";
import { validateUuid } from "../../shared/utils/validators";
import { IGetUserRepository } from "../protocols/i-get-user-repository";
import { IGetUserUseCase } from "../protocols/i-get-user-use-case";
import { UserModel } from "../user.model";

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private _userRepository: IGetUserRepository) { }

  async execute(userId: string): Promise<UserModel> {
    if (!validateUuid('userId', userId)) {
      throwInvalidParamError('userId does not have valid format');
    }

    return await this._userRepository.getOne(userId);
  }
}