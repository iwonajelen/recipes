import { InputGroup, FormControl, Form } from "react-bootstrap";

const ShoppingListIngredients = (props) => {
    const editableList = (ingredients) => {
        const IngredientInput = (props) => {
            return (  
                <InputGroup className="mb-1">
                    <InputGroup.Prepend>
                    <InputGroup.Checkbox checked={props.checked} onChange={(e) => props.handleCheckChange(props.index, e.target.checked)} />
                    </InputGroup.Prepend>
                    <FormControl type="text" defaultValue={props.value} onBlur={(e) => props.handleChange(props.index, e.target.value)} />
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
                    handleCheckChange={(index, checked) => props.handleCheckChange(index, checked)}
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