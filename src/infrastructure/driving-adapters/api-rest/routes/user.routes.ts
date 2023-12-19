import { Router } from 'express';
import { createUserController } from '@api/controllers';

const route = Router();

route.get('', () => {
    console.log('funciona');
});
route.post('', createUserController);

/* route.delete('/:id', deleteUserController)
route.put('/:userId', updateUserController)
route.get('', getAllUsersController)
route.post('', createUserController) */

export default route;
