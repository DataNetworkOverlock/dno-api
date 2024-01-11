import { Router } from 'express';
import { createScriptController, getScriptsController } from '@api/controllers';

const route = Router();

route.get('', getScriptsController);
route.post('', createScriptController);

export default route;
