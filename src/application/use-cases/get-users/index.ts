import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user-repository';

export class UserGetterUseCase {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async run(): Promise<User[]> {
        const users = await this.userRepository.getAll();
        if (users.length < 1) throw new Error('No users found');
        return users;
    }
}
