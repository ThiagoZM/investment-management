import {
  throwDatabaseError,
  throwInvalidParamError,
} from "../../shared/utils/helpers/throw-helpers";
import { ICreateUserRepository } from "../protocols/i-create-user-repository";
import { ICreateUserUseCase } from "../protocols/i-create-user-use-case";
import { IGetUserRepository } from "../protocols/i-get-user-repository";
import { UserMapper } from "../user.mapper";
import { UserAttributes } from "../user.model";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private _createUserRepository: ICreateUserRepository,
    private _getUserRepository: IGetUserRepository
  ) { }

  async execute(params: UserAttributes): Promise<string> {
    const user = UserMapper.toDomain(params);

    const emailExist = await this._getUserRepository.getOne({
      email: user.email,
    });

    if (emailExist) {
      throwInvalidParamError("email is already being used");
    }

    try {
      await this._createUserRepository.create(user);
    } catch (error: any) {
      console.error("Error creating user on database", error);
      throwDatabaseError(error.message);
    }

    return user.id;
  }
}
