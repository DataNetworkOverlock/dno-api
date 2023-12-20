import { Router } from 'express';
import { createUserController, deleteUserController } from '@api/controllers';

const route = Router();

route.post('', createUserController);
route.delete('/:id', deleteUserController);

export default route;
