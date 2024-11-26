import { Col, Container, Row } from "react-bootstrap";
import HomeSidebar from "./HomeSidebar";
import ProfileCard from "./left/ProfileCard";
import GroceryPanel from "./left/GroceryPanel";
import CalendarPlan from "./right/CalendarPlan";
function Home() {
    return (
        <Container className="my-5">
            <Row className="gx-3">
                <Col xs={3}><HomeSidebar child1={<ProfileCard />} child2={<GroceryPanel />} /></Col>
                <Col xs={6}></Col>
                <Col xs={3}><HomeSidebar child1={<CalendarPlan />} child2={<GroceryPanel />} /></Col>
            </Row>
        </Container>
    )
}

export default Home