import { useState } from 'react';
import Layout from "../components/layout";
import RecipeForm from '../components/recipeForm';
import { callPost } from "../util/fetchUtils";
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Notification, variants } from "../components/notification";

const NewRecipe = () => {
    const [ session, loading ] = useSession();
    const [ showNotification, setShowNotification ] = useState(false);
    const [ disableSubmit, setDisableSubmit ] = useState(false);
    const router = useRouter();

    const onSubmit = async (data) => {
        const recipe = {...data, ingredients: data.ingredients.filter(ingredient => !!ingredient && ingredient.replace(/\s/g, "").length > 0)};
        const res = await callPost(`/api/${session.id}/recipess`, recipe);
        if(res.status >= 400) {
            setShowNotification(true);
        } else if (res.status === 201) {
            router.push('/recipes');
        }
    }

    const onCloseNotification = () => {
        setShowNotification(false);
    }

    return (
        <Layout>
            {showNotification && <Notification title="Create recipe" body="An error occured" variant={variants.danger} onClose={() => onCloseNotification()}/>}
            <RecipeForm onSubmit={(data) => onSubmit(data)} disableSubmit={disableSubmit}/>
        </Layout>
    )
}

export default NewRecipe;