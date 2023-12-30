import { Exception } from './Exception';

export class UserAlreadyExistsException extends Exception {
    constructor() {
        super('User already exists');
        this.returnMessage = 'El usuario ya existe';
    }
}
