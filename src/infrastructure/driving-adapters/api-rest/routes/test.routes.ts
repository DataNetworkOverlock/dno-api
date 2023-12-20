import { Router } from 'express';
import { createTestController, deleteTestController, getTestsController } from '@api/controllers';

const route = Router();

route.get('', getTestsController);
route.post('', createTestController);
route.delete('/:id', deleteTestController);

export default route;
