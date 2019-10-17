import express, { Request, Response } from 'express';
import redis from 'redis';
import process from 'process';

const app = express();
const redisClient = redis.createClient({
    // NOTE: we can access this server just by name and without a connection string, because we are declaring
    // the redis-server and our node app as sibling docker container in our docker-compose file. When redis attempts
    // to connect to the host redis-server, Docker will intervene and resolve that host address to its container 
    host: 'redis-server',
    port: 6379
});
const visitsKey = 'visits';

redisClient.set(visitsKey, '0');

app.get('/', (request: Request, response: Response) => {
    redisClient.get(visitsKey, (error: Error | null, visits: string) => {
        response.send(`Number of visits is ${visits}`);
        redisClient.set(visitsKey, `${Number(visits) + 1}`)
    });
});

app.listen(3000, () => console.log('Multi-container nodejs redis app is running.'));