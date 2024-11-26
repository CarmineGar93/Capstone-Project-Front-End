import { Col, Row } from "react-bootstrap"
import ProfileCard from "./ProfileCard"
import GroceryPanel from "./GroceryPanel"

function HomeLeft() {
    return (
        <Row className="gy-4">
            <Col xs={12}><ProfileCard /></Col>
            <Col xs={12}><GroceryPanel /></Col>
        </Row>
    )
}

export default HomeLeft