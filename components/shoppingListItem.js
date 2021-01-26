import { Button, Accordion, Card, Row, Col } from 'react-bootstrap';
import { Plus, Dash } from 'react-bootstrap-icons';

const ShoppingListItem = (props) => {
    const selected = props.recipe.selected;

    const handleClick = () => {
        props.handleClick(props.recipe._id, !selected);
    }

    return (
                <Accordion className="mb-2">
                    <Card>
                        <Card.Header>
                        <Row className="justify-content-center">
                            <Col md={9} xs={8}>
                                <Accordion.Toggle as={Button} className={"text-left " + (selected ? "text-success" : "text-secondary")} variant="link" eventKey="0">
                                    {props.recipe.title}
                                </Accordion.Toggle>
                            </Col>
                            <Col md={1} xs={4}>
                                <Button variant={"light"} onClick={() => handleClick()}>
                                    {selected ? <Dash className="text-danger"/> : <Plus className="text-secondary"/>}
                                </Button>
                            </Col>
                        </Row>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">{props.recipe.description}</Card.Subtitle>
                            <div className="card-text"><ul>{ props.recipe.ingredients.map(ingredient => <li key={props.recipe.ingredients.indexOf(ingredient)}>{ingredient}</li>)}</ul></div>
                            <Card.Link href={props.recipe.url}>{props.recipe.url}</Card.Link>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
    )
}

export default ShoppingListItem;