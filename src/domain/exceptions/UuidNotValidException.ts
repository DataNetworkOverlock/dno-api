import { Exception } from './Exception';

export class UuidNotValidException extends Exception {
    constructor() {
        super('UUID Not valid');
        this.returnMessage = 'El UUID ingresado no es válido';
    }
}
