import Layout from "../components/layout";
import Recipe from "../components/recipe";
import Loading from '../components/loading';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CardColumns } from "react-bootstrap";
import { getRecipes, unshareRecipe } from "../util/fetchUtils";
import { useSession, getSession } from 'next-auth/client';
import { Notification, variants } from "../components/notification";

const Recipes = () => {
    const [ session, loading ] = useSession();
    const [ getError, setGetError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ deleteError, setDeleteError ] = useState(false);
    const [ data, setData ] = useState(null);
    const router = useRouter();

    useEffect(() => {
        loadRecipes();
    }, []);

    const loadRecipes = async () => {
        setIsLoading(true);
        const sessionData = await getSession();
        if(sessionData && sessionData.id) {
            const res = await getRecipes(sessionData.id);
            if(res.status >= 400) {
                setGetError(true);
            } else {
                setGetError(false);
                const json = await res.json();
                setData(json);
            }
        }
        setIsLoading(false);
    }

    const remove = async (id) => {
        const res = await unshareRecipe(session.id, id);
        if(res.status === 200) {
            loadRecipes();
        } else if(res.status >= 400) {
            setDeleteError(true);
        }
    }

    const onCloseNotification = () => {
        setDeleteError(false);
    }

    const showRecipes = (data) => {
        if(router.query) {
            const searchQuery = router.query.search;
            if(searchQuery) {
                return data.filter(recipe => {
                    return recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (recipe.description && recipe.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        recipe.url.toLowerCase().includes(searchQuery.toLowerCase())
                }).map(recipe => <Recipe key={recipe._id} recipe={recipe} remove={(id) => remove(id)}/>);
            }
        }

        return data.map((recipe) => <Recipe key={recipe._id} recipe={recipe} remove={(id) => remove(id)} />);
    }

    if(isLoading) {
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }

    return (
        <Layout>
            {getError && 
            <Container>
                <Jumbotron>
                    <h1>Recipes not found</h1>
                    <p>An error occured while downloading recipes</p>
                    <p>
                        <Button variant="info" onClick={() => loadRecipes()}>Refresh</Button>
                    </p>
                </Jumbotron>
            </Container>}
            {deleteError && <Notification title="Delete recipe" body="An error occured" variant={variants.danger} onClose={() => onCloseNotification()}/>}
            <CardColumns>{data && showRecipes(data)}</CardColumns>
        </Layout>
    )
}

export default Recipes;