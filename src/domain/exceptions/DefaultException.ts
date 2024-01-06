import { Exception } from './Exception';

export class DefaultException extends Exception {
    constructor(message: string) {
        super(message);
        this.returnMessage = message;
    }
}
