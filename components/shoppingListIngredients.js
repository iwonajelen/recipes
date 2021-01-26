import { InputGroup, FormControl, Form, Button } from "react-bootstrap";
import { Trash } from 'react-bootstrap-icons';

const ShoppingListIngredients = (props) => {
    const editableList = (ingredients) => {
        const IngredientInput = (props) => {
            return (  
                <InputGroup className="mb-1">
                    <FormControl type="text" defaultValue={props.value} onBlur={(e) => props.handleChange(props.index, e.target.value)} />
                    <InputGroup.Append>
                        <Button variant="danger" onClick={() => props.removeIngredient(props.index)}><Trash/></Button>
                    </InputGroup.Append>
                </InputGroup>
                )
            }

        return <div>
            {ingredients.map(ingredient => 
                <IngredientInput 
                    key={ingredients.indexOf(ingredient)}
                    index={ingredients.indexOf(ingredient)} 
                    value={ingredient.value}
                    checked={ingredient.checked}
                    removeIngredient={(index) => props.removeIngredient(index)}
                    handleChange={(index, value) => props.handleValueChange(index, value)}/>
                    )}
            </div>;
    }

    const previewList = (ingredients) => {
        return <Form>
                {ingredients.map(ingredient => 
                    <Form.Check 
                        onChange={(e) => props.handleCheckChange(ingredients.indexOf(ingredient), e.target.checked)}
                        key={ingredients.indexOf(ingredient)}
                        label={ingredient.value}
                        checked={ingredient.checked}
                    />
                    )}
                </Form>;
    }

    return <>{props.edit ? editableList(props.ingredients) : previewList(props.ingredients)}</>;
}

export default ShoppingListIngredients;