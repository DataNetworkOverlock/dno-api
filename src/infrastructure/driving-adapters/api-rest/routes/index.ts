import { NextFunction, Request, Response, Router } from 'express';
import userRoutes from '@api/routes/user.routes';
import scriptRoutes from '@api/routes/script.routes';
import testRoutes from '@api/routes/test.routes';
import loginRoutes from '@api/routes/login.routes';

const route = Router();

route.use('/users', userRoutes);
route.use('/scripts', scriptRoutes);
route.use('/tests', testRoutes);
route.use('/login', loginRoutes);

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Error from router:', err);
    if (err) {
        res.status(400).json({
            message: err.message,
        });
    } else {
        next(err);
    }
});

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // TODO - Will be used when exceptions are implemented
    console.log('Error del servidor:', err);
    res.status(500).json({
        message: 'Server: ' + err.message,
    });
    next(err);
});

export default route;
