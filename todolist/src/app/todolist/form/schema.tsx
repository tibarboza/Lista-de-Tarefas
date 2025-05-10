import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string(),
  status: z.string(),
  dtCreate: z.string(),
  dtChange: z.string(),
  isVisible: z.boolean(),
});
