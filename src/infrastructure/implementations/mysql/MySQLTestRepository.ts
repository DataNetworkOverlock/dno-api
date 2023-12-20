import { Test } from '@domain/entities/test/test';
import { TestRepository } from '@domain/repositories/test-repository';
import { MySQL } from '@infrastructure/driven-adapters/MySQL';

export class MySQLTestRepository implements TestRepository {
    private readonly db = MySQL.getInstance();
    private readonly table = 'tests';

    async create(test: Test): Promise<Test> {
        const statement = `INSERT INTO ${this.table} SET ?`;
        const data = {
            uuid: test.id.value,
            ip: test.ip.value,
            date: test.date.value,
            report: test.report.value,
            user: test.userId.value,
            script: test.scriptId.value,
        };
        try {
            return await this.db.query(statement, data);
        } catch (error) {
            throw new Error(`Error al insertar: ${error}`);
        }
    }

    async delete(id: string): Promise<void> {
        const statement = `DELETE FROM ${this.table} WHERE uuid = ?`;
        try {
            return await this.db.query(statement, id);
        } catch (error) {
            throw new Error(`Error al eliminar: ${error}`);
        }
    }

    async getById(id: string): Promise<Test> {
        const statement = `SELECT * FROM ${this.table} WHERE uuid = ?`;
        try {
            return await this.db.query(statement, id);
        } catch (error) {
            throw new Error(`Error al consultar: ${error}`);
        }
    }

    async getByUser(username: string): Promise<Test[]> {
        const statement = `SELECT * FROM ${this.table} WHERE username = ?`;
        try {
            return await this.db.query(statement, username);
        } catch (error) {
            throw new Error(`Error al consultar tests: ${error}`);
        }
    }

    async getAll(): Promise<Test[]> {
        const statement = `SELECT * FROM ${this.table}`;
        try {
            return await this.db.query(statement);
        } catch (error) {
            throw new Error(`Error al consultar: ${error}`);
        }
    }
}
