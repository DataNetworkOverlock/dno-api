import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user-repository';

export class UserGetterByUsername {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async run(username: string): Promise<User> {
        const user = await this.userRepository.getByUsername(username);
        if (!user) {
            // TODO - Add exceptions
            throw new Error('Username not found');
        }
        return user;
    }
}
