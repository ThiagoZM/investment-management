import { uuidGenerator } from "../shared/utils/helpers/uuid-generator-helper";
import { UserDto } from "./protocols/user.dto";
import { UserModel } from './user.model'

export class UserMapper {
  static toDomain(raw: any): UserModel {
    const userParams = {
      id: raw.id || uuidGenerator(),
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: raw.email,
      password: raw.password,
      iof: raw.iof,
      spread: raw.spread
    };
    UserModel.validate(userParams);
    return new UserModel(userParams);
  }

  static toDTO(user: UserModel): UserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      iof: user.iof,
      spread: user.spread,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}