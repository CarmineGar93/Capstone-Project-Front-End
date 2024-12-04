import { Col, Container, Row } from "react-bootstrap"
import RecipesMain from "./RecipesMain"
import RecipesFilterSection from "./RecipesFilterSection"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Recipes() {
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
                <Col xs={12} lg={9} className="order-1 order-lg-0"><RecipesMain /></Col>
                <Col xs={12} lg={3}><RecipesFilterSection /></Col>
            </Row>
        </Container>
    )
}

export default Recipes