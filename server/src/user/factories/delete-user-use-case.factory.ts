import { DeleteUserUseCase } from "../use-cases";
import { userRepositoryFactory } from "./user-repository.factory";

export const deleteUserUseCaseFactory = (): DeleteUserUseCase => {
  return new DeleteUserUseCase(
    userRepositoryFactory(),
    // TODO: Adicionar quando token for criado
    // UserTokenRepositoryFactory()
  )
}