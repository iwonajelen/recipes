import { useState, useEffect } from 'react';
import Layout from "../../components/layout";
import RecipeForm from '../../components/recipeForm';
import Loading from '../../components/loading';
import { useRouter } from 'next/router';
import { getRecipe, shareRecipe, deleteRecipe, updateRecipe } from "../../util/fetchUtils";
import { Button, Form, Container, Col, Alert, Jumbotron } from 'react-bootstrap';
import { Share } from 'react-bootstrap-icons';
import { useSession, getSession } from 'next-auth/client';
import { Notification, variants } from "../../components/notification";

const Recipe = () => {
    const [ session, loading ] = useSession();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ getError, setGetError ] = useState(false);
    const [ deleteError, setDeleteError ] = useState(false);
    const [ updateError, setUpdateError ] = useState(false);
    const [ shareNotification, setShareNotification ] = useState({showError: false, errorMessage: '', showSuccess: false});
    const [ username, setUsername ] = useState("");
    const [data, setData] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        loadRecipe();
    }, []);

    const loadRecipe = async () => {
        setIsLoading(true);
        const sessionData = await getSession();
        if(sessionData && sessionData.id) {
            const res = await getRecipe(sessionData.id, id);
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

    const onCloseNotification = () => {
        setDeleteError(false);
        setUpdateError(false);
        setShareNotification({showSuccess: false});
    }

    const share = async () => {
        const res = await shareRecipe(session.id, id, username);
        if(res.status === 404) {
            setShareNotification({showError: true, errorMessage: <>User <strong>{username}</strong> not found</>});
        } else if(res.status >= 400) {
            setShareNotification({showError: true, errorMessage: 'An error occured'});
        } else if (res.status === 200) {
            await loadRecipe();
            setShareNotification({showError: false, errorMessage: '', showSuccess: true});
        }
    }

    const remove = async () => {
        const res = await deleteRecipe(session.id, id);
        if(res.status === 200) {
            router.push('/recipes');
        } else if(res.status >= 400) {
            setDeleteError(true);
        }
    }

    const onSubmit = async (data) => {
        const recipe = {...data, ingredients: data.ingredients.filter(ingredient => !!ingredient && ingredient.replace(/\s/g, "").length > 0)};
        const res = await updateRecipe(session.id, id, recipe);
        if(res.status === 200) {
            router.push('/recipes');
        } else if(res.status >= 400) {
            setUpdateError(true);
        }
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
                    <h1>Recipe not found</h1>
                    <p>An error occured while downloading this recipe</p>
                    <p>
                        <Button variant="info" onClick={() => loadRecipe()}>Refresh</Button>
                    </p>
                </Jumbotron>
            </Container>}
            {!!shareNotification && shareNotification.showSuccess && <Notification title="Recipe shared" body={<>You have shared this recipe with <strong>{username}</strong> </>} variant={variants.success} onClose={() => onCloseNotification()}/>}
            {deleteError && <Notification title="Delete recipe" body="An error occured" variant={variants.danger} onClose={() => onCloseNotification()}/>}
            {updateError && <Notification title="Update recipe" body="An error occured" variant={variants.danger} onClose={() => onCloseNotification()}/>}
            {data && <>
            <RecipeForm data={data} onSubmit={(data) => onSubmit(data)}/>
            <Container className="mt-4">
                <Form>
                    <Form.Group>
                    {data.users && data.users.length > 0 && <Form.Label>Shared with: <span className="text-muted">{data.users.join(",")}</span></Form.Label>}
                    </Form.Group>
                    <Form.Group controlId="shareUsername">
                    <Form.Label>Share with Github user</Form.Label>
                        <Form.Row>
                            <Col xs={9}>
                                <Form.Control type="text" name="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                            </Col>
                            <Col xs={2}>
                                <Button onClick={share}><Share></Share></Button>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col xs={9}>
                                {!!shareNotification.showError && <Alert variant="danger" className="mt-3" onClose={() => setShareNotification({showError: false, errorMessage: ''})} dismissible>{shareNotification.errorMessage}</Alert>}
                            </Col>
                        </Form.Row>
                    </Form.Group>
                </Form>
            </Container>
            <Container className="mt-4">
                <Button variant="danger" onClick={remove}>Remove this recipe</Button>
            </Container></>}
        </Layout>
    )
}

export default Recipe;