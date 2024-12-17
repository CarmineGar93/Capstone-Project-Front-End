import { useState } from "react"
import { Badge, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { transformDate } from "../plans/WeeklyPlans"
import { valuateDate } from "../plans/WeeklyPlanChoosen"
import { ArrowLeft, ChevronRight, Plus } from "react-bootstrap-icons"
import { toast } from "react-toastify"
import { RetrievePlansAction } from "../../redux/actions"

export const returnDate = (startDate, day) => {
    const dailyPlanDate = new Date(startDate)
    dailyPlanDate.setDate(dailyPlanDate.getDate() + day)
    return transformDate(dailyPlanDate)
}

function AddModal({ show, onHide, recipeReference }) {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const plans = useSelector(state => state.plans.myplans)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [selectedDay, setSelectedDay] = useState(null)
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const badgeColors = {
        ACTIVE: "success",
        IN_PROGRAM: "warning",
        EXPIRED: "secondary"
    }
    const addReceipt = async (meal) => {
        try {
            const response = await fetch("http://localhost:3001/meals/" + meal + "/add", {
                method: "PATCH",
                body: JSON.stringify({
                    reference: recipeReference
                }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                toast.success("Recipe added successfully")
                setSelectedPlan(null)
                setSelectedDay(null)
                dispatch(RetrievePlansAction(token, 0))
                onHide()
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={() => {
                setSelectedPlan(null)
                setSelectedDay(null)
                onHide()
            }}
        >
            <Modal.Header closeButton className="border-0">
                <Modal.Title id="contained-modal-title-vcenter" className="p-2">
                    {` Choose a ${!selectedPlan ? "plan" : !selectedDay ? "day" : "meal"}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-5">
                    {
                        !selectedPlan && plans.content.filter(p => p.status !== "EXPIRED").map(plan => {
                            return (
                                <div role="button" onMouseEnter={(e) => e.currentTarget.classList.add("border-start", "border-3")} onMouseLeave={(e) =>
                                    e.currentTarget.classList.remove("border-start", "border-3")} className={`p-2 mb-3 align-content-center`} onClick={() => setSelectedPlan(plan)} key={plan.weeklyPlanId}>
                                    <h6 className="text-secondary mb-0">{transformDate(plan.startDate)} - {transformDate(plan.endDate)} <Badge bg={badgeColors[plan.status]}>{plan.status}</Badge></h6>
                                </div>
                            )
                        })
                    }
                    {
                        selectedPlan && !selectedDay && (
                            <>
                                <div className="d-flex justify-content-center align-items-center mb-2 p-3">
                                    <h4>{transformDate(selectedPlan.startDate)} - {transformDate(selectedPlan.endDate)}</h4>
                                </div>
                                <div className="p-2">
                                    {
                                        selectedPlan.dailyPlans.map((d, index) => {
                                            return (
                                                <div className={`p-3 border-top ${index === selectedPlan.dailyPlans.length - 1 ? "border-bottom" : ""} border-light-subtle d-flex justify-content-between align-items-center`}>
                                                    <p className="mb-0">{days[d.day]}</p>
                                                    <ChevronRight size={35} role={`${!valuateDate(selectedPlan.startDate, d.day) && "button"}`} className={`${!valuateDate(selectedPlan.startDate, d.day) ? "btn-experience" : "opacity-50"} p-2 rounded-circle`} onClick={() => {
                                                        if (!valuateDate(selectedPlan.startDate, d.day)) {
                                                            setSelectedDay(d)
                                                        }
                                                    }} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    }
                    {
                        selectedDay && (
                            <>
                                <div className="d-flex justify-content-center align-items-center mb-2 p-3">
                                    <ArrowLeft size={40} role="button" className={`btn-experience me-auto p-2 rounded-circle`} onClick={() => setSelectedDay(null)} />
                                    <h4 className="me-auto">{returnDate(selectedPlan.startDate, selectedDay.day)}</h4>
                                </div>
                                <div className="p-2">
                                    {
                                        selectedDay.meals.map((m, index) => {
                                            return (
                                                <div className={`p-3 border-top ${index === selectedDay.meals.length - 1 ? "border-bottom" : ""} border-light-subtle d-flex justify-content-between align-items-center`}>
                                                    <p className="mb-0">{m.type.toLowerCase().replace(/^./, char => char.toUpperCase())}</p>
                                                    <Plus size={40} role={`${!m.recipe && "button"}`} className={`${!m.recipe ? "btn-experience" : "opacity-50"} p-2 rounded-circle`} onClick={() => {
                                                        if (!m.recipe) {
                                                            addReceipt(m.mealId)
                                                        }
                                                    }} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>

                        )
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddModal