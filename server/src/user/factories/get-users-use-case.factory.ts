import { GetUsersUseCase } from "../use-cases";
import { userRepositoryFactory } from "./user-repository.factory";

export const getUsersUseCaseFactory = (): GetUsersUseCase => {
  return new GetUsersUseCase(userRepositoryFactory())
}