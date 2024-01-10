import { GetTestsByUsernameUseCase } from '@application/use-cases/get-tests-by-username';
import { NotAuthenticatedException } from '@domain/exceptions';
import { JWTHandlerImpl } from '@infrastructure/driven-adapters/JWT';
import { MySQLScriptRepository } from '@infrastructure/implementations/mysql/MySQLScriptRepository';
import { MySQLTestRepository } from '@infrastructure/implementations/mysql/MySQLTestRepository';
import { MySQLUserRepository } from '@infrastructure/implementations/mysql/MySQLUserRepository';
import { NextFunction, Request, Response } from 'express';

export const getTestsByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = req.params;

    const mysqlTestRepository = new MySQLTestRepository();
    const mysqlUserRepository = new MySQLUserRepository();
    const mySQLScriptRepository = new MySQLScriptRepository();
    const jwtHandler = new JWTHandlerImpl();
    const getTestsByUsernameUseCase = new GetTestsByUsernameUseCase(mysqlTestRepository, mysqlUserRepository, mySQLScriptRepository);

    try {
        const accessToken = req.headers['authorization'];
        const isValid = jwtHandler.validateAccessToken(accessToken);
        if (!isValid) throw new NotAuthenticatedException();
        const tests = await getTestsByUsernameUseCase.run({ username });
        res.status(200).json(tests);
        return;
    } catch (err) {
        return next(err);
    }
};
