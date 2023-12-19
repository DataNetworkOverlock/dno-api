import { Script } from '@domain/entities/script/script';

export interface ScriptRepository {
    create: (script: Script) => Promise<Script>;
    delete: (id: string) => Promise<void>;
    getById: (id: string) => Promise<Script>;
    getAll: () => Promise<Script[]>;
}
