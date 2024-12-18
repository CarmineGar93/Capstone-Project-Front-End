import { Container } from "react-bootstrap"
import ExploreHero from "./ExploreHero"
import PlanInfo from "./ExploreInfo"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Explore() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            navigate("/home")
        }
    })
    return (
        <>
            <Container fluid className="px-lg-3 px-xl-6 px-xxl-10 custom-background">
                <ExploreHero />
            </Container>

            <Container className="bg-white py-5 my-5 rounded-5">
                <h2 className="mb-5 text-center">What's offering SmartMeals.com</h2>
                <PlanInfo></PlanInfo>
            </Container>
        </>

    )
}

export default Explore