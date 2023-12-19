import { Router } from 'express';
import { createUserController, deleteUserController } from '@api/controllers';

const route = Router();

route.get('', () => {
    console.log('funciona');
});
route.post('', createUserController);
route.delete('/:id', deleteUserController);

export default route;
