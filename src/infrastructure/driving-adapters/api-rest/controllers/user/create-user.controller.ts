import { CreateUserUseCase } from '@application/use-cases/create-user';
import { UuidV4Generator } from '@infrastructure/driven-adapters/UuidV4';
import { MySQLUserRepository } from '@infrastructure/implementations/mysql/MySQLUserRepository';
import { NextFunction, Request, Response } from 'express';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, username, password, question, answer } = req.body;

    const mysqlUserRepository = new MySQLUserRepository();
    const uuidV4Generator = new UuidV4Generator();
    const createUserUseCase = new CreateUserUseCase(mysqlUserRepository, uuidV4Generator);

    try {
        const user = {
            name,
            username,
            password,
            question,
            answer,
        };
        const userCreated = await createUserUseCase.run(user);
        res.status(200).json(userCreated);
        return;
    } catch (err) {
        return next(err);
    }
};
