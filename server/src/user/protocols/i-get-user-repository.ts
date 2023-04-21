export interface IGetUserRepository {
    getOne(filter: any): Promise<any>;
}