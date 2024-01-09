import { NextFunction, Request, Response } from 'express';
import { MySQLUserRepository } from '@infrastructure/implementations/mysql/MySQLUserRepository';
import { DeleteUserUseCase } from '@application/use-cases/delete-user';
import { JWTHandlerImpl } from '@infrastructure/driven-adapters/JWT';
import { NotAuthenticatedException } from '@domain/exceptions';

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { uuid } = req.params;
    const mysqlUserRepository = new MySQLUserRepository();
    const jwtHandler = new JWTHandlerImpl();
    const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository);

    try {
        const accessToken = req.headers['authorization'];
        const isValid = jwtHandler.validateAccessToken(accessToken);
        if (!isValid) throw new NotAuthenticatedException();
        const userDeleted = await deleteUserUseCase.run(uuid);
        res.status(200).json(userDeleted);
        return;
    } catch (err) {
        return next(err);
    }
};
