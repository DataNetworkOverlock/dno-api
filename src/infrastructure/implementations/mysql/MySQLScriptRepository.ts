import { Script } from '@domain/entities/script/script';
import { Tag } from '@domain/entities/tag/tag';
import { SQLException } from '@domain/exceptions';
import { ScriptRepository } from '@domain/repositories/script-repository';
import { MySQL } from '@infrastructure/driven-adapters/MySQL';

export class MySQLScriptRepository implements ScriptRepository {
    private readonly db = MySQL.getInstance();
    private readonly table = 'scripts';
    private readonly tagTable = 'scripts_tags';

    async create(script: Script): Promise<Script> {
        const statement = `INSERT INTO ${this.table} SET ?`;
        const data = {
            uuid: script.uuid.value,
            name: script.name.value,
            description: script.description.value,
            source: script.source.value,
        };
        try {
            const scriptCreated = await this.db.query(statement, data);
            await this.addTags(data.uuid, script.tags.value);
            return scriptCreated;
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

    async getById(uuid: string): Promise<Script> {
        const statement = `SELECT * FROM ${this.table} WHERE uuid = ?`;
        try {
            return await this.db.query(statement, uuid);
        } catch (error) {
            throw new SQLException(`Error al consultar: ${error}`);
        }
    }

    async getAll(): Promise<Script[]> {
        const statement = `SELECT * FROM ${this.table}`;
        try {
            return await this.db.query(statement);
        } catch (error) {
            throw new SQLException(`Error al consultar: ${error}`);
        }
    }

    private async getTags(): Promise<Tag[]> {
        const statement = `SELECT id, name FROM tags`;
        try {
            return await this.db.query(statement);
        } catch (error) {
            throw new SQLException(`Error al obtener las etiquetas: ${error}`);
        }
    }

    private async addTags(scriptId: string, scriptTags: string[]): Promise<boolean> {
        const statement = `INSERT INTO ${this.tagTable} SET ?`;
        try {
            const tags = await this.getTags();
            for (let i = 0; i < tags.length; i++) {
                const { id, name } = tags[i];
                if (scriptTags.includes(name.toString())) {
                    const data = {
                        script: scriptId,
                        tag: id,
                    };
                    await this.db.query(statement, data);
                }
            }
            return true;
        } catch (error) {
            throw new SQLException(`Error al insertar las etiquetas: ${error}`);
        }
    }
}
