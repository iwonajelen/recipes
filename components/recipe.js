import { Card } from 'react-bootstrap';

const Recipe = (props) => {
    return (
        <Card key={props._id} bg={'light'}>
        <Card.Header as="h5">{props.title}</Card.Header>
        <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{props.description}</Card.Subtitle>
            <Card.Text>
                <ul>{ props.ingredients.map(ingredient => <li>{ingredient}</li>)}</ul>
            </Card.Text>
            <Card.Link href={props.link}>{props.link}</Card.Link>
        </Card.Body>
        </Card>
    )
}

export default Recipe;