import { UserDto } from "./user.dto";

export interface IUpdateUserUseCase {
  execute(user: UserDto): Promise<boolean>
}