import { Exception } from './Exception';

export class SQLException extends Exception {
    constructor(message: string) {
        super('Error in SQL Syntax');
        this.status = 500;
        this.returnMessage = 'Error interno de la base de datos';
        console.log(message);
    }
}
