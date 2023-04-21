import { GetUserUseCase } from "../use-cases";
import { userRepositoryFactory } from "./user-repository.factory";

export const getUserUseCaseFactory = (): GetUserUseCase => {
  return new GetUserUseCase(userRepositoryFactory())
}