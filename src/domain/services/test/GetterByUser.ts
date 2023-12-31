import { Test } from '@domain/entities/test/test';
import { TestNotFoundException } from '@domain/exceptions';
import { TestRepository } from '@domain/repositories/test-repository';

export class TestGetterByUser {
    private readonly testRepository: TestRepository;

    constructor(testRepository: TestRepository) {
        this.testRepository = testRepository;
    }

    async run(username: string): Promise<Test[]> {
        const tests = await this.testRepository.getByUser(username);
        if (tests.length < 1) {
            throw new TestNotFoundException();
        }
        return tests;
    }
}
