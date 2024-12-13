import { Card, Col, Container, Form, Row } from "react-bootstrap";
import RecipeCard from "./RecipeCard";


function RecipesMain({ recipes, lastRecipeRef, addSort }) {

    return (
        <Card className="px-4 py-5 border-0">
            <h1 className="ps-2">Recipes</h1>
            <div className="d-flex justify-content-end">
                <h3>Order by:</h3>
                <Form.Select className="w-25 ms-3" onChange={(e) => addSort(e.target.value)}>
                    <option>A-Z</option>
                    <option value="time">Preparation time</option>
                    <option value="calories">Calories</option>
                    <option value="popularity">Popularity</option>
                </Form.Select>
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