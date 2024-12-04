import { useEffect, useState } from "react"
import { Card, Button } from "react-bootstrap"
import { useSelector } from "react-redux"

function HomeCentral() {
    const activePlan = useSelector(state => state.plans.active)
    const [activeDay, setActiveDay] = useState(null)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const today = new Date()
    useEffect(() => {
        if (activePlan) {
            const today = new Date().getDay()
            console.log(today)
            setActiveDay(activePlan.dailyPlans.filter(daily => daily.day === today - 1)[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePlan])
    return (
        <Card className="border-0 px-3 px-xl-4 px-xxl-5 py-4">
            <h2>Today</h2>
            <h2>{`${days[today.getDay()]} ${today.getDate()} ${months[today.getMonth()]}`}</h2>
            <div className="my-4">
                {
                    !activePlan ? (
                        <h4>There is no active plan for this week</h4>
                    ) : (
                        <>
                            {
                                activeDay && activeDay.meals.map(meal => {
                                    return (
                                        <>
                                            <h3>{meal.type.toLowerCase().replace(/^./, char => char.toUpperCase())}</h3>
                                            {
                                                meal.recipe ? (
                                                    <Card className="mb-4">
                                                        <Card.Img variant="top" src={meal.recipe.imageUrl} />
                                                        <Card.Body>
                                                            <Card.Title className="fs-3">{meal.recipe.name}</Card.Title>
                                                            <div className="text-end mt-3">
                                                                <Button variant="danger">Recepie information</Button>
                                                            </div>

                                                        </Card.Body>
                                                    </Card>
                                                ) : (
                                                    <h3 className="my-10">No recipe selected</h3>
                                                )
                                            }

                                        </>
                                    )
                                })
                            }
                        </>
                    )
                }
            </div>
        </Card>
    )
}

export default HomeCentral