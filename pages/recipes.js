import Layout from "../components/layout";
import Recipe from "../components/recipe";
import useSwr from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json())

const Recipes = () => {
    const { data, error } = useSwr('/api/recipes', fetcher)
    return (
        <Layout>
            <div>
                <h1>
                    <p>Przepisy</p>
                </h1>
                {(data && data.length > 0) && data.map((recipe) => Recipe(recipe))}
            </div>
        </Layout>
    )
}

export default Recipes;