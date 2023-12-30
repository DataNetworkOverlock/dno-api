import { Exception } from './Exception';

export class TestNotFoundException extends Exception {
    constructor() {
        super('Test not found');
        this.returnMessage = 'No se encontró ningún test';
    }
}
