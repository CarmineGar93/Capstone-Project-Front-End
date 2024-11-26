import { Card, Col, Container, Form, Row } from "react-bootstrap";

function RecepiesMain() {
    const cards = []
    for (let i = 0; i < 12; i++) {
        cards.push(
            <Col>
                <Card className="p-0 border-0">
                    <Card.Img src="https://placedog.net/200/250" className="img-fluid" />
                    <Card.Body className="px-0">
                        <Card.Title>Receipe name</Card.Title>
                        <Card.Text>Ingredients - Time</Card.Text>
                    </Card.Body>

                </Card>
            </Col>
        )
    }
    return (
        <Card className="px-4 py-5 border-0">
            <h1 className="ps-2">Recepies</h1>
            <div className="d-flex justify-content-end">
                <h3>Order by:</h3>
                <Form.Select className="w-25 ms-3">
                    <option>A-Z</option>
                    <option value="time">Preparation time</option>
                    <option value="calories">Calories</option>
                    <option value="popularity">Popularity</option>
                </Form.Select>
            </div>
            <Container fluid className="my-3">
                <Row xs={1} sm={2} lg={3} xl={4} className="gx-3">
                    {
                        cards.map(card => {
                            return card
                        })
                    }
                </Row>
            </Container>
        </Card>
    )
}

export default RecepiesMain