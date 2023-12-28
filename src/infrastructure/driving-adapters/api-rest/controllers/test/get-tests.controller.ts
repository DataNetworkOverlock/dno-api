import { TestGetterUseCase } from '@application/use-cases/get-tests';
import { MySQLTestRepository } from '@infrastructure/implementations/mysql/MySQLTestRepository';
import { NextFunction, Request, Response } from 'express';

export const getAllTests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const mysqlTestRepository = new MySQLTestRepository();
    const getTestsUseCase = new TestGetterUseCase(mysqlTestRepository);

    try {
        const tests = await getTestsUseCase.run();
        res.status(200).json(tests);
        return;
    } catch (err) {
        return next(err);
    }
};
