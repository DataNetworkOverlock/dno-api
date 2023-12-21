import { Script } from '@domain/entities/script/script';
import { ScriptRepository } from '@domain/repositories/script-repository';

export class ScriptGetterUseCase {
    private readonly scriptRepository: ScriptRepository;

    constructor(scriptRepository: ScriptRepository) {
        this.scriptRepository = scriptRepository;
    }

    async run(): Promise<Script[]> {
        return await this.scriptRepository.getAll();
    }
}
