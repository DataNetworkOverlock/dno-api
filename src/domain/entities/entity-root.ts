/* eslint-disable @typescript-eslint/no-unused-vars */
export abstract class EntityRoot<Entity, PrimitiveData> {
    abstract toPrimitives(): PrimitiveData;
}
