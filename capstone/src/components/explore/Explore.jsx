import { Container } from "react-bootstrap"
import ExploreHero from "./ExploreHero"
import PlanInfo from "./ExploreInfo"

function Explore() {
    return (
        <>
            <Container fluid className="px-lg-3 px-xl-6 px-xxl-10 custom-background">
                <ExploreHero />
            </Container>
            <h2 className="my-5 text-center">What's offering (siteName)</h2>
            <Container>
                <PlanInfo></PlanInfo>
            </Container>
        </>

    )
}

export default Explore