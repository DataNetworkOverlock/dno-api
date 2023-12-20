import { Test } from "@domain/entities/test/test";

export interface TestRepository {
    create: (test: Test) => Promise<Test>;
    delete: (id: string) => Promise<void>;
    getById: (id: string) => Promise<Test>;
    getByUser: (username: string) => Promise<Test[]>;
    getAll: () => Promise<Test[]>;
}