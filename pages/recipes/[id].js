import { useState } from 'react';
import Layout from "../../components/layout";
import RecipeForm from '../../components/recipeForm';
import { useRouter } from 'next/router';
import { fetcherGet, fetcherPost, fetcherDelete } from "../../util/fetchUtils";
import useSwr from 'swr';
import { Button, Form, Container, Col } from 'react-bootstrap';
import { Share, Trash } from 'react-bootstrap-icons';
import { useSession } from 'next-auth/client';

const Recipe = () => {
    const [ session, loading ] = useSession();
    const [username, setUsername] = useState("");
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSwr(session && session.id ? `/api/${session.id}/recipes/${id}` : null, fetcherGet);

    const share = () => {
        const res = fetcherPost(`/api/${session.id}/recipes/share/${id}`, {username: username});
        router.push('/recipes');
    }

    const remove = () => {
        const res = fetcherDelete(`/api/${session.id}/recipes/${id}`);
        router.push('/recipes');
    }

    return (
        <Layout>
            {data && <>
            <RecipeForm data={data}/>
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