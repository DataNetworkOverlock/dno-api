import { ScriptGetterUseCase } from '@application/use-cases/get-scripts';
import { NotAuthenticatedException } from '@domain/exceptions';
import { JWTHandlerImpl } from '@infrastructure/driven-adapters/JWT';
import { MySQLScriptRepository } from '@infrastructure/implementations/mysql/MySQLScriptRepository';
import { NextFunction, Request, Response } from 'express';

export const getAllScripts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const mySQLScriptRepository = new MySQLScriptRepository();
    const jwtHandler = new JWTHandlerImpl();
    const getScriptsUseCase = new ScriptGetterUseCase(mySQLScriptRepository);

    try {
        const accessToken = req.headers['authorization'];
        const isValid = jwtHandler.validateAccessToken(accessToken);
        if (!isValid) throw new NotAuthenticatedException();
        const scripts = await getScriptsUseCase.run();
        res.status(200).json(scripts);
        return;
    } catch (err) {
        return next();
    }
};
