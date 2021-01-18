import { Card } from 'react-bootstrap';

const Recipe = (props) => {
    return (
        <Card key={props._id} style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.subtitle}</Card.Subtitle>
            <Card.Text>
                <ul>{ props.ingredients.map(ingredient => <li>{ingredient}</li>)}</ul>
            </Card.Text>
            <Card.Link href={props.link}>{props.link}</Card.Link>
        </Card.Body>
        </Card>
    )
}

export default Recipe;