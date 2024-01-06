import { Exception } from './Exception';

export class NotAuthenticatedException extends Exception {
    constructor() {
        super('Access denied');
        this.status = 401;
        this.returnMessage = 'Acceso denegado. El usuario no está autenticado.';
    }
}
