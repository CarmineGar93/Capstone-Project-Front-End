import { Col, Container, Row } from "react-bootstrap";
import HomeSidebar from "./HomeSidebar";
import ProfileCard from "./left/ProfileCard";
import GroceryPanel from "./left/GroceryPanel";
import CalendarPlan from "./right/CalendarPlan";
import ProductsCheck from "./right/ProductsCheck";
import HomeCentral from "./central/HomeCentral";
function Home() {
    return (
        <Container className="my-5">
            <Row className="g-3">
                <Col xs={12} xl={3}><HomeSidebar child1={<ProfileCard />} child2={<GroceryPanel />} /></Col>
                <Col xs={12} md={7} xl={6} className=" order-last order-md-0"><HomeCentral /></Col>
                <Col xs={12} md={5} xl={3}><HomeSidebar child2={<CalendarPlan />} child1={<ProductsCheck />} /></Col>
            </Row>
        </Container>
    )
}

export default Home