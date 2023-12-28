import { Test } from '@domain/entities/test/test';
import { TestRepository } from '@domain/repositories/test-repository';

export class TestGetterById {
    private readonly testRepository: TestRepository;

    constructor(testRepository: TestRepository) {
        this.testRepository = testRepository;
    }

    async run(uuid: string): Promise<Test | null> {
        return await this.testRepository.getById(uuid);
    }
}
