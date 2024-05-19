import { z } from "zod";
import { Request } from "express";


const bodyObject = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().optional(),
  quantity: z.number().positive("Quantidade obrigatória"),
  price: z.number().positive("Preço obrigatório"),
  categoryId: z.number().positive("Categoria obrigatória"),
});

const paramsObject = z.object({
  id: z.number().positive("Id obrigatório"),
});

export function editProductParser(req: Request) {
  return bodyObject.parse(req.body);
}

export function editParamsProductParser(req: Request) {
  const id = parseInt(req.params.id);
  
  return paramsObject.parse({id});
}

export type editProductParser = z.infer<typeof bodyObject>;
export type editParamsProductParser = z.infer<typeof paramsObject>;
