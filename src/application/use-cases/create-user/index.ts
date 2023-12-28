import { User } from '@domain/entities/user/user';
import { Answer, Uuid, Name, Password, Question, Username } from '@domain/entities/user/value-objects';
import { UserRepository } from '@domain/repositories/user-repository';
import { UserGetterByUsername } from '@domain/services/user/GetterByUsername';
import { UuidGenerator } from '@domain/utils/uuidGenerator';
// TODO - Exceptions come from domain/exceptions

interface UserInterface {
    name: string;
    username: string;
    password: string;
    question: string;
    answer: string;
}

export class CreateUserUseCase {
    private readonly userRepository: UserRepository;
    private readonly userExists: UserGetterByUsername;
    private readonly uuidGenerator: UuidGenerator;

    constructor(userRepository: UserRepository, uuidGenerator: UuidGenerator) {
        this.userRepository = userRepository;
        this.uuidGenerator = uuidGenerator;
        this.userExists = new UserGetterByUsername(userRepository);
    }

    async run(params: UserInterface) {
        const { name, username, password, question, answer } = params;

        const user = new User({
            uuid: new Uuid(this.uuidGenerator.generate()),
            name: new Name(name),
            username: new Username(username),
            password: new Password(password),
            question: new Question(question),
            answer: new Answer(answer),
        });
        // TODO - Add exceptions
        const existUser: User | null = await this.userExists.run(user.username.value);
        if (existUser !== null) {
            throw new Error('User already exists');
        }

        const result = await this.userRepository.create(user);
        return {
            result,
            metadata: user.toPrimitives(),
        };
    }
}
