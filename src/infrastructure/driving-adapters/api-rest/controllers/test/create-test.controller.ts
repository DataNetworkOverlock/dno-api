import { NextFunction, Request, Response } from 'express';
import { CreateTestUseCase } from '@application/use-cases/create-test';
import { MySQLTestRepository } from '@infrastructure/implementations/mysql/MySQLTestRepository';
import { UuidV4Generator } from '@infrastructure/driven-adapters/UuidV4';

export const createTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { ip, date, report, userId, scriptId } = req.body;

    const mysqlTestRepository = new MySQLTestRepository();
    const uuidV4Generator = new UuidV4Generator();
    const createTestUseCase = new CreateTestUseCase(mysqlTestRepository, uuidV4Generator);

    try {
        const testCreated = await createTestUseCase.run({
            ip,
            date,
            report,
            userId,
            scriptId,
        });

        res.json(testCreated);
        return;
    } catch (err) {
        return next(err);
    }
};
