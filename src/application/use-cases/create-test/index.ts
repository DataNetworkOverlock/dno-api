import { Test } from '@domain/entities/test/test';
import { Date, Id, Ip, Report, ScriptId, UserId } from '@domain/entities/test/value-objects';
import { TestRepository } from '@domain/repositories/test-repository';

interface TestInterface {
    id: string;
    ip: string;
    date: Date;
    report: string;
    userId: string;
    scriptId: string;
}

export class CreateTestUseCase {
    private readonly testRepository: TestRepository;

    constructor(testRepository: TestRepository) {
        this.testRepository = testRepository;
    }

    async run(params: TestInterface) {
        // TODO - Add uuid generator
        const test = new Test({
            id: new Id(params.id),
            ip: new Ip(params.ip),
            date: new Date(params.date),
            report: new Report(params.report),
            userId: new UserId(params.userId),
            scriptId: new ScriptId(params.scriptId),
        });
        return await this.testRepository.create(test);
    }
}
