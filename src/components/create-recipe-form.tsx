import React, { type SyntheticEvent } from "react";
import { type Resolver } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useCreateRecipe, { useZodForm } from "~/hooks/use-create-recipe";
import { createRecipeSchema } from "~/models";
import { type z } from "zod";

export default function CreateRecipeForm() {
  const mutate = useCreateRecipe();
  const { t } = useTranslation("common");

  const { formState, reset, register, handleSubmit } = useZodForm({
    schema: createRecipeSchema,
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function submitHandler(values: z.infer<typeof createRecipeSchema>) {
    await mutate.mutateAsync(values);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} method="post">
      <label>
        Name
        <input {...register("name")} />
      </label>

      <label>
        Description
        <input {...register("description")} />
      </label>

      <button disabled={mutate.isLoading} type="submit">
        {t("save")}
      </button>
    </form>
  );
}
