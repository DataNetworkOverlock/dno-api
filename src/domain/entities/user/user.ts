import { Id, Name, Username, Password, Question, Answer } from '@domain/entities/user/value-objects';
import { EntityRoot } from '@domain/entities/entity-root';

interface PrimitiveData {
    id: string;
    name: string;
    username: string;
    password: string;
    question: string;
    answer: string;
}

export class User extends EntityRoot<User, PrimitiveData> {
    readonly id: Id;
    readonly name: Name;
    readonly username: Username;
    readonly password: Password;
    readonly question: Question;
    readonly answer: Answer;

    constructor({
        id,
        name,
        username,
        password,
        question,
        answer,
    }: {
        id: Id;
        name: Name;
        username: Username;
        password: Password;
        question: Question;
        answer: Answer;
    }) {
        super();
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.question = question;
        this.answer = answer;
    }

    static create(
        id: Id,
        name: Name,
        username: Username,
        password: Password,
        question: Question,
        answer: Answer,
    ): User {
        const user = new User({
            id,
            name,
            username,
            password,
            question,
            answer,
        });

        return user;
    }

    static fromPrimitives(plainData: {
        id: string;
        name: string;
        username: string;
        password: string;
        question: string;
        answer: string;
    }): User {
        return new User({
            id: new Id(plainData.id),
            name: new Name(plainData.name),
            username: new Username(plainData.username),
            password: new Password(plainData.password),
            question: new Question(plainData.question),
            answer: new Answer(plainData.answer),
        });
    }

    toPrimitives(): PrimitiveData {
        return {
            id: this.id.value,
            name: this.name.value,
            username: this.username.value,
            password: this.password.value,
            question: this.question.value,
            answer: this.answer.value,
        };
    }

    passwordValid(password: string): boolean {
        // TODO: Insertar validaciones
        if (password.length <= 10) {
            throw new Error('Clave muy corta');
        }
        return true;
    }
}
