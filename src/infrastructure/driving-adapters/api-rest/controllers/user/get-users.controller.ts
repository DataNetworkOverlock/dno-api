import { UserGetterUseCase } from '@application/use-cases/get-users';
import { MySQLUserRepository } from '@infrastructure/implementations/mysql/MySQLUserRepository';
import { NextFunction, Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const mysqlUserRepository = new MySQLUserRepository();
    const getUsersUseCase = new UserGetterUseCase(mysqlUserRepository);

    try {
        const users = await getUsersUseCase.run();
        res.json(users);
        return;
    } catch (err) {
        return next(err);
    }
};
