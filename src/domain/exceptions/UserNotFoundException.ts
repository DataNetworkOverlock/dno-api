import { Exception } from './Exception';

export class UserNotFoundException extends Exception {
    constructor() {
        super('User not found');
        this.returnMessage = 'Usuario no encontrado';
    }
}
