import { Test } from '@domain/entities/test/test';
import { DefaultException } from '@domain/exceptions';
import { TestRepository } from '@domain/repositories/test-repository';

export class TestGetterUseCase {
    private readonly testRepository: TestRepository;

    constructor(testRepository: TestRepository) {
        this.testRepository = testRepository;
    }

    async run(): Promise<Test[]> {
        const tests = await this.testRepository.getAll();
        if (tests.length < 1) throw new DefaultException('No Tests found');
        return tests;
    }
}
