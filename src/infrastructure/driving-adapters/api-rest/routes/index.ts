import { NextFunction, Request, Response, Router } from 'express';
import userRoutes from './user.routes';

const route = Router();

route.use('/users', userRoutes);

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.status(400).json({
            message: err,
        });
        console.log("error:", err);
    } else {
        next(err);
    }
});

export default route;
