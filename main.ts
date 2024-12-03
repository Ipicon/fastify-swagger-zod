import fastify from "fastify";
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { usersRoutes } from "./users";
import { postsRoutes } from "./posts";

// declaring auto type provider, e.g: schema -> auto ts type
const server = fastify()
    .withTypeProvider<ZodTypeProvider>()
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler);

// swagger stuff
server.register(fastifySwagger, {
    openapi: {
        info: {
            title: "SampleApi",
            description: "Sample backend service",
            version: "1.0.0",
        },
        servers: [],
    },
    transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUI, {
    routePrefix: "/documentation",
});

server.register(usersRoutes, { prefix: "/users" });
server.register(postsRoutes, { prefix: "/posts" });

const run = async () => {
    await server.ready();

    await server.listen({ port: 8080 }, (err, address) => {
        if (err) {
            console.error(err);

            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
};

run();
