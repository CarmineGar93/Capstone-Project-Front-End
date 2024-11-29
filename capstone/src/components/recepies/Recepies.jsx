import { Col, Container, Row } from "react-bootstrap"
import RecepiesMain from "./RecepiesMain"
import RecepiesFilterSection from "./RecepiesFilterSection"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Recepies() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate("/auth/login")
        }
    })
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