import { Test } from "@domain/entities/test/test";

export interface TestRepository {
    create: (test: Test) => Promise<Test>;
    delete: (uuid: string) => Promise<void>;
    getById: (uuid: string) => Promise<Test | null>;
    getByUser: (username: string) => Promise<Test[]>;
    getAll: () => Promise<Test[]>;
}