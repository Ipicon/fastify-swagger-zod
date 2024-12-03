import { z } from "zod";

export const meSchema = z.object({
    name: z.string(),
});
