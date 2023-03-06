import { createRecipeSchema } from "~/models";
import { api } from "~/utils/api";
import { type z } from "zod";
import { useForm, type UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
}

export default function useCreateRecipe() {
  const utils = api.useContext();

  return api.recipe.create.useMutation({
    async onMutate(newRecipe) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.recipe.getAll.cancel();

      // Get the data from the queryCache
      const prevData = utils.recipe.getAll.getData();

      // Optimistically update the data with our new post
      utils.recipe.getAll.setData(undefined, (prevEntries) => {
        if (prevEntries) {
          return [newRecipe, ...prevEntries];
        } else {
          return [newRecipe];
        }
      });

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(err, newRecipe, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.recipe.getAll.setData(undefined, ctx?.prevData);
    },
    async onSettled() {
      // Sync with server once mutation has settled
      await utils.recipe.getAll.invalidate();
    },
  });
}
