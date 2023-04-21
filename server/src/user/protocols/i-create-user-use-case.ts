import { UserAttributes } from "../user.model";

export interface ICreateUserUseCase {
    execute(user: UserAttributes): Promise<string>;
}