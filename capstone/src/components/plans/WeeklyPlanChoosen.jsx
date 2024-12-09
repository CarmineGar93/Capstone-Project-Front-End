import { Badge, Card, Accordion, Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Plus, Trash } from "react-bootstrap-icons"
import { transformDate } from "./WeeklyPlans"
import { useState } from "react"
import SearchRecipeModal from "./SearchRecipeModal"
import { useDispatch } from "react-redux"
import { RetrievePlansAction } from "../../redux/actions"

export const valuateToday = (startDate, day) => {
    const dailyPlanDate = new Date(startDate)
    dailyPlanDate.setDate(dailyPlanDate.getDate() + day)
    const today = new Date()
    return today.getDate() === dailyPlanDate.getDate() && today.getMonth() === dailyPlanDate.getMonth() && today.getFullYear() === dailyPlanDate.getFullYear()

}

function WeeklyPlanChoosen({ selected, badgeColors }) {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const [show, setShow] = useState(false)
    const [mealSelected, setMealSelected] = useState(null)
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const valuateDate = (day) => {
        const dailyPlanDate = new Date(selected.startDate)
        dailyPlanDate.setDate(dailyPlanDate.getDate() + day)
        const today = new Date()
        const firstYear = dailyPlanDate.getFullYear();
        const firstMonth = dailyPlanDate.getMonth();
        const firstDay = dailyPlanDate.getDate();
        const secondYear = today.getFullYear();
        const secondMonth = today.getMonth();
        const secondDay = today.getDate();
        return firstYear === secondYear && firstMonth === secondMonth && firstDay === secondDay ? false : today > dailyPlanDate
    }
    const removeReceipt = async (mealId) => {
        try {
            const response = await fetch("http://localhost:3001/meals/" + mealId + "/remove", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                alert("Recipe removed successfully")
                dispatch(RetrievePlansAction(token, 0))
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            alert(err)
        }
    }

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
                                        <OverlayTrigger placement="right" delay={{ show: 200 }} overlay={<Tooltip >Tot calories: {daily.totCalories.toFixed(2)} kcal</Tooltip>}>
                                            <Accordion.Item eventKey={daily.dailyPlanId} className="border-0 border-bottom" key={daily.dailyPlanId}>
                                                <Accordion.Header><h5 className="mb-0">{days[daily.day]} {valuateToday(selected.startDate, daily.day) && <Badge bg="danger" pill className="px-2 py-0 rounded-circle ms-1">Today</Badge>}</h5></Accordion.Header>
                                                <Accordion.Body className="px-2 py-4">
                                                    <Accordion>
                                                        {
                                                            daily.meals.map(meal => {
                                                                return (
                                                                    <>
                                                                        {
                                                                            meal.recipe ? (
                                                                                <Accordion.Item className="border-0 border-bottom mb-2" key={meal.mealId} eventKey={meal.mealId}>
                                                                                    <Accordion.Header><p className="mb-0 fs-5 px-0">{meal.type.toLowerCase().replace(/^./, char => char.toUpperCase())}</p></Accordion.Header>
                                                                                    <Accordion.Body>
                                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                                            <div className="d-flex align-items-center">
                                                                                                <img src={meal.recipe.imageUrl} alt="dish" width={60} height={40} className="me-2" />
                                                                                                <p className="mb-0">{meal.recipe.name}</p>
                                                                                            </div>
                                                                                            {
                                                                                                !valuateDate(daily.day) && <Button variant="danger" onClick={() => removeReceipt(meal.mealId)}><Trash className="py-0"></Trash></Button>
                                                                                            }


                                                                                        </div>

                                                                                    </Accordion.Body>
                                                                                </Accordion.Item >
                                                                            ) : (
                                                                                <div className="border-bottom border-1 d-flex justify-content-between align-items-center mb-2 px-3" key={meal.mealId}>
                                                                                    <p className="mb-0 fs-5">{meal.type.toLowerCase().replace(/^./, char => char.toUpperCase())}</p>
                                                                                    <button className={`${!valuateDate(daily.day) && "btn-experience"} bg-white border-0 rounded-circle p-2`} onClick={() => {
                                                                                        setMealSelected(meal.mealId)
                                                                                        setShow(true)
                                                                                    }} disabled={valuateDate(daily.day)}><Plus size={25} /></button>
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
                                        </OverlayTrigger>

                                    )
                                })
                            }
                        </Accordion>
                    </Card >
                )
            }
        </>

    )
}

export default WeeklyPlanChoosen