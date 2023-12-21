import { NextFunction, Request, Response } from 'express';
import { CreateTestUseCase } from '@application/use-cases/create-test';
import { MySQLTestRepository } from '@infrastructure/implementations/mysql/MySQLTestRepository';

export const createTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        id, // DEL - delete after uuid generator
        ip,
        date,
        report,
        userId,
        scriptId,
    } = req.body;

    const mysqlTestRepository = new MySQLTestRepository();
    //const uuidV4Generator = new UuidV4Generator()
    const createTestUseCase = new CreateTestUseCase(mysqlTestRepository);

    try {
        const testCreated = await createTestUseCase.run({
            id, // DEL - delete after uuid generator
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
