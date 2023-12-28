import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user-repository';

export class UserGetterById {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async run(uuid: string): Promise<User | null> {
        // TODO - Add exceptions
        return await this.userRepository.getById(uuid);
    }
}
