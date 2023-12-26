import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user-repository';

export class UserGetterByUsername {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async run(username: string): Promise<User> {
        return await this.userRepository.getByUsername(username);
    }
}
