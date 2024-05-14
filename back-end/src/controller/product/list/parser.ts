import { Request } from "express";
import { z } from "zod";

const listProductSchema  = z.object({
  id: z.number().positive("Id obrigatório"),
});

export function listProductParser(req: Request) {
  const id = parseInt(req.params.id);
  
  return listProductSchema.parse({id});
}
export type ListProductSchema = z.infer<typeof listProductSchema>;
