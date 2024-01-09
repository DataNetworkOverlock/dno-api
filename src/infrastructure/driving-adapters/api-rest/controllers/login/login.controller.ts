import { LoginUseCase } from '@application/use-cases/login';
import { JWTHandlerImpl } from '@infrastructure/driven-adapters/JWT';
import { MySQLUserRepository } from '@infrastructure/implementations/mysql/MySQLUserRepository';
import { NextFunction, Request, Response } from 'express';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;

    const mysqlUserRepository = new MySQLUserRepository();
    const jwtHandler = new JWTHandlerImpl();
    const loginUseCase = new LoginUseCase(mysqlUserRepository, jwtHandler);

    try {
        const payload = {
            username,
            password,
        };
        const logged = await loginUseCase.run(payload);
        res.status(200).header('authorization', logged.token).json(logged);
        return;
    } catch (err) {
        return next(err);
    }
};
