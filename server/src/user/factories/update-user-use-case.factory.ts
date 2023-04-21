import { UpdateUserUseCase } from "../use-cases";
import { userRepositoryFactory } from "./user-repository.factory";

export const updateUserUseCaseFactory = (): UpdateUserUseCase => {
  return new UpdateUserUseCase(userRepositoryFactory())
}