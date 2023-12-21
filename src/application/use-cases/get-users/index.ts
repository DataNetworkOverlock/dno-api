import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user-repository';

export class UserGetterUseCase {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async run(): Promise<User[]> {
        return await this.userRepository.getAll();
    }
}
