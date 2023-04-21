import { CreateUserUseCase } from "../use-cases";
import { userRepositoryFactory } from "./user-repository.factory";

export const createUserUseCaseFactory = (): CreateUserUseCase => {
  const userRepository = userRepositoryFactory();
  return new CreateUserUseCase(userRepository, userRepository)
}