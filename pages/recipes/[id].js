import { useState, useEffect } from 'react';
import Layout from "../../components/layout";
import RecipeForm from '../../components/recipeForm';
import { useRouter } from 'next/router';
import { fetcherGet, fetcherPost, fetcherDelete, fetcherUpdate } from "../../util/fetchUtils";
import { Button, Form, Container, Col } from 'react-bootstrap';
import { Share } from 'react-bootstrap-icons';
import { useSession, getSession } from 'next-auth/client';

const Recipe = () => {
    const [ session, loading ] = useSession();
    const [username, setUsername] = useState("");
    const [data, setData] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(async () => {
        const sessionData = await getSession();
        if(sessionData && sessionData.id) {
            const res = await fetcherGet(`/api/${sessionData.id}/recipes/${id}`);
            setData(res);
        }
    }, []);

    const share = async () => {
        const res = await fetcherPost(`/api/${session.id}/recipes/share/${id}`, {username: username});
        router.push('/recipes');
    }

    const remove = async () => {
        const res = await fetcherDelete(`/api/${session.id}/recipes/${id}`);
        router.push('/recipes');
    }

    const onSubmit = async (data) => {
        const recipe = {...data, ingredients: data.ingredients.filter(ingredient => !!ingredient && ingredient.replace(/\s/g, "").length > 0)};
        await fetcherUpdate(`/api/${session.id}/recipes/${id}`, recipe);
        router.push('/recipes');
    }

    return (
        <Layout>
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