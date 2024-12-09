import { Col, Container, Row } from "react-bootstrap"
import WeeklyPlansLeft from "./WeeklyPlansLeft"
import WeeklyPlanChoosen from "./WeeklyPlanChoosen"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RetrievePlansAction, SetSelectedPlanAction } from "../../redux/actions";

export function transformDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateParsed = new Date(date)
    return `${dateParsed.getDate()} ${months[dateParsed.getMonth()]}`
}

function WeeklyPlans() {
    const dispatch = useDispatch()
    const plans = useSelector(state => state.plans.myplans)
    const selected = useSelector(state => state.plans.selected)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const stateColors = {
        ACTIVE: "success",
        IN_PROGRAM: "warning",
        EXPIRED: "secondary"
    }
    useEffect(() => {
        if (!token) {
            navigate("/auth/login")
        } else {
            dispatch(RetrievePlansAction(token, 0))
        }
        return () => {
            dispatch(SetSelectedPlanAction(null))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (plans) {
            if (!selected) {
                const selectedPlan = plans.content.filter(plan => plan.status === "ACTIVE")[0]
                if (selectedPlan) {
                    dispatch(SetSelectedPlanAction(selectedPlan))
                } else {
                    dispatch(SetSelectedPlanAction(plans.content[0]))
                }
            }

        } else {
            dispatch(SetSelectedPlanAction(null))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plans])
    return (
        <Container className="my-5">
            <Row className="g-3">
                <Col xs={3}><WeeklyPlansLeft selected={selected} plans={plans} badgeColors={stateColors} /></Col>
                <Col xs={9}><WeeklyPlanChoosen selected={selected} badgeColors={stateColors} /></Col>
            </Row>
        </Container>
    )
}

export default WeeklyPlans

