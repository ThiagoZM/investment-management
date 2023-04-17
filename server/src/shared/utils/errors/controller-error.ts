export class ControllerError extends Error {
    constructor(message: string) {
        super(`Error on controller: ${message}`);
        this.name = 'ControllerError';
    }
}