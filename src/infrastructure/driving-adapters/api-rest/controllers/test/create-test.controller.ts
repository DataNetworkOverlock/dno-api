import { NextFunction, Request, Response } from 'express';
import { CreateTestUseCase } from '@application/use-cases/create-test';
import { MySQLTestRepository } from '@infrastructure/implementations/mysql/MySQLTestRepository';
import { UuidV4Generator } from '@infrastructure/driven-adapters/UuidV4';
import { JWTHandlerImpl } from '@infrastructure/driven-adapters/JWT';
import { NotAuthenticatedException } from '@domain/exceptions';

export const createTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { ip, date, report, userId, scriptId } = req.body;

    const mysqlTestRepository = new MySQLTestRepository();
    const uuidV4Generator = new UuidV4Generator();
    const jwtHandler = new JWTHandlerImpl();
    const createTestUseCase = new CreateTestUseCase(mysqlTestRepository, uuidV4Generator);

    try {
        const accessToken = req.headers['authorization'];
        const isValid = jwtHandler.validateAccessToken(accessToken);
        if (!isValid) throw new NotAuthenticatedException();
        const testCreated = await createTestUseCase.run({
            ip,
            date,
            report,
            userId,
            scriptId,
        });

        res.status(200).json(testCreated);
        return;
    } catch (err) {
        return next(err);
    }
};
