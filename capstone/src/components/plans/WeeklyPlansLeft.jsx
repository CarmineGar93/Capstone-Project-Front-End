import { Badge, Button, Card } from "react-bootstrap"
import { Calendar } from "react-bootstrap-icons"

function WeeklyPlansLeft() {
    return (
        <Card className="border-0 p-4">
            <div className="d-flex align-items-center mb-4">
                <Calendar size={20} className="me-2" />
                <h4 className="mb-0">Weekly Plans List</h4>
            </div>
            <div className="mb-5">
                <div className=" border-start border-3 px-2 mb-3">
                    <h6 className="text-secondary">List 1: 25 Nov - 1 Dec <Badge bg={"success"}>Active</Badge></h6>
                </div>
                <div className=" border-start border-3 px-2 mb-3">
                    <h6 className="text-secondary">List 2: 2 Dec - 8 Dec <Badge bg={"warning"}>In program</Badge></h6>
                </div>
                <div className=" border-start border-3 px-2">
                    <h6 className="text-secondary">List 3: 18 Nov - 24 Nov <Badge bg={"secondary"}>Expired</Badge></h6>
                </div>
            </div>
            <div className="mb-">
                <Button variant="danger">Create new plan</Button>
            </div>



        </Card>
    )
}

export default WeeklyPlansLeft