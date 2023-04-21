import { TransactionBuilder } from "../../shared/database/transaction-builder";
import { throwDatabaseError, throwInvalidParamError, throwNotFoundError } from "../../shared/utils/helpers/throw-helpers";
import { validateUuid } from "../../shared/utils/validators";
import { IDeleteUserRepository } from "../protocols/i-delete-user-repository";
import { IDeleteUserTokenRepository } from "../protocols/i-delete-user-token-repository";
import { IDeleteUserUseCase } from "../protocols/i-delete-user-use-case";

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    private _userRepository: IDeleteUserRepository,
    // private _userTokenRepository: IDeleteUserTokenRepository
  ) { }

  async execute(id: string) {
    const transaction = await TransactionBuilder.build()

    if (!validateUuid('userId', id)) {
      throwInvalidParamError('userId does not have valid format');
    }

    try {
      // TODO: Adicionar quando token for criado
      // await this._userTokenRepository.delete({ usedId: id }, transaction);
      const count = await this._userRepository.delete(id, transaction);
      await transaction.commit();
      return count;
    } catch (error: any) {
      console.error('Error deleting user on database!', error);
      await transaction.rollback();
      throwDatabaseError(error.message);
    }
    //Retorno final caso não realize nada
    return 0;
  }
}