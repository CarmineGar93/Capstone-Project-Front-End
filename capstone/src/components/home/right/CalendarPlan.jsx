import { Accordion, Card, Button } from "react-bootstrap"

function CalendarPlan() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const meals = ["Breakfast", "Lunch", "Dinner"]
    return (
        <Card className="border-0">
            <h5 className="mb-1 bg-white shadow-sm p-3 text-center">Weekly active plan</h5>
            <Accordion flush className="mb-3">
                {
                    days.map((day, index) => {
                        return (
                            <Accordion.Item eventKey={index} className="border-0 border-bottom">
                                <Accordion.Header>{day}</Accordion.Header>
                                <Accordion.Body>
                                    {
                                        meals.map((meal, index2) => {
                                            return (
                                                <Accordion flush>
                                                    <Accordion.Item eventKey={index2} className="border-0 border-bottom">
                                                        <Accordion.Header>{meal}</Accordion.Header>
                                                        <Accordion.Body>
                                                            Recepie
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            )
                                        })
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })
                }
            </Accordion>
            <div className="text-center p-3">
                <Button variant="danger">Weekly plan management</Button>
            </div>
        </Card>
    )
}

export default CalendarPlan