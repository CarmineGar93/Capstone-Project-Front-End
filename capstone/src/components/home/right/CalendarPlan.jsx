import { Accordion, Card, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { transformDate } from "../../plans/WeeklyPlans"

function CalendarPlan() {
    const activePlan = useSelector(state => state.plans.active)
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const navigate = useNavigate()
    return (
        <Card className="border-0 d-none d-md-block">
            <h5 className="mb-3 bg-white shadow-sm p-3 text-center">Weekly active plan</h5>
            {
                activePlan && (
                    <>
                        <h6 className="text-center">{transformDate(activePlan.startDate)} - {transformDate(activePlan.endDate)}</h6>
                        <Accordion flush className="mb-3">
                            {
                                activePlan.dailyPlans.map(day => {
                                    return (
                                        <Accordion.Item eventKey={day.dailyPlanId} className="border-0 border-bottom" key={day.dailyPlanId}>
                                            <Accordion.Header>{days[day.day]}</Accordion.Header>
                                            <Accordion.Body className="px-0">
                                                <Accordion flush>
                                                    {
                                                        day.meals.map(meal => {
                                                            return (

                                                                <Accordion.Item eventKey={meal.mealId} className="border-0 border-bottom" key={meal.mealId}>
                                                                    <Accordion.Header>{meal.type.toLowerCase().replace(/^./, char => char.toUpperCase())}</Accordion.Header>
                                                                    <Accordion.Body>
                                                                        {
                                                                            meal.recipe ? (
                                                                                <div className="d-flex align-items-center">
                                                                                    <img src={meal.recipe.imageUrl} alt="dish" width={60} height={40} className="me-2" />
                                                                                    <p className="mb-0">{meal.recipe.name}</p>
                                                                                </div>
                                                                            ) : (
                                                                                <h6>No recipe</h6>
                                                                            )
                                                                        }
                                                                    </Accordion.Body>
                                                                </Accordion.Item>

                                                            )
                                                        })
                                                    }
                                                </Accordion>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })
                            }
                        </Accordion>
                    </>
                )
            }

            <div className="text-center p-3">
                <Button variant="danger" onClick={() => navigate("/plans")}>Weekly plan management</Button>
            </div>
        </Card>
    )
}

export default CalendarPlan