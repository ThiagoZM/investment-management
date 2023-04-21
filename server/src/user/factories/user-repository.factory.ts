import { UserRepository } from "../user.repository";

export const userRepositoryFactory = (): UserRepository => {
  return new UserRepository();
}