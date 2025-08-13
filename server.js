import { fastify} from 'fastify'
import { DatabasePostgres } from './database-postgres.js';

const database = new DatabasePostgres();
const server= fastify();

server.post('/videos', async (request,reply) =>{
    const {title,description,duration} = request.body;

    await database.create({
        title,
        description,
        duration,
    })

    console.log(database.list());

    return reply.status(201).send();
});

server.get('/videos', async (request,reply) =>{
    const search = request.query.search;

    const videos = await database.list(search);

    return reply.status(200).send(videos);
});

server.get('/videos/:id', async (request,reply) =>{
    const videoId = request.params.id;

    const video = await database.findById(videoId);

    return reply.status(200).send(video);
});


server.put('/videos/:id', async (request, reply) =>{
    const videoId = request.params.id;
    const {title,description,duration} = request.body;


    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send();
});

server.delete('/videos/:id', (request,reply) =>{
    const videoId = request.params.id;

    database.delete(videoId);

    return reply.status(204).send();
});

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
});


