import express from 'express';
import * as http from 'http';
import routes from '@api/routes';

export class Server {
    private readonly port: string;
    private readonly app: express.Express;
    private httpServer?: http.Server;

    constructor(port: string) {
        this.port = port;
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(routes);
    }

    async listen(): Promise<void> {
        return await new Promise((resolve) => {
            this.httpServer = this.app.listen(this.port, () => {
                console.log(`App running at http://localhost:${this.port}/`);
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        return await new Promise((resolve, reject) => {
            if (this.httpServer != null) {
                this.httpServer.close((error) => {
                    if (error != null) {
                        return reject(error);
                    }
                    return resolve();
                });
            }

            return resolve();
        });
    }
}
