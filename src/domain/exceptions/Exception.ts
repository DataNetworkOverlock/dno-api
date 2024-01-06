export class Exception extends Error {
    status: number;
    returnMessage: string;

    constructor(message?: string) {
        super(message);
        this.status = 400;
        this.returnMessage = 'Error desconocido';
    }
}
