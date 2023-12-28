import { CreateScriptUseCase } from '@application/use-cases/create-script';
import { UuidV4Generator } from '@infrastructure/driven-adapters/UuidV4';
import { MySQLScriptRepository } from '@infrastructure/implementations/mysql/MySQLScriptRepository';
import { NextFunction, Request, Response } from 'express';

export const createScript = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description, source, tags } = req.body;
    
    const mySQLScriptRepository = new MySQLScriptRepository();
    const uuidV4Generator = new UuidV4Generator();
    const createScriptUseCase = new CreateScriptUseCase(mySQLScriptRepository, uuidV4Generator);

    try {
        const scriptCreated = await createScriptUseCase.run({
            name,
            description,
            source,
            tags,
        });
        res.status(200).json(scriptCreated);
        return;
    } catch (err) {
        return next(err);
    }
};
