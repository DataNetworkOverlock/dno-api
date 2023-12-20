import { Script } from '@domain/entities/script/script';
import { ScriptRepository } from '@domain/repositories/script-repository';

export class ScriptGetterById {
    private readonly scriptRepository: ScriptRepository;

    constructor(scriptRepository: ScriptRepository) {
        this.scriptRepository = scriptRepository;
    }

    async run(id: string): Promise<Script> {
        const script = await this.scriptRepository.getById(id);
        if (!script) {
            // TODO - Add exceptions
            throw new Error('ScriptId not found');
        }
        return script;
    }
}
