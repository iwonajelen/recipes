import Layout from "../components/layout";
import Recipe from "../components/recipe";
import useSwr from 'swr';
import { useRouter } from 'next/router';
import { CardColumns } from "react-bootstrap";

const fetcher = (url) => fetch(url).then((res) => res.json())

const Recipes = () => {
    const router = useRouter()
    const { data, error } = useSwr('/api/recipes', fetcher);

    const showRecipes = (data) => {
        if(router.query) {
            const searchQuery = router.query.search;
            if(searchQuery) {
                return data.filter(recipe => {
                    return recipe.title.toLowerCase().includes(searchQuery) ||
                        (recipe.description && recipe.description.toLowerCase().includes(searchQuery)) ||
                        recipe.link.toLowerCase().includes(searchQuery)
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