import { UserModel } from "../user.model";
import {Transaction} from "sequelize"

export interface ICreateUserRepository {
    create(
        user: UserModel,
        transaction?: Transaction
    ): Promise<boolean>
}