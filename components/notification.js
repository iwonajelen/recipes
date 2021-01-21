import { useState } from 'react';
import { Toast, Container, Row, Col } from 'react-bootstrap';

export const variants = {
    primary: "primary",
    warning: "warning",
    danger: "danger",
    info: "info"
}

export const Notification = (props) => {
    const [show, setShow] = useState(true);

    const onClose = () => {
        setShow(false);
        props.onClose();
    }

    return (
        <Container className="fixed-top">
            <Row className="justify-content-center">
                    <Toast className="col-md-6" onClose={onClose} show={show} delay={3000} autohide>
                        <Toast.Header>
                        {props.title && <strong className={`mr-auto text-${props.variant}`}>{props.title}</strong>}
                            {props.subtitle && <small>{props.subtitle}</small>}
                        </Toast.Header>
                        {props.body && <Toast.Body className={`text-${props.variant}`}>{props.body}</Toast.Body>}
                    </Toast>
            </Row>
        </Container>
    )
}   