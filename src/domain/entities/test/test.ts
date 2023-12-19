import { Date, Id, Ip, Report, ScriptId, UserId } from '@domain/entities/test/value-objects';
import { EntityRoot } from '@domain/entities/entity-root';

interface PrimitiveData {
    id: string;
    ip: string;
    date: Date;
    report: string;
    userId: string;
    scriptId: string;
}

export class Test extends EntityRoot<Test, PrimitiveData> {
    readonly id: Id;
    readonly ip: Ip;
    readonly date: Date;
    readonly report: Report;
    readonly userId: UserId;
    readonly scriptId: ScriptId;

    constructor({
        id,
        ip,
        date,
        report,
        userId,
        scriptId,
    }: {
        id: Id;
        ip: Ip;
        date: Date;
        report: Report;
        userId: UserId;
        scriptId: ScriptId;
    }) {
        super();
        this.id = id;
        this.ip = ip;
        this.date = date;
        this.report = report;
        this.userId = userId;
        this.scriptId = scriptId;
    }

    static create(id: Id, ip: Ip, date: Date, report: Report, userId: UserId, scriptId: ScriptId): Test {
        const test = new Test({
            id,
            ip,
            date,
            report,
            userId,
            scriptId,
        });

        return test;
    }

    static fromPrimitives(plainData: {
        id: string;
        ip: string;
        date: Date;
        report: string;
        userId: string;
        scriptId: string;
    }): Test {
        return new Test({
            id: new Id(plainData.id),
            ip: new Ip(plainData.ip),
            date: new Date(plainData.date),
            report: new Report(plainData.report),
            userId: new UserId(plainData.userId),
            scriptId: new ScriptId(plainData.scriptId),
        });
    }

    toPrimitives(): PrimitiveData {
        return {
            id: this.id.value,
            ip: this.ip.value,
            date: this.date.value,
            report: this.report.value,
            userId: this.userId.value,
            scriptId: this.scriptId.value,
        };
    }
}
