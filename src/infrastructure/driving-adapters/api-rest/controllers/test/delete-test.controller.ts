import { NextFunction, Request, Response } from 'express';
import { DeleteTestUseCase } from '@application/use-cases/delete-test';
import { MySQLTestRepository } from '@infrastructure/implementations/mysql/MySQLTestRepository';

export const deleteTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const mysqlTestRepository = new MySQLTestRepository();
    const deleteTestUseCase = new DeleteTestUseCase(mysqlTestRepository);

    try {
        const testDeleted = await deleteTestUseCase.run(id);
        res.json(testDeleted);
        return;
    } catch (err) {
        return next(err);
    }
};
