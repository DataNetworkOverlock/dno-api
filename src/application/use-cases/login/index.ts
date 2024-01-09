import { DefaultException, UserNotFoundException } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories/user-repository';
import { UserGetterByUsername } from '@domain/services/user/GetterByUsername';
import { JWTHandler } from '@domain/utils/jwtHandler';

interface LoginInterface {
    username: string;
    password: string;
}

export class LoginUseCase {
    private readonly userRepository: UserRepository;
    private readonly userExists: UserGetterByUsername;
    private readonly jwtHandler: JWTHandler;

    constructor(userRepository: UserRepository, jwtHandler: JWTHandler) {
        this.userRepository = userRepository;
        this.jwtHandler = jwtHandler;
        this.userExists = new UserGetterByUsername(userRepository);
    }

    async run(params: LoginInterface) {
        const { username, password } = params;

        const existUser = await this.userExists.run(username);
        if (existUser === null) throw new UserNotFoundException();

        // TODO - Validate password function
        // TODO - Password encryption
        if (password === String(existUser.password)) {
            const token = this.jwtHandler.generateAccessToken(username);
            return {
                uuid: existUser.uuid,
                name: existUser.name,
                username: existUser.username,
                token,
            };
        } else {
            throw new DefaultException('Username or Password incorrect');
        }
    }
}
