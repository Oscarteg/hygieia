import { createRecipeSchema } from "~/models";
import { Prisma } from "@prisma/client";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany();
  }),
  create: protectedProcedure
    .input(createRecipeSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.recipe.create({
        data: input,
      });
    }),
});
