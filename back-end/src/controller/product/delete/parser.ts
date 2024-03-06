import { Request } from "express";
import { z } from "zod";

const deleteProductParamsSchema  = z.object({
  id: z.number().positive("Id obrigatório"),
});

export function deleteProductParser(req: Request) {
  const id = parseInt(req.params.id);
  
  return deleteProductParamsSchema.parse({id});
}
export type DeleteProductParams = z.infer<typeof deleteProductParamsSchema>;
