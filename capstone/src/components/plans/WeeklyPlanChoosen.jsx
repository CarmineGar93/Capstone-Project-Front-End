import { Badge, Card, Accordion } from "react-bootstrap"
import { Plus } from "react-bootstrap-icons"

function WeeklyPlanChoosen({ selected, badgeColors }) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const meals = ["Breakfast", "Lunch", "Dinner"]
    return (
        <Card className="border-0 p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h2>Weekly Plan <Badge bg={badgeColors[selected.state]}>{selected.state}</Badge></h2>
                <h4>{selected.start} - {selected.end}</h4>
            </div>
            <Accordion flush className="mb-3">
                {
                    days.map((day, index) => {
                        return (
                            <Accordion.Item eventKey={index} className="border-0 border-bottom">
                                <Accordion.Header><h5 className="mb-0">{day}</h5></Accordion.Header>
                                <Accordion.Body className="px-2 py-4">
                                    {
                                        meals.map((meal, index2) => {
                                            return (
                                                <div className="border-bottom border-1 d-flex justify-content-between align-items-center mb-2" key={index2}>
                                                    <p className="mb-0 fs-5">{meal}</p>
                                                    <button className="btn-experience bg-white border-0 rounded-circle p-2" onClick={() => alert(`Day ${day}, meal ${meal}`)}><Plus size={25} /></button>
                                                </div>
                                            )
                                        })
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })
                }
            </Accordion>
        </Card>
    )
}

export default WeeklyPlanChoosen