import { Spinner, Row, Container } from 'react-bootstrap';

const Loading = () => {
    return (
        <Container className="min-vh-100">
            <Row className="min-vh-100 justify-content-center align-items-center">
                <Spinner variant="secondary" animation="border" role="status" style={{margin: 'auto', width: '200px', height: '200px', borderWidth: '1em'}}/>
            </Row>
        </Container>
    )
}

export default Loading;