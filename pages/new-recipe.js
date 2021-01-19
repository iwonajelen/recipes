import Layout from "../components/layout";
import RecipeForm from '../components/recipeForm';
import { fetcherPost } from "../util/fetchUtils";
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const NewRecipe = () => {
    const [ session, loading ] = useSession();
    const router = useRouter()

    const onSubmit = async (data) => {
        const result = await fetcherPost(session && session.id ? `/api/${session.id}/recipes` : null, data);
        router.push('/recipes');
    }

    return (
        <Layout>
            <RecipeForm onSubmit={(data) => onSubmit(data)}/>
        </Layout>
    )
}

export default NewRecipe;