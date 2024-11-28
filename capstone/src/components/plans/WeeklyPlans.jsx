import { Col, Container, Row } from "react-bootstrap"
import WeeklyPlansLeft from "./WeeklyPlansLeft"

function WeeklyPlans() {
    return (
        <Container className="my-5">
            <Row className="g-3">
                <Col xs={3}><WeeklyPlansLeft /></Col>
                <Col xs={9}></Col>
            </Row>
        </Container>
    )
}

export default WeeklyPlans