import { UserGetterUseCase } from '@application/use-cases/get-users';
import { NotAuthenticatedException } from '@domain/exceptions';
import { JWTHandlerImpl } from '@infrastructure/driven-adapters/JWT';
import { MySQLUserRepository } from '@infrastructure/implementations/mysql/MySQLUserRepository';
import { NextFunction, Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const mysqlUserRepository = new MySQLUserRepository();
    const jwtHandler = new JWTHandlerImpl();
    const getUsersUseCase = new UserGetterUseCase(mysqlUserRepository);

    try {
        const accessToken = req.headers['authorization'];
        const isValid = jwtHandler.validateAccessToken(accessToken);
        if (!isValid) throw new NotAuthenticatedException();
        const users = await getUsersUseCase.run();
        res.status(200).json(users);
        return;
    } catch (err) {
        return next(err);
    }
};
