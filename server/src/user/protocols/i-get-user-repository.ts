import { UserModel } from "../user.model";

export interface IGetUserRepository {
    getOne(filter: any): Promise<any>;
}