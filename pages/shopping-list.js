import Layout from "../components/layout";
import ShoppingListItem from "../components/shoppingListItem";
import ShoppingListIngredients from "../components/shoppingListIngredients";
import Loading from '../components/loading';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tab, Container, Row, Col, Nav } from "react-bootstrap";
import { getRecipes } from "../util/fetchUtils";
import { getSession } from 'next-auth/client';
import { useMediaQuery } from 'react-responsive';

const ShoppingList = () => {
    const [ getError, setGetError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ data, setData ] = useState(null);
    const [ ingredients, setIngredients ] = useState([]);
    const router = useRouter();

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    useEffect(() => {
        loadRecipes();
    }, []);

    useEffect(() => {
        if(!!data) selectedIngredients();
    }, [data]);

    const selectedIngredients = () => {
        let selectedIngredients = [];

        const selectedRecipes = [...data].filter(recipe => !!recipe.selected);

        for(const recipe of selectedRecipes) {
            selectedIngredients = [...selectedIngredients, ...recipe.ingredients];
        }

        const selectedIngredientsWithCheckbox = selectedIngredients.map(ingredient => {
            return {
                value: ingredient,
                checked: false
            }
        })

        setIngredients(selectedIngredientsWithCheckbox);
    }

    const loadRecipes = async () => {
        setIsLoading(true);
        const sessionData = await getSession();
        if(sessionData && sessionData.id) {
            const res = await getRecipes(sessionData.id);
            if(res.status >= 400) {
                setGetError(true);
            } else {
                setGetError(false);
                const json = await res.json();
                setData(shoppingListRecipes(json));
            }
        }
        setIsLoading(false);
    }

    const shoppingListRecipes = (data) => {
        return data.map((recipe) => {
            return {
                ...recipe,
                selected: false
            }
        })
    }

    const handleChangeShoppingList = (id, shouldAdd) => {
        const recipesListData = [...data].map(recipe => {
            return recipe._id === id ? {...recipe, selected: shouldAdd } : recipe;
        })
        setData(recipesListData);
    }

    const handleIngredientChange = (index, value) => {
        const changedIngredients = [...ingredients];
        changedIngredients[index].value = value;
        setIngredients(changedIngredients);
    }

    const handleIngredientCheckedChange = (index, checked) => {
        const changedIngredients = [...ingredients];
        changedIngredients[index].checked = checked;
        setIngredients(changedIngredients);
    }

    const showRecipes = (data) => {
        if(router.query) {
            const searchQuery = router.query.search;
            if(searchQuery) {
                return data.filter(recipe => {
                    return recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (recipe.description && recipe.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        recipe.url.toLowerCase().includes(searchQuery.toLowerCase())
                }).map(recipe => <ShoppingListItem key={recipe._id} recipe={recipe} added={false} handleClick={(id, shouldAdd) => handleChangeShoppingList(id, shouldAdd)}/>);
            }
        }

        return data.map((recipe) => <ShoppingListItem key={recipe._id} recipe={recipe} added={false} handleClick={(id, shouldAdd) => handleChangeShoppingList(id, shouldAdd)} />);
    }

    if(isLoading) {
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }

    return (
        <Layout>
            {getError ? 
            <Container>
                <Jumbotron>
                    <h1>Recipes not found</h1>
                    <p>An error occured while downloading recipes</p>
                    <p>
                        <Button variant="info" onClick={() => loadRecipes()}>Refresh</Button>
                    </p>
                </Jumbotron>
            </Container> :
            <Container>
                <Tab.Container defaultActiveKey="select">
                    <Row className="justify-content-center">
                        <Col sm={8}>
                        <Nav fill={isTabletOrMobile} variant="tabs" className="justify-content-center">
                            <Nav.Item>
                            <Nav.Link eventKey="select">Select</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="preview">Preview</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="edit">Edit</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                    </Row>
                    <Tab.Content className="mt-3">
                        <Tab.Pane eventKey="select">
                        {data && showRecipes(data)}
                        </Tab.Pane>
                        <Tab.Pane eventKey="preview">
                        {data && <ShoppingListIngredients 
                                    edit={false} 
                                    ingredients={ingredients} 
                                    handleCheckChange={(idx, checked) => handleIngredientCheckedChange(idx, checked)}/>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="edit">
                        {data && <ShoppingListIngredients 
                                    edit={true} 
                                    ingredients={ingredients} 
                                    handleCheckChange={(idx, checked) => handleIngredientCheckedChange(idx, checked)}
                                    handleValueChange={(idx, value) => handleIngredientChange(idx, value)}/>}
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>}
        </Layout>
    )
}

export default ShoppingList;