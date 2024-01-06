import { User } from '@domain/entities/user/user';
import { UserNotFoundException } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories/user-repository';
import { UserGetterById } from '@domain/services/user/GetterById';

export class DeleteUserUseCase {
    private readonly userRepository: UserRepository;
    private readonly userExists: UserGetterById;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.userExists= new UserGetterById(userRepository);
    }

    async run(uuid: string) {
        const existUser: User | null = await this.userExists.run(uuid);
        if (existUser === null) {
            throw new UserNotFoundException();
        }
        return await this.userRepository.delete(uuid);
    }
}
