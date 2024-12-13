import { Card, Col, Row } from "react-bootstrap"

function Ingredients({ recipe }) {
    return (
        <Card className="rounded-4 p-5 border-0 bg-white">
            <Row className="gx-2 gy-5">
                <h3 className="mb-3">Ingredients</h3>
                {
                    recipe.extendedIngredients.map(ing => {
                        return (
                            <Col xs={12} lg={6} key={ing.id}>
                                <Row className="align-items-center">
                                    <Col xs={2} className="text-center"><img src={`https://img.spoonacular.com/ingredients_250x250/${ing.image}`} alt="" height={35} /></Col>
                                    <Col xs={9}><p className="mb-0"><span className="fw-bold me-2">{`${ing.measures.metric.amount} ${ing.measures.metric.unitShort}`}</span>{ing.nameClean.toLowerCase().replace(/^./, char => char.toUpperCase())}</p>
                                        {
                                            ing.meta[0] && <p className="mb-0 text-secondary">{ing.meta[0]}</p>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        )
                    })
                }

            </Row>
        </Card>

    )
}

export default Ingredients