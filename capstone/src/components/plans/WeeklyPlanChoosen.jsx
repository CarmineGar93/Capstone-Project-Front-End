import { Badge, Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Plus, Trash, BoxArrowInUpRight, ChevronRight, ArrowLeft } from "react-bootstrap-icons"
import { transformDate } from "./WeeklyPlans"
import { useEffect, useRef, useState } from "react"
import SearchRecipeModal from "./SearchRecipeModal"
import { useDispatch } from "react-redux"
import { RetrievePlansAction } from "../../redux/actions"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const returnDate = (startDate, day) => {
    const dailyPlanDate = new Date(startDate)
    dailyPlanDate.setDate(dailyPlanDate.getDate() + day)
    return transformDate(dailyPlanDate)
}

export const valuateToday = (startDate, day) => {
    const dailyPlanDate = new Date(startDate)
    dailyPlanDate.setDate(dailyPlanDate.getDate() + day)
    const today = new Date()
    return today.getDate() === dailyPlanDate.getDate() && today.getMonth() === dailyPlanDate.getMonth() && today.getFullYear() === dailyPlanDate.getFullYear()

}

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    }, [value])
    return ref.current
}


export const valuateDate = (startDate, day) => {
    const dailyPlanDate = new Date(startDate)
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

function WeeklyPlanChoosen({ selected, badgeColors }) {
    const [selectedDay, setSelectedDay] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const [show, setShow] = useState(false)
    const [mealSelected, setMealSelected] = useState(null)
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const prevSelected = usePrevious(selected)
    const removeReceipt = async (mealId) => {
        try {
            const response = await fetch("http://localhost:3001/meals/" + mealId + "/remove", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                toast.success("Recipe removed successfully")
                dispatch(RetrievePlansAction(token, 0))
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    useEffect(() => {
        if (prevSelected?.weeklyPlanId !== selected?.weeklyPlanId) {
            setSelectedDay(null)
        } else {
            setSelectedDay(selected?.dailyPlans[selectedDay?.day])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    return (
        <>
            <SearchRecipeModal show={show} onHide={() => setShow(false)} meal={mealSelected} />
            {
                selected && (
                    <Card className="border-0 p-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-2 p-3">
                            <h2>Weekly Plan <Badge bg={badgeColors[selected.status]}>{selected.status}</Badge></h2>
                            {
                                !selectedDay ? <h4>{transformDate(selected.startDate)} - {transformDate(selected.endDate)}</h4> : (
                                    <div className="d-flex align-items-center">
                                        <ArrowLeft size={40} role="button" className={`btn-experience me-3 p-2 rounded-circle`} onClick={() => setSelectedDay(null)} />
                                        <h4 className="mb-1">{returnDate(selected.startDate, selectedDay.day)}</h4>
                                    </div>
                                )
                            }

                        </div>
                        <div className="p-2">
                            {
                                !selectedDay && selected.dailyPlans.map((d, index) => {
                                    return (
                                        <OverlayTrigger placement="right" delay={{ show: 200 }} overlay={<Tooltip >Tot calories: {d.totCalories.toFixed(2)} kcal</Tooltip>}>
                                            <div className={`p-3 border-top ${index === selected.dailyPlans.length - 1 ? "border-bottom" : ""} border-light-subtle d-flex justify-content-between align-items-center`}>
                                                <h5 className="mb-0">{days[d.day]} {valuateToday(selected.startDate, d.day) && <Badge bg="danger" pill className="px-2 py-0 rounded-circle ms-1">Today</Badge>}</h5>
                                                <ChevronRight size={35} role="button" className={`btn-experience p-2 rounded-circle`} onClick={() => setSelectedDay(d)} />
                                            </div>
                                        </OverlayTrigger>
                                    )
                                })
                            }
                            {
                                selectedDay && selectedDay.meals.map((m, index) => {
                                    return (
                                        <div className={`p-3 border-top ${index === selectedDay.meals.length - 1 ? "border-bottom" : ""} border-light-subtle`}>
                                            <div className={`d-flex justify-content-between align-items-center`}>
                                                <h5 className="mb-0">{m.type.toLowerCase().replace(/^./, char => char.toUpperCase())}</h5>
                                                {
                                                    m.recipe ? (
                                                        <Trash size={38} role={`${!valuateDate(selected.startDate, selectedDay.day) && "button"}`} className={`${!valuateDate(selected.startDate, selectedDay.day) ? "btn-experience" : "opacity-50"} p-2 rounded-circle`} onClick={() => {
                                                            if (!valuateDate(selected.startDate, selectedDay.day)) {
                                                                removeReceipt(m.mealId)
                                                            }
                                                        }} />
                                                    ) : (
                                                        <Plus size={40} role={`${!valuateDate(selected.startDate, selectedDay.day) && "button"}`} className={`${!valuateDate(selected.startDate, selectedDay.day) ? "btn-experience" : "opacity-50"} p-2 rounded-circle`} onClick={() => {
                                                            if (!valuateDate(selected.startDate, selectedDay.day)) {
                                                                setMealSelected(m.mealId)
                                                                setShow(true)
                                                            }

                                                        }} />
                                                    )
                                                }
                                            </div>
                                            {
                                                m.recipe && (
                                                    <div className="mt-2">
                                                        <img src={m.recipe.imageUrl} alt="dish" height={100} className="mb-2 rounded-3 d-block" />
                                                        <h6 className="mb-0 recipe-link d-inline-block" onClick={() => navigate(`/recipe/${m.recipe.reference}`)}>{m.recipe.name} <BoxArrowInUpRight className="mb-1"></BoxArrowInUpRight></h6>
                                                    </div>
                                                )
                                            }
                                        </div>

                                    )
                                })
                            }
                        </div>
                        {/*   <Accordion flush className="mb-3">
                            {
                                selected.dailyPlans.map(daily => {
                                    return (

                                        <Accordion.Item eventKey={daily.dailyPlanId} className="border-0 border-bottom" key={daily.dailyPlanId}>
                                            <OverlayTrigger placement="right" delay={{ show: 200 }} overlay={<Tooltip >Tot calories: {daily.totCalories.toFixed(2)} kcal</Tooltip>}>
                                                <Accordion.Header><h5 className="mb-0">{days[daily.day]} {valuateToday(selected.startDate, daily.day) && <Badge bg="danger" pill className="px-2 py-0 rounded-circle ms-1">Today</Badge>}</h5></Accordion.Header></OverlayTrigger>
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
                                                                                            <p className="mb-0 recipe-link" onClick={() => navigate(`/recipe/${meal.recipe.reference}`)}>{meal.recipe.name} <BoxArrowInUpRight className="mb-1"></BoxArrowInUpRight></p>
                                                                                        </div>
                                                                                        {
                                                                                            !valuateDate(selected.startDate, daily.day) && <Button variant="danger" onClick={() => removeReceipt(meal.mealId)}><Trash className="py-0"></Trash></Button>
                                                                                        }


                                                                                    </div>

                                                                                </Accordion.Body>
                                                                            </Accordion.Item >
                                                                        ) : (
                                                                            <div className="border-bottom border-1 d-flex justify-content-between align-items-center mb-2 px-3" key={meal.mealId}>
                                                                                <p className="mb-0 fs-5">{meal.type.toLowerCase().replace(/^./, char => char.toUpperCase())}</p>
                                                                                <button className={`${!valuateDate(selected.startDate, daily.day) && "btn-experience"} bg-white border-0 rounded-circle p-2`} onClick={() => {
                                                                                    setMealSelected(meal.mealId)
                                                                                    setShow(true)
                                                                                }} disabled={valuateDate(selected.startDate, daily.day)}><Plus size={25} /></button>
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
                        </Accordion> */}
                    </Card >
                )
            }
        </>

    )
}

export default WeeklyPlanChoosen