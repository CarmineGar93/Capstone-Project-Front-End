import { Badge, Card, Accordion } from "react-bootstrap"
import { Plus } from "react-bootstrap-icons"
import { transformDate } from "./WeeklyPlans"
import { useState } from "react"
import SearchRecipeModal from "./SearchRecipeModal"

function WeeklyPlanChoosen({ selected, badgeColors }) {
    const [show, setShow] = useState(false)
    const [mealSelected, setMealSelected] = useState(null)
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return (
        <>
            <SearchRecipeModal show={show} onHide={() => setShow(false)} meal={mealSelected} />
            {
                selected && (
                    <Card className="border-0 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h2>Weekly Plan <Badge bg={badgeColors[selected.status]}>{selected.status}</Badge></h2>
                            <h4>{transformDate(selected.startDate)} - {transformDate(selected.endDate)}</h4>
                        </div>
                        <Accordion flush className="mb-3">
                            {
                                selected.dailyPlans.map(daily => {
                                    return (
                                        <Accordion.Item eventKey={daily.dailyPlanId} className="border-0 border-bottom">
                                            <Accordion.Header><h5 className="mb-0">{days[daily.day]}</h5></Accordion.Header>
                                            <Accordion.Body className="px-2 py-4">
                                                <Accordion>
                                                    {
                                                        daily.meals.map(meal => {
                                                            return (
                                                                <>
                                                                    {
                                                                        meal.recipe ? (
                                                                            <Accordion.Item className="border-0 border-bottom mb-2">
                                                                                <Accordion.Header><p className="mb-0 fs-5 px-0">{meal.type.toLowerCase()}</p></Accordion.Header>
                                                                                <Accordion.Body>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <img src={meal.recipe.imageUrl} alt="dish" width={60} height={40} className="me-2" />
                                                                                        <p className="mb-0">{meal.recipe.name}</p>
                                                                                    </div>
                                                                                </Accordion.Body>
                                                                            </Accordion.Item>
                                                                        ) : (
                                                                            <div className="border-bottom border-1 d-flex justify-content-between align-items-center mb-2 px-3" key={meal.mealId}>
                                                                                <p className="mb-0 fs-5">{meal.type.toLowerCase()}</p>
                                                                                <button className="btn-experience bg-white border-0 rounded-circle p-2" onClick={() => {
                                                                                    setMealSelected(meal.mealId)
                                                                                    setShow(true)
                                                                                }}><Plus size={25} /></button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </>

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
                    </Card>
                )
            }
        </>

    )
}

export default WeeklyPlanChoosen