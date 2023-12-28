import { Script } from '@domain/entities/script/script';
import { ScriptRepository } from '@domain/repositories/script-repository';

export class ScriptGetterUseCase {
    private readonly scriptRepository: ScriptRepository;

    constructor(scriptRepository: ScriptRepository) {
        this.scriptRepository = scriptRepository;
    }

    async run(): Promise<Script[]> {
        const scripts = await this.scriptRepository.getAll();
        if (scripts.length < 1) throw new Error('No Scripts found');
        return scripts;
    }
}
