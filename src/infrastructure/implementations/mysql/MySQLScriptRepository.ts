import { Script } from '@domain/entities/script/script';
import { Tag } from '@domain/entities/tag/tag';
import { SQLException } from '@domain/exceptions';
import { ScriptRepository } from '@domain/repositories/script-repository';
import { MySQL } from '@infrastructure/driven-adapters/MySQL';

export class MySQLScriptRepository implements ScriptRepository {
    private readonly db = MySQL.getInstance();
    private readonly scriptsTable = 'scripts';
    private readonly scriptsTagsTable = 'scripts_tags';
    private readonly tagsTable = 'tags';

    async create(script: Script): Promise<Script> {
        const statement = `INSERT INTO ${this.scriptsTable} SET ?`;
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
        const statement = `DELETE FROM ${this.scriptsTable} WHERE uuid = ?`;
        try {
            return await this.db.query(statement, uuid);
        } catch (error) {
            throw new SQLException(`Error al eliminar: ${error}`);
        }
    }

    async getById(uuid: string): Promise<Script | null> {
        const statement = `SELECT * FROM ${this.scriptsTable} WHERE uuid = ?`;
        try {
            const script = await this.db.query(statement, uuid);
            if (script.length > 0) {
                const result = JSON.parse(JSON.stringify(script));
                return result[0];
            }
            return null;
        } catch (error) {
            throw new SQLException(`Error al consultar: ${error}`);
        }
    }

    async getAll(): Promise<Script[]> {
        const statement = `SELECT * FROM ${this.scriptsTable}`;
        try {
            const scripts: Script[] = await this.db.query(statement);
            if (scripts.length > 0) {
                const scriptsWithTags = JSON.parse(JSON.stringify(scripts));
                for (let i = 0; i < scriptsWithTags.length; i++) {
                    const tags: string[] = await this.getTagsByScript(String(scriptsWithTags[i].uuid));
                    scriptsWithTags[i].tags = tags;
                }
                return scriptsWithTags;
            }
            return [];
        } catch (error) {
            throw new SQLException(`Error al consultar: ${error}`);
        }
    }

    private async getTags(): Promise<Tag[]> {
        const statement = `SELECT id, name FROM ${this.tagsTable}`;
        try {
            return await this.db.query(statement);
        } catch (error) {
            throw new SQLException(`Error al obtener las etiquetas: ${error}`);
        }
    }

    private async getTagsByScript(scriptUuid: string): Promise<string[]> {
        const statement = `SELECT ${this.tagsTable}.name FROM ${this.tagsTable}, ${this.scriptsTagsTable} WHERE ${this.scriptsTagsTable}.script = '${scriptUuid}' AND ${this.scriptsTagsTable}.tag = ${this.tagsTable}.id`;
        try {
            const tags: string[] = await this.db.query(statement, scriptUuid);
            if (tags.length > 0) {
                const tagsArray: { name: string }[] = JSON.parse(JSON.stringify(tags));
                return tagsArray.map((tag) => tag.name);
            }
            return [];
        } catch (error) {
            throw new SQLException(`Error al obtener las etiquetas del script: ${error}`);
        }
    }

    private async addTags(script: string, scriptTags: string[]): Promise<boolean> {
        const statement = `INSERT INTO ${this.scriptsTagsTable} SET ?`;
        try {
            const tags = await this.getTags();
            for (let i = 0; i < tags.length; i++) {
                const { id, name } = tags[i];
                if (scriptTags.includes(name.toString())) {
                    const data = {
                        script: script,
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
