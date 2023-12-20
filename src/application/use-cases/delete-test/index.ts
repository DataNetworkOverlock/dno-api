import { TestRepository } from '@domain/repositories/test-repository';

export class DeleteTestUseCase {
    private readonly testRepository: TestRepository;

    constructor(testRepository: TestRepository) {
        this.testRepository = testRepository;
    }

    async run(id: string) {
        return await this.testRepository.delete(id);
    }
}
