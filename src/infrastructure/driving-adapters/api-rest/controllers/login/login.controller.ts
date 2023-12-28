import { LoginUseCase } from '@application/use-cases/login';
import { MySQLUserRepository } from '@infrastructure/implementations/mysql/MySQLUserRepository';
import { NextFunction, Request, Response } from 'express';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;

    const mysqlUserRepository = new MySQLUserRepository();
    const loginUseCase = new LoginUseCase(mysqlUserRepository);

    try {
        const payload = {
            username,
            password,
        };
        const logged = await loginUseCase.run(payload);
        res.status(200).json(logged);
        return;
    } catch (err) {
        return next(err);
    }
};
