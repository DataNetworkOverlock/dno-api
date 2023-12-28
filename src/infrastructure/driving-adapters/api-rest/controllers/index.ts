import { createUser } from '@api/controllers/user/create-user.controller';
import { deleteUser } from '@api/controllers/user/delete-user.controller';
import { createScript } from '@api/controllers/script/create-script.controller';
import { createTest } from '@api/controllers/test/create-test.controller';
import { deleteTest } from '@api/controllers/test/delete-test.controller';
import { getAllTests } from '@api/controllers/test/get-tests.controller';
import { getAllUsers } from '@api/controllers/user/get-users.controller';
import { login } from '@api/controllers/login/login.controller';

export {
    createUser as createUserController,
    deleteUser as deleteUserController,
    getAllUsers as getUsersController,
    createScript as createScriptController,
    createTest as createTestController,
    deleteTest as deleteTestController,
    getAllTests as getTestsController,
    login as loginController,
};
