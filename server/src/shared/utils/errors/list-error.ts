export class ListError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ListError';
    }
}
