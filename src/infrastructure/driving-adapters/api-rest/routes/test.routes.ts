import { Router } from 'express';
import {
    createTestController,
    deleteTestController,
    getTestsByUsernameController,
    getTestsController,
} from '@api/controllers';

const route = Router();

route.get('', getTestsController);
route.get('/:username', getTestsByUsernameController);
route.post('', createTestController);
route.delete('/:uuid', deleteTestController);

export default route;
