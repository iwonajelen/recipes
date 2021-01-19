import React, { useState } from 'react';
import { Formik } from 'formik';
import { Container, Button, Form, Col } from 'react-bootstrap';

const RecipeForm = (props) => {
    const [ingredientsAmount, setIngredientsAmount] = useState(1);

    const showIngredientsInputs = (values, handleChange) => {
        return Array.from(Array(ingredientsAmount).keys()).map(i => {
            return <Form.Control 
                className="mb-2" 
                key={i} 
                name={`ingredients[${i}]`} 
                onChange={handleChange} 
                value={values.ingredients[i]} 
                type="text" 
                placeholder={`Enter ingredient ${i+1}`}/>
        })
    }

    const getInitialValues = () => {
        if(props.data) {
            if(props.data.ingredients && props.data.ingredients.length > 0 && props.data.ingredients.length !== ingredientsAmount) {
                setIngredientsAmount(props.data.ingredients.length);
            }

            return {
                ...props.data
            }
        }

        return {
            title: '',
            description: '',
            url: '',
            ingredients: []
        }
    }

    return (
        <Container>
        <Formik
            initialValues={getInitialValues()}
            onSubmit={(values) => {props.onSubmit(values)}}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
        }) => (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Enter title" onChange={handleChange} value={values.title}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" placeholder="Enter description" onChange={handleChange} value={values.description} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Url</Form.Label>
                    <Form.Control type="text" name="url" placeholder="Enter url" onChange={handleChange} value={values.url} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Row>
                        <Col xs={9}>
                            {showIngredientsInputs(values, handleChange)}
                        </Col>
                        <Col xs={2}>
                            <Button onClick={() => setIngredientsAmount(ingredientsAmount+1)}>Add</Button>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    Submit
                </Button>
            </Form>
        )}

        </Formik>
        </Container>
    )
}

export default RecipeForm;