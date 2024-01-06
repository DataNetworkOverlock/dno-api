import { Test } from '@domain/entities/test/test';
import { SQLException } from '@domain/exceptions';
import { TestRepository } from '@domain/repositories/test-repository';
import { MySQL } from '@infrastructure/driven-adapters/MySQL';

export class MySQLTestRepository implements TestRepository {
    private readonly db = MySQL.getInstance();
    private readonly table = 'tests';

    async create(test: Test): Promise<Test> {
        const statement = `INSERT INTO ${this.table} SET ?`;
        const data = {
            uuid: test.uuid.value,
            ip: test.ip.value,
            date: test.date.value,
            report: test.report.value,
            user: test.userId.value,
            script: test.scriptId.value,
        };
        try {
            return await this.db.query(statement, data);
        } catch (error) {
            throw new SQLException(`Error al insertar: ${error}`);
        }
    }

    async delete(uuid: string): Promise<void> {
        const statement = `DELETE FROM ${this.table} WHERE uuid = ?`;
        try {
            return await this.db.query(statement, uuid);
        } catch (error) {
            throw new SQLException(`Error al eliminar: ${error}`);
        }
    }

    async getById(uuid: string): Promise<Test | null> {
        const statement = `SELECT * FROM ${this.table} WHERE uuid = ?`;
        try {
            const test = await this.db.query(statement, uuid);
            if (test.length > 0) return test;
            return null;
        } catch (error) {
            throw new SQLException(`Error al consultar: ${error}`);
        }
    }

    async getByUser(username: string): Promise<Test[]> {
        const statement = `SELECT * FROM ${this.table} WHERE username = ?`;
        try {
            return await this.db.query(statement, username);
        } catch (error) {
            throw new SQLException(`Error al consultar tests: ${error}`);
        }
    }

    async getAll(): Promise<Test[]> {
        const statement = `SELECT * FROM ${this.table}`;
        try {
            return await this.db.query(statement);
        } catch (error) {
            throw new SQLException(`Error al consultar: ${error}`);
        }
    }
}
