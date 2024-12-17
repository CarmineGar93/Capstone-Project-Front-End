import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import { useState } from "react";


function RecipesMain({ recipes, lastRecipeRef, addQuery }) {
    const [value, setValue] = useState("")
    return (
        <Card className="px-4 py-5 border-0">
            <h1 className="ps-3">Recipes</h1>
            <div className="d-flex justify-content-end mb-2">
                <InputGroup className="w-50">
                    <Form.Control type="text" placeholder="Search a recipe" value={value} onChange={(e) => setValue(e.target.value)}>
                    </Form.Control>
                    <Button variant="danger" onClick={() => addQuery(value)}>Search</Button>
                </InputGroup>
            </div>
            <Container fluid className="my-3">
                <Row xs={1} sm={2} lg={3} xl={4} className="gx-3 gy-4">
                    {
                        recipes && recipes.map((recipe, index) => {
                            return (
                                <Col key={recipe.reference ? recipe.reference : recipe.id} >
                                    <div ref={recipes.length === index + 1 ? lastRecipeRef : null}>
                                        <RecipeCard recipe={recipe} />
                                    </div>

                                </Col>

                            )
                        })
                    }
                </Row>
            </Container>
        </Card>
    )
}

export default RecipesMain