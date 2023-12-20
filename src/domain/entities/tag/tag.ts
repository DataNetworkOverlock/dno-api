import { Id, Name } from '@domain/entities/tag/value-objects';
import { EntityRoot } from '@domain/entities/entity-root';

interface PrimitiveData {
    id: number;
    name: string;
}

export class Tag extends EntityRoot<Tag, PrimitiveData> {
    readonly id: Id;
    readonly name: Name;

    constructor({ id, name }: { id: Id; name: Name }) {
        super();
        this.id = id;
        this.name = name;
    }

    static create(id: Id, name: Name): Tag {
        const tag = new Tag({
            id,
            name,
        });

        return tag;
    }

    static fromPrimitives(plainData: { id: number; name: string }): Tag {
        return new Tag({
            id: new Id(plainData.id),
            name: new Name(plainData.name),
        });
    }

    toPrimitives(): PrimitiveData {
        return {
            id: this.id.value,
            name: this.name.value,
        };
    }
}
