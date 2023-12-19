import { User } from 'domain/entities/user/user';
import { UserRepository } from 'domain/repositories/user-repository';
import { MySQL } from '../../driven-adapters/MySQL';

export class MySQLUserRepository implements UserRepository {
    private readonly db = MySQL.getInstance();
    private readonly table = 'users';

    async create(user: User): Promise<User> {
        const statement = `INSERT INTO ${this.table} SET ?`;
        const data = {
            uuid: user.id.value,
            name: user.name.value,
            username: user.username.value,
            password: user.password.value,
            question: user.question.value,
            answer: user.answer.value,
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

    async getById(id: string): Promise<User> {
        const statement = `SELECT * FROM ${this.table} WHERE uuid = ?`;
        try {
            return await this.db.query(statement, id);
        } catch (error) {
            throw new Error(`Error al consultar: ${error}`);
        }
    }

    async getByUsername(username: string): Promise<User> {
        // TODO - limit the user query
        const statement = `SELECT * FROM ${this.table} WHERE username = ?`;
        try {
            return await this.db.query(statement, username);
        } catch (error) {
            throw new Error(`Error al consultar: ${error}`);
        }
    }

    async getAll(): Promise<User[]> {
        const statement = `SELECT * FROM ${this.table}`;
        try {
            return await this.db.query(statement);
        } catch (error) {
            throw new Error(`Error al consultar: ${error}`);
        }
    }
}
