import { Router } from 'express';
import { createUserController, deleteUserController, getUsersController } from '@api/controllers';

const route = Router();

route.get('', getUsersController);
route.post('', createUserController);
route.delete('/:uuid', deleteUserController);

export default route;
