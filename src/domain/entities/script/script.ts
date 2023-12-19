import { EntityRoot } from '@domain/entities/entity-root';
import { Description, Id, Name, Source } from '@domain/entities/script/value-objects';

interface PrimitiveData {
    id: string;
    name: string;
    description: string;
    source: string;
}

export class Script extends EntityRoot<Script, PrimitiveData> {
    readonly id: Id;
    readonly name: Name;
    readonly description: Description;
    readonly source: Source;

    constructor({ id, name, description, source }: { id: Id; name: Name; description: Description; source: Source }) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.source = source;
    }

    static create(id: Id, name: Name, description: Description, source: Source): Script {
        const script = new Script({
            id,
            name,
            description,
            source,
        });

        return script;
    }

    static fromPrimitives(plainData: { id: string; name: string; description: string; source: string }): Script {
        return new Script({
            id: new Id(plainData.id),
            name: new Name(plainData.name),
            description: new Description(plainData.description),
            source: new Source(plainData.source),
        });
    }

    toPrimitives(): PrimitiveData {
        return {
            id: this.id.value,
            name: this.name.value,
            description: this.description.value,
            source: this.source.value,
        };
    }
}
