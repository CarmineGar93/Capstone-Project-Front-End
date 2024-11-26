import { Col, Container, Row } from "react-bootstrap";
import HomeLeft from "./left/HomeLeft";

function Home() {
    return (
        <Container className="my-5">
            <Row className="gx-3">
                <Col xs={3}><HomeLeft /></Col>
                <Col xs={6}></Col>
                <Col xs={3}></Col>
            </Row>
        </Container>
    )
}

export default Home