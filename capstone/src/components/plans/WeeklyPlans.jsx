import { Col, Container, Row } from "react-bootstrap"
import WeeklyPlansLeft from "./WeeklyPlansLeft"
import WeeklyPlanChoosen from "./WeeklyPlanChoosen"
import { useState } from "react"

function WeeklyPlans() {
    const plans = [{
        id: 1,
        start: "25 Nov",
        end: "1 Dec",
        state: "ACTIVE"
    }, {
        id: 2,
        start: "2 Dec",
        end: "8 Dec",
        state: "IN_PROGRAM"
    }, {
        id: 3,
        start: "18 Nov",
        end: "24 Nov",
        state: "EXPIRED"
    }]
    const stateColors = {
        ACTIVE: "success",
        IN_PROGRAM: "warning",
        EXPIRED: "secondary"
    }
    const [selected, setSelected] = useState(plans.filter(plan => plan.state === "ACTIVE")[0])
    return (
        <Container className="my-5">
            <Row className="g-3">
                <Col xs={3}><WeeklyPlansLeft selected={selected} changeSelected={setSelected} plans={plans} badgeColors={stateColors} /></Col>
                <Col xs={9}><WeeklyPlanChoosen selected={selected} badgeColors={stateColors} /></Col>
            </Row>
        </Container>
    )
}

export default WeeklyPlans