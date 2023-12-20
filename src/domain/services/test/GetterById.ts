import { Test } from '@domain/entities/test/test';
import { TestRepository } from '@domain/repositories/test-repository';

export class TestGetterById {
    private readonly testRepository: TestRepository;

    constructor(testRepository: TestRepository) {
        this.testRepository = testRepository;
    }

    async run(testId: string): Promise<Test> {
        const test = await this.testRepository.getById(testId);
        if (!test) {
            throw new Error('TestId not found');
        }
        return test;
    }
}
