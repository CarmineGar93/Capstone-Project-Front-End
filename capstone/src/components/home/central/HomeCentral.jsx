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
            let todayDay = new Date().getDay()
            if (todayDay === 0) {
                todayDay = 7
            }
            setActiveDay(activePlan.dailyPlans.filter(daily => daily.day === todayDay - 1)[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePlan])
    return (
        <Card className="border-0 px-3 px-xl-4 px-xxl-5 py-4">
            <h2>Today</h2>
            <h2>{`${days[today.getDay()]} ${today.getDate()} ${months[today.getMonth()]}`}</h2>
            <div className="mt-4">
                {
                    !activePlan ? (
                        <h4>There is no active plan for this week</h4>
                    ) : (
                        <>
                            {
                                activeDay && activeDay.meals.map(meal => {
                                    return (
                                        <div key={meal.mealId}>
                                            <h2>{meal.type.toLowerCase().replace(/^./, char => char.toUpperCase())}</h2>
                                            {
                                                meal.recipe ? (
                                                    <Card className="mb-4 border-0">
                                                        <Card.Img variant="top" src={meal.recipe.imageUrl} />

                                                        <Card.Title className="fs-4 mt-3 ">{meal.recipe.name}</Card.Title>
                                                        <Card.Body className="px-0">
                                                            <p className="fs-5 text-secondary">Tot calories: {meal.recipe.calories} kcal</p>
                                                            <p className="fs-5 text-secondary">Ready in: {meal.recipe.readyIn === 0 ? "N/A" : `${meal.recipe.readyIn} minutes`}</p>
                                                            <p className="fs-5 text-secondary">Ingredients: {meal.recipe.ingredientList.length}</p>
                                                        </Card.Body>



                                                    </Card>
                                                ) : (
                                                    <h3 className="my-10">No recipe selected</h3>
                                                )
                                            }

                                        </div>
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