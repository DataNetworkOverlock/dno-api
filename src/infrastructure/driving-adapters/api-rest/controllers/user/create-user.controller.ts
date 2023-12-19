import { NextFunction, Request, Response } from 'express';
import { MySQLUserRepository } from '../../../../implementations/mysql/MySQLUserRepository';
import { CreateUserUseCase } from '../../../../../application/use-cases/create-user';
//import { UuidV4Generator } from '@infrastructure/UuidV4Generator'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        id, // DEL - delete after uuid generator
        name,
        username,
        password,
        question,
        answer,
    } = req.body;

    const mysqlUserRepository = new MySQLUserRepository();
    //const uuidV4Generator = new UuidV4Generator()
    const createUserUseCase = new CreateUserUseCase(mysqlUserRepository);

    try {
        const userCreated = await createUserUseCase.run({
            id, // DEL - delete after uuid generator
            name,
            username,
            password,
            question,
            answer,
        });

        res.json(userCreated);
        return;
    } catch (e) {
        return next(e);
    }
};
