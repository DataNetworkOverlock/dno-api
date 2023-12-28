import { Router } from 'express';
import { createTestController, deleteTestController, getTestsController } from '@api/controllers';

const route = Router();

route.get('', getTestsController);
route.post('', createTestController);
route.delete('/:uuid', deleteTestController);

export default route;
