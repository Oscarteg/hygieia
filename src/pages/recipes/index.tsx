import { useSession } from "next-auth/react";
import { type ReactElement } from "react";
import CreateRecipeForm from "~/components/create-recipe-form";
import AppLayout from "~/components/layouts/app-layout";
import RecipesTable from "~/components/recipes-table";
import { api } from "~/utils/api";

export default function Recipes() {
  const { data: sessionData } = useSession();

  const { isLoading, data: recipes = [] } = api.recipe.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CreateRecipeForm />
      <RecipesTable recipes={recipes} />
    </div>
  );
}

Recipes.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
