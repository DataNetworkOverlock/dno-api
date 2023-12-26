import 'module-alias/register';
import { Server } from '@api/Server';

const port: string = process.env.PORT || '3000';
const server: Server = new Server(port);

async function start(): Promise<void> {
    return await server.listen();
}

start();
