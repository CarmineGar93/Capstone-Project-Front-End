import { Col, Container, Row } from "react-bootstrap"
import RecepiesMain from "./RecepiesMain"
import RecepiesFilterSection from "./RecepiesFilterSection"

function Recepies() {
    return (
        <Container className="my-5">
            <Row className="g-3">
                <Col xs={12} lg={9} className="order-1 order-lg-0"><RecepiesMain /></Col>
                <Col xs={12} lg={3}><RecepiesFilterSection /></Col>
            </Row>
        </Container>
    )
}

export default Recepies