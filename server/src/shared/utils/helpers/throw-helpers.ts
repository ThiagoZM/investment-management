import { 
    BadRequestErrorHandler, 
    DatabaseErrorHandler, 
    EnumBadRequestType, 
    NotFoundErrorHandler, 
    ServiceUnavailableErrorHandler 
} from "../error-handlers";

export function throwInvalidParamError(message: string) {
    throw new BadRequestErrorHandler(message, EnumBadRequestType.Invalid);
}

export function throwMissingParamError(message: string) {
    throw new BadRequestErrorHandler(message, EnumBadRequestType.Missing);
}

export function throwListError(message: string) {
    throw new BadRequestErrorHandler(message, EnumBadRequestType.Invalid);
}

export function throwControllerError(message: string) {
    throw new ServiceUnavailableErrorHandler(message, 'controller');
}

export function throwRedisError(message: string) {
    throw new ServiceUnavailableErrorHandler(message, 'redis');
}

export function throwNotFoundError(message: string) {
    throw new NotFoundErrorHandler(message);
}

export function throwDatabaseError(message: string) {
    throw new DatabaseErrorHandler(message);
}