import { TestGetterUseCase } from '@application/use-cases/get-tests';
import { NotAuthenticatedException } from '@domain/exceptions';
import { JWTHandlerImpl } from '@infrastructure/driven-adapters/JWT';
import { MySQLTestRepository } from '@infrastructure/implementations/mysql/MySQLTestRepository';
import { NextFunction, Request, Response } from 'express';

export const getAllTests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const mysqlTestRepository = new MySQLTestRepository();
    const jwtHandler = new JWTHandlerImpl();
    const getTestsUseCase = new TestGetterUseCase(mysqlTestRepository);

    try {
        const accessToken = req.headers['authorization'];
        const isValid = jwtHandler.validateAccessToken(accessToken);
        if (!isValid) throw new NotAuthenticatedException();
        const tests = await getTestsUseCase.run();
        res.status(200).json(tests);
        return;
    } catch (err) {
        return next(err);
    }
};
