import { NextFunction, Request, Response } from 'express';
import { MySQLUserRepository } from '@infrastructure/implementations/mysql/MySQLUserRepository';
import { DeleteUserUseCase } from '@application/use-cases/delete-user';

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { uuid } = req.params;
    const mysqlUserRepository = new MySQLUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository);

    try {
        const userDeleted = await deleteUserUseCase.run(uuid);
        res.status(200).json(userDeleted);
        return;
    } catch (err) {
        return next(err);
    }
};
