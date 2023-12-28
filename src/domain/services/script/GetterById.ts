import { Script } from '@domain/entities/script/script';
import { ScriptRepository } from '@domain/repositories/script-repository';

export class ScriptGetterById {
    private readonly scriptRepository: ScriptRepository;

    constructor(scriptRepository: ScriptRepository) {
        this.scriptRepository = scriptRepository;
    }

    async run(uuid: string): Promise<Script> {
        return await this.scriptRepository.getById(uuid);
    }
}
