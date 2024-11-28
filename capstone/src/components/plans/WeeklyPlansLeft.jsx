import { Badge, Button, Card } from "react-bootstrap"
import { Calendar } from "react-bootstrap-icons"

function WeeklyPlansLeft({ selected, changeSelected, plans, badgeColors }) {
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
                                plans.map(plan => {
                                    return (
                                        <div className={`border-start border-3 p-2 mb-3 align-content-center ${selected.id === plan.id ? "border text-info rounded-2" : ""}`} onClick={() => changeSelected(plan)}>
                                            <h6 className="text-secondary mb-0">{plan.start} - {plan.end} <Badge bg={badgeColors[plan.state]}>{plan.state}</Badge></h6>
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