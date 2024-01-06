import { User } from '@domain/entities/user/user';
import { DefaultException } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories/user-repository';

export class UserGetterUseCase {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async run(): Promise<User[]> {
        const users = await this.userRepository.getAll();
        if (users.length < 1) throw new DefaultException('No Users found');
        return users;
    }
}
