import { Container } from "react-bootstrap"
import HomeHero from "./HomeHero"

function Home() {
    return (
        <Container fluid className="px-lg-3 px-xl-6 px-xxl-10 custom-background">
            <HomeHero />
        </Container>
    )
}

export default Home