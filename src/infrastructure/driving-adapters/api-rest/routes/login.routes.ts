import { Router } from 'express';
import { loginController } from '@api/controllers';

const route = Router();

route.post('', loginController);

export default route;
