import { Test } from '@domain/entities/test/test';
import { Date, Id, Ip, Report, ScriptId, UserId } from '@domain/entities/test/value-objects';
import { TestRepository } from '@domain/repositories/test-repository';
import { UuidGenerator } from '@domain/utils/uuidGenerator';

interface TestInterface {
    ip: string;
    date: Date;
    report: string;
    userId: string;
    scriptId: string;
}

export class CreateTestUseCase {
    private readonly testRepository: TestRepository;
    private readonly uuidGenerator: UuidGenerator;

    constructor(testRepository: TestRepository, uuidGenerator: UuidGenerator) {
        this.testRepository = testRepository;
        this.uuidGenerator = uuidGenerator;
    }

    async run(params: TestInterface) {
        const test = new Test({
            id: new Id(this.uuidGenerator.generate()),
            ip: new Ip(params.ip),
            date: new Date(params.date),
            report: new Report(params.report),
            userId: new UserId(params.userId),
            scriptId: new ScriptId(params.scriptId),
        });
        return await this.testRepository.create(test);
    }
}
