import { Col, Row, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function ExploreHero() {
    const navigate = useNavigate()
    return (
        <Row className="py-7 py-md-10 position-relative z-1">
            <Col xs={12} md={8} xl={6} className="d-flex align-items-center">
                <div className="">
                    <h1>Don't know what to eat today?</h1>
                    <h1 className="mb-4">With us you don't have to think about it anymore</h1>
                    <p className="mb-5 fs-4 d-none d-lg-block">Thanks to SmartMeals.com plan your meals in advance choosing amongst thousands recepies and you will not loose time anymore choosing what to eat. Useful..right?</p>
                    <Button variant="danger" className="py-2" onClick={() => navigate("/auth/register")}>Register</Button>
                </div>

            </Col>
        </Row>
    )
}

export default ExploreHero