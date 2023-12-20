import { Router } from 'express';
import { createScriptController } from '@api/controllers';

const route = Router();

route.post('', createScriptController);

export default route;
