import { Script } from '@domain/entities/script/script';

export interface ScriptRepository {
    create: (script: Script) => Promise<Script>;
    delete: (uuid: string) => Promise<void>;
    getById: (uuid: string) => Promise<Script>;
    getAll: () => Promise<Script[]>;
}
