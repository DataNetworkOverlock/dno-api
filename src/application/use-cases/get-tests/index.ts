import { Test } from '@domain/entities/test/test';
import { TestRepository } from '@domain/repositories/test-repository';

export class TestGetterUseCase {
    private readonly testRepository: TestRepository;

    constructor(testRepository: TestRepository) {
        this.testRepository = testRepository;
    }

    async run(): Promise<Test[]> {
        return await this.testRepository.getAll();
    }
}
