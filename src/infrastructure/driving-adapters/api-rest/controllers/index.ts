import { login } from '@api/controllers/login/login.controller';
import { createScript } from '@api/controllers/script/create-script.controller';
import { createTest } from '@api/controllers/test/create-test.controller';
import { deleteTest } from '@api/controllers/test/delete-test.controller';
import { getTestsByUsername } from '@api/controllers/test/get-tests-by-username.controller';
import { getAllTests } from '@api/controllers/test/get-tests.controller';
import { createUser } from '@api/controllers/user/create-user.controller';
import { deleteUser } from '@api/controllers/user/delete-user.controller';
import { getAllUsers } from '@api/controllers/user/get-users.controller';

export {
    createScript as createScriptController,
    createTest as createTestController,
    createUser as createUserController,
    deleteTest as deleteTestController,
    deleteUser as deleteUserController,
    getTestsByUsername as getTestsByUsernameController,
    getAllTests as getTestsController,
    getAllUsers as getUsersController,
    login as loginController,
};
