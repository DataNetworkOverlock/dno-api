import { UserRepository } from '@domain/repositories/user-repository';

export class DeleteUserUseCase {
    private readonly userRepository: UserRepository;
    // TODO - existUser

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async run(id: string) {
        return await this.userRepository.delete(id);
    }
}
