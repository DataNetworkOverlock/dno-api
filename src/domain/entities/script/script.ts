import { EntityRoot } from '@domain/entities/entity-root';
import { Description, Uuid, Name, Source, Tags } from '@domain/entities/script/value-objects';

interface PrimitiveData {
    uuid: string;
    name: string;
    description: string;
    source: string;
    tags: string[];
}

export class Script extends EntityRoot<Script, PrimitiveData> {
    readonly uuid: Uuid;
    readonly name: Name;
    readonly description: Description;
    readonly source: Source;
    readonly tags: Tags;

    constructor({
        uuid,
        name,
        description,
        source,
        tags,
    }: {
        uuid: Uuid;
        name: Name;
        description: Description;
        source: Source;
        tags: Tags;
    }) {
        super();
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.source = source;
        this.tags = tags;
    }

    static create(uuid: Uuid, name: Name, description: Description, source: Source, tags: Tags): Script {
        const script = new Script({
            uuid,
            name,
            description,
            source,
            tags,
        });

        return script;
    }

    static fromPrimitives(plainData: {
        uuid: string;
        name: string;
        description: string;
        source: string;
        tags: string[];
    }): Script {
        return new Script({
            uuid: new Uuid(plainData.uuid),
            name: new Name(plainData.name),
            description: new Description(plainData.description),
            source: new Source(plainData.source),
            tags: new Tags(plainData.tags),
        });
    }

    toPrimitives(): PrimitiveData {
        return {
            uuid: this.uuid.value,
            name: this.name.value,
            description: this.description.value,
            source: this.source.value,
            tags: this.tags.value,
        };
    }
}
