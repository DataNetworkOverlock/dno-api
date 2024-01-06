import { User } from '@domain/entities/user/user';
import { SQLException } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories/user-repository';
import { MySQL } from '@infrastructure/driven-adapters/MySQL';

export class MySQLUserRepository implements UserRepository {
    private readonly db = MySQL.getInstance();
    private readonly table = 'users';

    async create(user: User): Promise<User> {
        const statement = `INSERT INTO ${this.table} SET ?`;
        const data = {
            uuid: user.uuid.value,
            name: user.name.value,
            username: user.username.value,
            password: user.password.value,
            question: user.question.value,
            answer: user.answer.value,
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

    async getById(uuid: string): Promise<User | null> {
        const statement = `SELECT * FROM ${this.table} WHERE uuid = ?`;
        try {
            const user = await this.db.query(statement, uuid);
            if (user.length > 0) return user;
            return null;
        } catch (error) {
            throw new SQLException(`Error al consultar: ${error}`);
        }
    }

    async getByUsername(username: string): Promise<User | null> {
        const statement = `SELECT uuid, name, username, password FROM ${this.table} WHERE username = ?`;
        try {
            const user = await this.db.query(statement, username);
            if (user.length > 0) {
                const result = JSON.parse(JSON.stringify(user));
                return result[0];
            }
            return null;
        } catch (error) {
            throw new SQLException(`Error al consultar: ${error}`);
        }
    }

    async getAll(): Promise<User[]> {
        const statement = `SELECT * FROM ${this.table}`;
        try {
            return await this.db.query(statement);
        } catch (error) {
            throw new SQLException(`Error al consultar: ${error}`);
        }
    }
}
