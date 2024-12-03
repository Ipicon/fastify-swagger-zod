import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { meSchema } from "./schemes";

export const postsRoutes: FastifyPluginAsyncZod = async function (
    fastify,
    _opts,
) {
    // post schema
    fastify.post("/add", {
        schema: {
            body: z.object({
                name: z.string().min(
                    4,
                    "name should be at least 4 chars long :3",
                ),
            }),
        },
    }, (req, res) => {
        res.send(req.body.name);
    });
};
