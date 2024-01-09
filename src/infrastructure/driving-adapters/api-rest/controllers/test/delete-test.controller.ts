import { NextFunction, Request, Response } from 'express';
import { DeleteTestUseCase } from '@application/use-cases/delete-test';
import { MySQLTestRepository } from '@infrastructure/implementations/mysql/MySQLTestRepository';
import { JWTHandlerImpl } from '@infrastructure/driven-adapters/JWT';
import { NotAuthenticatedException } from '@domain/exceptions';

export const deleteTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { uuid } = req.params;
    const mysqlTestRepository = new MySQLTestRepository();
    const jwtHandler = new JWTHandlerImpl();
    const deleteTestUseCase = new DeleteTestUseCase(mysqlTestRepository);

    try {
        const accessToken = req.headers['authorization'];
        const isValid = jwtHandler.validateAccessToken(accessToken);
        if (!isValid) throw new NotAuthenticatedException();
        const testDeleted = await deleteTestUseCase.run(uuid);
        res.status(200).json(testDeleted);
        return;
    } catch (err) {
        return next(err);
    }
};
