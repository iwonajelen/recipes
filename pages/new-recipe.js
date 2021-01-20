import Layout from "../components/layout";
import RecipeForm from '../components/recipeForm';
import { fetcherPost } from "../util/fetchUtils";
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const NewRecipe = () => {
    const [ session, loading ] = useSession();
    const router = useRouter();

    const onSubmit = async (data) => {
        const recipe = {...data, ingredients: data.ingredients.filter(ingredient => !!ingredient && ingredient.replace(/\s/g, "").length > 0)};
        const result = await fetcherPost(`/api/${session.id}/recipes`, recipe);
        router.push('/recipes');
    }

    return (
        <Layout>
            <RecipeForm onSubmit={(data) => onSubmit(data)}/>
        </Layout>
    )
}

export default NewRecipe;