import { CreateScriptUseCase } from '@application/use-cases/create-script';
import { MySQLScriptRepository } from '@infrastructure/implementations/mysql/MySQLScriptRepository';
import { NextFunction, Request, Response } from 'express';

export const createScript = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id, name, description, source, tags } = req.body;
    const mySQLScriptRepository = new MySQLScriptRepository();
    const createScriptUseCase = new CreateScriptUseCase(mySQLScriptRepository);

    try {
        const scriptCreated = await createScriptUseCase.run({
            id,
            name,
            description,
            source,
            tags,
        });
        res.json(scriptCreated);
        return;
    } catch (err) {
        return next(err);
    }
};
