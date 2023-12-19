import { Script } from '@domain/entities/script/script';
import { Description, Id, Name, Source } from '@domain/entities/script/value-objects';
import { ScriptRepository } from '@domain/repositories/script-repository';

interface ScriptInterface {
    id: string;
    name: string;
    description: string;
    source: string;
}

export class CreateScriptUseCase {
    private readonly scriptRepository: ScriptRepository;

    constructor(scriptRepository: ScriptRepository) {
        this.scriptRepository = scriptRepository;
    }

    async run(params: ScriptInterface) {
        // TODO - Add uuid generator
        const script = new Script({
            id: new Id(params.id),
            name: new Name(params.name),
            description: new Description(params.description),
            source: new Source(params.source),
        });
        return await this.scriptRepository.create(script);
    }
}
