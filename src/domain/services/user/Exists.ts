import { UserRepository } from '@domain/repositories/user-repository';

export class ExistUser {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async run(username: string): Promise<boolean> {
        const user = await this.userRepository.getByUsername(username);
        if (!user) return true;
        return false;
    }
}
