import { UuidGenerator } from '@domain/utils/uuidGenerator';
import { v4 } from 'uuid';

export class UuidV4Generator implements UuidGenerator {
    generate(): string {
        return v4();
    }
}
