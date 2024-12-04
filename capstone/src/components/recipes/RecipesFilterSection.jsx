import { Button, Card, Col, Container, Row } from "react-bootstrap"

function RecipesFilterSection() {
    return (
        <Card className="p-4 border-0">
            <h3>Filter</h3>
            <Container fluid className="p-0 my-3">
                <Row className="mb-3 gx-0">
                    <Col xs={9}>
                        <h5>Ingredients</h5>
                    </Col>
                    <Col xs={3} className="text-end">
                        <Button variant="outline-secondary" size="sm">Add</Button>
                    </Col>
                </Row>
                <Row className="gy-3 gx-1 mb-5">
                    <Col>
                        <Button className="rounded-4 w-100" variant="outline-secondary">Ing1</Button>
                    </Col>
                    <Col>
                        <Button className="rounded-4 w-100" variant="outline-secondary">Ing2</Button>
                    </Col>
                    <Col>
                        <Button className="rounded-4 w-100" variant="outline-secondary">Ing3</Button>
                    </Col>
                    <Col>
                        <Button className="rounded-4 w-100" variant="outline-secondary">Ing4</Button>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12}>
                        <h5>Recipe type</h5>
                    </Col>
                </Row>
                <Row className="gy-3 gx-1 mb-5">
                    <Col>
                        <Button className="rounded-4 w-100" variant="outline-secondary">Breakfast</Button>
                    </Col>
                    <Col>
                        <Button className="rounded-4 w-100" variant="outline-secondary">Lunch</Button>
                    </Col>
                    <Col>
                        <Button className="rounded-4 w-100" variant="outline-secondary">Dinner</Button>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12}>
                        <h5>Preparation time</h5>
                    </Col>
                </Row>
                <Row className="gy-3 gx-1 mb-3">
                    <Col>
                        <Button className="rounded-4 w-100 text-nowrap" variant="outline-secondary">Max 20 min</Button>
                    </Col>
                    <Col>
                        <Button className="rounded-4 w-100 text-nowrap" variant="outline-secondary">Max 40 min</Button>
                    </Col>
                    <Col>
                        <Button className="rounded-4 w-100 text-nowrap" variant="outline-secondary">Max 60 min</Button>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}

export default RecipesFilterSection