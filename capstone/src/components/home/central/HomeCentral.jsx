import { Card, Button } from "react-bootstrap"

function HomeCentral() {
    const daymeals = ["Breakfast", "Lunch", "Dinner"]
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Dicember']
    const today = new Date()
    return (
        <Card className="border-0 p-4">
            <h2>Today</h2>
            <h2>{`${days[today.getDay()]} ${today.getDate()} ${months[today.getMonth()]}`}</h2>
            <div className="my-4">
                {
                    daymeals.length === 0 ? (
                        <h4>There is no active plan for this week</h4>
                    ) : (
                        <>
                            {
                                daymeals.map(meal => {
                                    return (
                                        <>
                                            <h3>{meal}</h3>
                                            <Card className="mb-4">
                                                <Card.Img variant="top" src="http://placedog.net/300/300" />
                                                <Card.Body>
                                                    <Card.Title className="fs-3">Recepie</Card.Title>
                                                    <div className="text-end mt-3">
                                                        <Button variant="danger">Recepie information</Button>
                                                    </div>

                                                </Card.Body>
                                            </Card>
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