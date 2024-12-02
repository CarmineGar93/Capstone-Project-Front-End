import { Badge, Button, Card } from "react-bootstrap"
import { Calendar } from "react-bootstrap-icons"
import { useDispatch } from "react-redux"
import { SetSelectedPlanAction } from "../../redux/actions"

function WeeklyPlansLeft({ selected, plans, badgeColors }) {
    const dispatch = useDispatch()
    return (
        <Card className="border-0 p-4 h-100">
            {
                selected && (
                    <>
                        <div className="d-flex align-items-center mb-4">
                            <Calendar size={20} className="me-2" />
                            <h4 className="mb-0">Weekly Plans</h4>
                        </div>
                        <div className="mb-5">
                            {
                                plans.content.map(plan => {
                                    return (
                                        <div className={`border-start border-3 p-2 mb-3 align-content-center ${selected.weeklyPlanId === plan.weeklyPlanId ? "border text-info rounded-2" : ""}`} onClick={() => dispatch(SetSelectedPlanAction(plan))}>
                                            <h6 className="text-secondary mb-0">{plan.startDate} - {plan.endDate} <Badge bg={badgeColors[plan.status]}>{plan.status}</Badge></h6>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="mt-auto">
                            <Button variant="danger">Create new plan</Button>
                        </div>
                    </>
                )
            }




        </Card>
    )
}

export default WeeklyPlansLeft