import { Badge, Button, Card } from "react-bootstrap"
import { Calendar } from "react-bootstrap-icons"
import { useDispatch } from "react-redux"
import { RetrievePlansAction, SetSelectedPlanAction } from "../../redux/actions"
import { transformDate } from "./WeeklyPlans"
import { toast } from "react-toastify"

function WeeklyPlansLeft({ selected, plans, badgeColors }) {
    const token = localStorage.getItem("token")
    const createPlan = async (bool) => {
        const bodyRequest = {
            thisWeek: bool
        }
        try {
            const response = await fetch("http://localhost:3001/plans/myplans", {
                method: "POST",
                body: JSON.stringify(bodyRequest),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                toast.success("New plan successfully created")
                dispatch(RetrievePlansAction(token, 0))
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err)
        }
    }
    const dispatch = useDispatch()
    return (
        <Card className="border-0 p-4 h-100">
            {
                plans && (
                    <>
                        <div className="d-flex align-items-center mb-4">
                            <Calendar size={20} className="me-2" />
                            <h4 className="mb-0">Weekly Plans</h4>
                        </div>
                        {
                            plans.content.length > 0 && selected ? (
                                <div className="mb-5">
                                    {
                                        plans.content.map(plan => {
                                            return (
                                                <div className={`border-start border-3 p-2 mb-3 align-content-center ${selected.weeklyPlanId === plan.weeklyPlanId ? "border text-info rounded-2" : ""}`} onClick={() => dispatch(SetSelectedPlanAction(plan))} key={plan.weeklyPlanId}>
                                                    <h6 className="text-secondary mb-0">{transformDate(plan.startDate)} - {transformDate(plan.endDate)} <Badge bg={badgeColors[plan.status]}>{plan.status}</Badge></h6>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            ) : (
                                <div className="my-5">
                                    <h3>There are no weekly plans</h3>
                                </div>
                            )
                        }
                        <div className="mt-auto">
                            <Button variant="danger" className="mb-3" disabled={plans.content.some(plan => plan.status === "ACTIVE")} onClick={() => createPlan(true)}>New plan for this week</Button>
                            <Button variant="danger" disabled={plans.content.some(plan => plan.status === "IN_PROGRAM")} onClick={() => createPlan(false)}>New plan for next week</Button>
                        </div>
                    </>
                )
            }





        </Card>
    )
}

export default WeeklyPlansLeft