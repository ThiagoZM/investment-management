import { UserController } from "../user.controller"
import { createUserUseCaseFactory } from "./create-user-use-case.factory"
import { deleteUserUseCaseFactory } from "./delete-user-use-case.factory"
import { getUserUseCaseFactory } from "./get-user-use-case.factory"
import { getUsersUseCaseFactory } from "./get-users-use-case.factory"
import { updateUserUseCaseFactory } from "./update-user-use-case.factory"

export const userControllerFactory = (): UserController => {
  return new UserController(
    getUsersUseCaseFactory(),
    getUserUseCaseFactory(),
    createUserUseCaseFactory(),
    updateUserUseCaseFactory(),
    deleteUserUseCaseFactory()
  )
}