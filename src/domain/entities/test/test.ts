import { Date, Uuid, Ip, Report, ScriptId, UserId } from '@domain/entities/test/value-objects';
import { EntityRoot } from '@domain/entities/entity-root';

interface PrimitiveData {
    uuid: string;
    ip: string;
    date: Date;
    report: string;
    userId: string;
    scriptId: string;
}

export class Test extends EntityRoot<Test, PrimitiveData> {
    readonly uuid: Uuid;
    readonly ip: Ip;
    readonly date: Date;
    readonly report: Report;
    readonly userId: UserId;
    readonly scriptId: ScriptId;

    constructor({
        uuid,
        ip,
        date,
        report,
        userId,
        scriptId,
    }: {
        uuid: Uuid;
        ip: Ip;
        date: Date;
        report: Report;
        userId: UserId;
        scriptId: ScriptId;
    }) {
        super();
        this.uuid = uuid;
        this.ip = ip;
        this.date = date;
        this.report = report;
        this.userId = userId;
        this.scriptId = scriptId;
    }

    static create(uuid: Uuid, ip: Ip, date: Date, report: Report, userId: UserId, scriptId: ScriptId): Test {
        const test = new Test({
            uuid,
            ip,
            date,
            report,
            userId,
            scriptId,
        });

        return test;
    }

    static fromPrimitives(plainData: {
        uuid: string;
        ip: string;
        date: Date;
        report: string;
        userId: string;
        scriptId: string;
    }): Test {
        return new Test({
            uuid: new Uuid(plainData.uuid),
            ip: new Ip(plainData.ip),
            date: new Date(plainData.date),
            report: new Report(plainData.report),
            userId: new UserId(plainData.userId),
            scriptId: new ScriptId(plainData.scriptId),
        });
    }

    toPrimitives(): PrimitiveData {
        return {
            uuid: this.uuid.value,
            ip: this.ip.value,
            date: this.date.value,
            report: this.report.value,
            userId: this.userId.value,
            scriptId: this.scriptId.value,
        };
    }
}
