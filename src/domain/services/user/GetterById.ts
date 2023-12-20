import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user-repository';

export class UserGetterById {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async run(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            // TODO - Add exceptions
            throw new Error('UserId not found');
        }
        return user;
    }
}
