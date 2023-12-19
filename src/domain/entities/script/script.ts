import { EntityRoot } from '@domain/entities/entity-root';
import { Description, Id, Name, Source, Tags } from '@domain/entities/script/value-objects';

interface PrimitiveData {
    id: string;
    name: string;
    description: string;
    source: string;
    tags: string[];
}

export class Script extends EntityRoot<Script, PrimitiveData> {
    readonly id: Id;
    readonly name: Name;
    readonly description: Description;
    readonly source: Source;
    readonly tags: Tags;

    constructor({
        id,
        name,
        description,
        source,
        tags,
    }: {
        id: Id;
        name: Name;
        description: Description;
        source: Source;
        tags: Tags;
    }) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.source = source;
        this.tags = tags;
    }

    static create(id: Id, name: Name, description: Description, source: Source, tags: Tags): Script {
        const script = new Script({
            id,
            name,
            description,
            source,
            tags,
        });

        return script;
    }

    static fromPrimitives(plainData: {
        id: string;
        name: string;
        description: string;
        source: string;
        tags: string[];
    }): Script {
        return new Script({
            id: new Id(plainData.id),
            name: new Name(plainData.name),
            description: new Description(plainData.description),
            source: new Source(plainData.source),
            tags: new Tags(plainData.tags),
        });
    }

    toPrimitives(): PrimitiveData {
        return {
            id: this.id.value,
            name: this.name.value,
            description: this.description.value,
            source: this.source.value,
            tags: this.tags.value,
        };
    }
}
