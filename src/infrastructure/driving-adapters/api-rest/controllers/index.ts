import { createUser } from '@api/controllers/user/create-user.controller';
import { deleteUser } from '@api/controllers/user/delete-user.controller';
import { createScript } from '@api/controllers/script/create-script.controller';
import { createTest } from '@api/controllers/test/create-test.controller';
import { deleteTest } from '@api/controllers/test/delete-test.controller';
import { getAllTests } from '@api/controllers/test/get-tests.controller';

export {
    createUser as createUserController,
    deleteUser as deleteUserController,
    createScript as createScriptController,
    createTest as createTestController,
    deleteTest as deleteTestController,
    getAllTests as getTestsController,
};
