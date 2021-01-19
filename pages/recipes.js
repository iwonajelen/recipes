import Layout from "../components/layout";
import Recipe from "../components/recipe";
import useSwr from 'swr';
import { useRouter } from 'next/router';
import { CardColumns } from "react-bootstrap";
import { fetcherGet } from "../util/fetchUtils";
import { useSession } from 'next-auth/client';

const Recipes = () => {
    const [ session, loading ] = useSession();
    const router = useRouter();
    const { data, error } = useSwr(session && session.id ? `/api/${session.id}/recipes` : null, fetcherGet);

    const showRecipes = (data) => {
        if(router.query) {
            const searchQuery = router.query.search;
            if(searchQuery) {
                return data.filter(recipe => {
                    return recipe.title.toLowerCase().includes(searchQuery) ||
                        (recipe.description && recipe.description.toLowerCase().includes(searchQuery)) ||
                        recipe.url.toLowerCase().includes(searchQuery)
                }).map(recipe => Recipe(recipe));
            }
        }

        return data.map((recipe) => Recipe(recipe));
    }
    return (
        <Layout>
            <CardColumns>{data && showRecipes(data)}</CardColumns>
        </Layout>
    )
}

export default Recipes;