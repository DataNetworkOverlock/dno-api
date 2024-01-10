import { Exception } from "./Exception";

export class InvalidTokenException extends Exception {
    constructor() {
        super('Token expired');
        this.status = 500;
        this.returnMessage = 'La sesión ha finalizado o no es válida.';
    }
}