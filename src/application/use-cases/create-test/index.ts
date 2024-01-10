import { Test } from '@domain/entities/test/test';
import { Date, Uuid, Ip, Report, Script, User } from '@domain/entities/test/value-objects';
import { TestRepository } from '@domain/repositories/test-repository';
import { UuidGenerator } from '@domain/utils/uuidGenerator';

interface TestInterface {
    ip: string;
    date: Date;
    report: string;
    user: string;
    script: string;
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
            uuid: new Uuid(this.uuidGenerator.generate()),
            ip: new Ip(params.ip),
            date: new Date(params.date),
            report: new Report(params.report),
            user: new User(params.user),
            script: new Script(params.script),
        });
        const result = await this.testRepository.create(test);
        return {
            result,
            metadata: test.toPrimitives(),
        };
    }
}
