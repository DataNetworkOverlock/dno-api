import { NextFunction, Request, Response, Router } from 'express';
import userRoutes from '@api/routes/user.routes';
import scriptRoutes from '@api/routes/script.routes';
import testRoutes from '@api/routes/test.routes';
import loginRoutes from '@api/routes/login.routes';
import { Exception } from '@domain/exceptions/Exception';

const route = Router();

route.use('/users', userRoutes);
route.use('/scripts', scriptRoutes);
route.use('/tests', testRoutes);
route.use('/login', loginRoutes);

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error from router:', err);
    if (err instanceof Exception) {
        res.status(err.status).json({
            status: err.status,
            message: err.returnMessage,
        });
    } else {
        next(err);
    }
});

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error del servidor:', err);
    res.status(500).json({
        message: 'Server: ' + err.message,
    });
    next(err);
});

route.use((req: Request, res: Response) => {
    console.error('Error 404');
    res.status(404).json({
        message: 'Server: Recurso no encontrado',
    });
});

export default route;
