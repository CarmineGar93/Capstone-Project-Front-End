import { Col, Container, Row } from "react-bootstrap"
import RecepiesMain from "./RecepiesMain"

function Recepies() {
    return (
        <Container className="my-5">
            <Row>
                <Col xs={12} md={9}><RecepiesMain /></Col>
                <Col xs={12} md={3}></Col>
            </Row>
        </Container>
    )
}

export default Recepies