import { Col, Row } from "react-bootstrap"


function HomeSidebar({ child1 }) {
    return (
        <Row className="gy-4">
            <Col xs={12}>{child1}</Col>
        </Row>
    )
}

export default HomeSidebar