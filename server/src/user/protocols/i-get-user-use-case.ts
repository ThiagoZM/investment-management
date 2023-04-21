export interface IGetUserUseCase {
  execute(filter: any): Promise<any>;
}