import { Script } from '@domain/entities/script/script';
import { Description, Id, Name, Source, Tags } from '@domain/entities/script/value-objects';
import { ScriptRepository } from '@domain/repositories/script-repository';
import { UuidGenerator } from '@domain/utils/uuidGenerator';

interface ScriptInterface {
    name: string;
    description: string;
    source: string;
    tags: string[];
}

export class CreateScriptUseCase {
    private readonly scriptRepository: ScriptRepository;
    private readonly uuidGenerator: UuidGenerator;

    constructor(scriptRepository: ScriptRepository, uuidGenerator: UuidGenerator) {
        this.scriptRepository = scriptRepository;
        this.uuidGenerator = uuidGenerator;
    }

    async run(params: ScriptInterface) {
        const script = new Script({
            id: new Id(this.uuidGenerator.generate()),
            name: new Name(params.name),
            description: new Description(params.description),
            source: new Source(params.source),
            tags: new Tags(params.tags),
        });
        return await this.scriptRepository.create(script);
    }
}
