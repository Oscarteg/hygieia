import { Prisma } from "@prisma/client";
import { z } from "zod";

export const createIngredientSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const createRecipeSchema = z.object({
  name: z.string(),
  description: z.string(),
});
