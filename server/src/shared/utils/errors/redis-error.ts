export class RedisError extends Error {
    constructor(message: string) {
        super(`Error on redis: ${message}`);
        this.name = 'RedisError';
    }
}
