import mysql, { Pool, PoolConfig } from 'mysql';

export class MySQL {
    private static INSTANCE: MySQL;
    private pool: Pool;
    private readonly HOST: string = process.env.DB_HOST || '';
    private readonly USER: string = process.env.DB_USER || '';
    private readonly PASSWORD: string = process.env.DB_PASSWORD || '';
    private readonly DATABASE: string = process.env.DB_NAME || '';
    private readonly PORT: number = parseInt(process.env.DB_PORT || '3306', 10);

    private constructor() {
        const config: PoolConfig = {
            host: this.HOST,
            user: this.USER,
            password: this.PASSWORD,
            database: this.DATABASE,
            port: this.PORT,
            connectionLimit: 10,
        };

        this.pool = mysql.createPool(config);
    }

    public static getInstance(): MySQL {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new MySQL();
        }
        return MySQL.INSTANCE;
    }

    public async query<T = any>(statement: string, values?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            this.pool.query(statement, values, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    public async close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.pool.end((error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }
}
