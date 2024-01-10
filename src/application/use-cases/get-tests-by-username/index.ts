import { Test } from '@domain/entities/test/test';
import { TestNotFoundException, UserNotFoundException } from '@domain/exceptions';
import { ScriptRepository } from '@domain/repositories/script-repository';
import { TestRepository } from '@domain/repositories/test-repository';
import { UserRepository } from '@domain/repositories/user-repository';
import { ScriptGetterById } from '@domain/services/script/GetterById';
import { TestGetterByUser } from '@domain/services/test/GetterByUsername';
import { UserGetterByUsername } from '@domain/services/user/GetterByUsername';

interface GetTestsInterface {
    username: string;
}

interface TestData {
    uuid: string;
    ip: string;
    date: string;
    report: string;
    script: string;
}

export class GetTestsByUsernameUseCase {
    private readonly testRepository: TestRepository;
    private readonly userRepository: UserRepository;
    private readonly scriptRepository: ScriptRepository;
    private readonly userExists: UserGetterByUsername;
    private readonly testGetterByUsername: TestGetterByUser;
    private readonly scriptGetterById: ScriptGetterById;

    constructor(testRepository: TestRepository, userRepository: UserRepository, scriptRepository: ScriptRepository) {
        this.testRepository = testRepository;
        this.userRepository = userRepository;
        this.scriptRepository = scriptRepository;
        this.userExists = new UserGetterByUsername(userRepository);
        this.testGetterByUsername = new TestGetterByUser(testRepository);
        this.scriptGetterById = new ScriptGetterById(scriptRepository);
    }

    async run(params: GetTestsInterface) {
        const { username } = params;

        const existUser = await this.userExists.run(username);
        if (existUser === null) throw new UserNotFoundException();

        const tests = await this.testGetterByUsername.run(String(existUser.uuid));
        if (tests.length < 1) throw new TestNotFoundException();

        const testData = await this.getTestsData(tests);

        const response = {
            uuid: existUser.uuid,
            name: existUser.name,
            username: existUser.username,
            tests: testData,
        };

        return response;
    }

    private async getTestsData(tests: Test[]): Promise<TestData[]> {
        const testData: TestData[] = [];
        for (const test of tests) {
            const script = await this.scriptGetterById.run(String(test.script));
            if (script !== null) {
                testData.push({
                    uuid: String(test.uuid),
                    ip: String(test.ip),
                    date: String(test.date),
                    report: String(test.report),
                    script: String(script.name),
                });
            }
        }
        return testData;
    }
}
