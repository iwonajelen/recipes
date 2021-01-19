import { Card, Row, Button, Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Pencil } from 'react-bootstrap-icons';
import { useSession } from 'next-auth/client';

const Recipe = (props) => {
    const [ session, loading ] = useSession();
    const router = useRouter();

    return (
        <Card key={props._id} bg={'light'}>
        <Card.Header>
            <Nav variant="pills" className="justify-content-between">
                <Nav.Item>    
                    <h4 className="align-middle">{props.title}</h4>
                </Nav.Item>
                {props.createdBy === session.id && <Nav.Item>    
                    <Button variant="warning" onClick={() => router.push(`/recipes/${props._id}`)}><Pencil/></Button>
                </Nav.Item>}
            </Nav>
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