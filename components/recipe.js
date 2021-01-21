import { Card, Row, Button, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { useSession } from 'next-auth/client';

const Recipe = (props) => {
    const [ session, loading ] = useSession();
    const router = useRouter();

    const remove = () => {
        props.remove(props.recipe._id);
    }

    return (
        <Card key={props.recipe._id} bg={'light'}>
        <Card.Header>
            <Row className="justify-content-between">
                <Col xs={9} md={10}>    
                    <h5 className="align-middle">{props.recipe.title}</h5>
                </Col>
                {props.recipe.createdBy === session.id ? <Col xs={3} md={2}>    
                    <Button variant="warning" onClick={() => router.push(`/recipes/${props.recipe._id}`)}><Pencil/></Button>
                </Col> : <Col xs={3} md={2}>    
                    <Button variant="danger" onClick={() => remove()}><Trash/></Button>
                </Col>}
            </Row>
        </Card.Header>
        <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{props.recipe.description}</Card.Subtitle>
            <div className="card-text"><ul>{ props.recipe.ingredients.map(ingredient => <li key={props.recipe.ingredients.indexOf(ingredient)}>{ingredient}</li>)}</ul></div>
            <Card.Link href={props.recipe.url}>{props.recipe.url}</Card.Link>
        </Card.Body>
        </Card>
    )
}

export default Recipe;