import { Uuid, Name, Username, Password, Question, Answer } from '@domain/entities/user/value-objects';
import { EntityRoot } from '@domain/entities/entity-root';
import { DefaultException } from '@domain/exceptions';

interface PrimitiveData {
    uuid: string;
    name: string;
    username: string;
    password: string;
    question: string;
    answer: string;
}

export class User extends EntityRoot<User, PrimitiveData> {
    readonly uuid: Uuid;
    readonly name: Name;
    readonly username: Username;
    readonly password: Password;
    readonly question: Question;
    readonly answer: Answer;

    constructor({
        uuid,
        name,
        username,
        password,
        question,
        answer,
    }: {
        uuid: Uuid;
        name: Name;
        username: Username;
        password: Password;
        question: Question;
        answer: Answer;
    }) {
        super();
        this.uuid = uuid;
        this.name = name;
        this.username = username;
        this.password = password;
        this.question = question;
        this.answer = answer;
    }

    static create(
        uuid: Uuid,
        name: Name,
        username: Username,
        password: Password,
        question: Question,
        answer: Answer,
    ): User {
        const user = new User({
            uuid,
            name,
            username,
            password,
            question,
            answer,
        });

        return user;
    }

    static fromPrimitives(plainData: {
        uuid: string;
        name: string;
        username: string;
        password: string;
        question: string;
        answer: string;
    }): User {
        return new User({
            uuid: new Uuid(plainData.uuid),
            name: new Name(plainData.name),
            username: new Username(plainData.username),
            password: new Password(plainData.password),
            question: new Question(plainData.question),
            answer: new Answer(plainData.answer),
        });
    }

    toPrimitives(): PrimitiveData {
        return {
            uuid: this.uuid.value,
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
            throw new DefaultException('Clave muy corta');
        }
        return true;
    }
}
