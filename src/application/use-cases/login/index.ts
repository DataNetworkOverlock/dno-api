import { UserRepository } from '@domain/repositories/user-repository';
import { UserGetterByUsername } from '@domain/services/user/GetterByUsername';

interface LoginInterface {
    username: string;
    password: string;
}

export class LoginUseCase {
    private readonly userRepository: UserRepository;
    private readonly userExists: UserGetterByUsername;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.userExists = new UserGetterByUsername(userRepository);
    }

    async run(params: LoginInterface) {
        const { username, password } = params;

        const existUser = await this.userExists.run(username);
        if (existUser === null) throw new Error("User doesn't exists");

        // TODO - Validate password function
        // TODO - Password encryption
        if (password === String(existUser.password)) {
            return {
                uuid: existUser.uuid,
                name: existUser.name,
                username: existUser.username,
            };
        } else {
            throw new Error('Username or Password incorrect');
        }
    }
}
