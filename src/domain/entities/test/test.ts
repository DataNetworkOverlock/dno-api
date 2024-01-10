import { Date, Uuid, Ip, Report, Script, User } from '@domain/entities/test/value-objects';
import { EntityRoot } from '@domain/entities/entity-root';

interface PrimitiveData {
    uuid: string;
    ip: string;
    date: Date;
    report: string;
    user: string;
    script: string;
}

export class Test extends EntityRoot<Test, PrimitiveData> {
    readonly uuid: Uuid;
    readonly ip: Ip;
    readonly date: Date;
    readonly report: Report;
    readonly user: User;
    readonly script: Script;

    constructor({
        uuid,
        ip,
        date,
        report,
        user,
        script,
    }: {
        uuid: Uuid;
        ip: Ip;
        date: Date;
        report: Report;
        user: User;
        script: Script;
    }) {
        super();
        this.uuid = uuid;
        this.ip = ip;
        this.date = date;
        this.report = report;
        this.user = user;
        this.script = script;
    }

    static create(uuid: Uuid, ip: Ip, date: Date, report: Report, user: User, script: Script): Test {
        const test = new Test({
            uuid,
            ip,
            date,
            report,
            user,
            script,
        });

        return test;
    }

    static fromPrimitives(plainData: {
        uuid: string;
        ip: string;
        date: Date;
        report: string;
        user: string;
        script: string;
    }): Test {
        return new Test({
            uuid: new Uuid(plainData.uuid),
            ip: new Ip(plainData.ip),
            date: new Date(plainData.date),
            report: new Report(plainData.report),
            user: new User(plainData.user),
            script: new Script(plainData.script),
        });
    }

    toPrimitives(): PrimitiveData {
        return {
            uuid: this.uuid.value,
            ip: this.ip.value,
            date: this.date.value,
            report: this.report.value,
            user: this.user.value,
            script: this.script.value,
        };
    }
}
