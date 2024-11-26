import { Col, Row } from "react-bootstrap"
import ProfileCard from "./ProfileCard"

function HomeLeft() {
    return (
        <Row>
            <Col xs={12}><ProfileCard /></Col>
            <Col xs={12}></Col>
        </Row>
    )
}

export default HomeLeft