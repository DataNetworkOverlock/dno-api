import { User } from '../../../domain/entities/user/user';
import { Answer, Id, Name, Password, Question, Username } from '../../../domain/entities/user/value-objects';
import { UserRepository } from '../../../domain/repositories/user-repository';
// Exceptions come from domain/exceptions

interface UserInterface {
    id: string;
    name: string;
    username: string;
    password: string;
    question: string;
    answer: string;
}

export class CreateUserUseCase {
    private readonly userRepository: UserRepository;
    //private readonly existuser
    //private readonly uuidGenerator

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async run(params: UserInterface) {
        // TODO - Add uuid generator
        const user = new User({
            id: new Id(params.id),
            name: new Name(params.name),
            username: new Username(params.username),
            password: new Password(params.password),
            question: new Question(params.question),
            answer: new Answer(params.answer),
        });
        // TODO - Validate if user already exists
        const userCreated: User = await this.userRepository.create(user);
        return userCreated;
    }
}
