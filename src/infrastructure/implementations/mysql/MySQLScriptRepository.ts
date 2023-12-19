import { Script } from '@domain/entities/script/script';
import { ScriptRepository } from '@domain/repositories/script-repository';
import { MySQL } from '@infrastructure/driven-adapters/MySQL';

export class MySQLScriptRepository implements ScriptRepository {
    private readonly db = MySQL.getInstance();
    private readonly table = 'scripts';

    async create(user: Script): Promise<Script> {
        const statement = `INSERT INTO ${this.table} SET ?`;
        const data = {
            uuid: user.id.value,
            name: user.name.value,
            description: user.description.value,
            source: user.source.value,
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

    async getById(id: string): Promise<Script> {
        const statement = `SELECT * FROM ${this.table} WHERE uuid = ?`;
        try {
            return await this.db.query(statement, id);
        } catch (error) {
            throw new Error(`Error al consultar: ${error}`);
        }
    }

    async getAll(): Promise<Script[]> {
        const statement = `SELECT * FROM ${this.table}`;
        try {
            return await this.db.query(statement);
        } catch (error) {
            throw new Error(`Error al consultar: ${error}`);
        }
    }
}
