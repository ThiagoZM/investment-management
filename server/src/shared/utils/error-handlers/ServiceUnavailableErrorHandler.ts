import { ControllerError, RedisError } from '../errors';
import { ErrorHandler } from './ErrorHandler';

export class ServiceUnavailableErrorHandler extends ErrorHandler {
    constructor(message: string, type: 'controller' | 'redis') {
        super(503, message);
        switch (type) {
            case 'controller':
                this.error = new ControllerError(message);
                break;
            case 'redis':
                this.error = new RedisError(message);
                break;
            default:
                this.error = new Error(message);
        }
    }
}
