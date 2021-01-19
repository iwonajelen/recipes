import { Card, Row, Button, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Pencil } from 'react-bootstrap-icons';
import { useSession } from 'next-auth/client';

const Recipe = (props) => {
    const [ session, loading ] = useSession();
    const router = useRouter();

    return (
        <Card key={props._id} bg={'light'}>
        <Card.Header>
            <Row className="justify-content-between">
                <Col xs={9} md={10}>    
                    <h5 className="align-middle">{props.title}</h5>
                </Col>
                {props.createdBy === session.id && <Col xs={3} md={2}>    
                    <Button variant="outline-warning" onClick={() => router.push(`/recipes/${props._id}`)}><Pencil/></Button>
                </Col>}
            </Row>
        </Card.Header>
        <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{props.description}</Card.Subtitle>
            <div className="card-text"><ul>{ props.ingredients.map(ingredient => <li key={props.ingredients.indexOf(ingredient)}>{ingredient}</li>)}</ul></div>
            <Card.Link href={props.url}>{props.url}</Card.Link>
        </Card.Body>
        </Card>
    )
}

export default Recipe;