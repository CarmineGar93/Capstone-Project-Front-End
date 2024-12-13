import { Container, Row, Col } from "react-bootstrap"
import { HouseDoorFill, EnvelopeAtFill, TelephoneFill, Facebook, Google, Instagram, Linkedin } from 'react-bootstrap-icons'

function MyFooter() {
    return (
        <footer className="mt-7">
            <Container className="p-4 pb-0 border-top" >
                <Row>
                    <Col md={6} className=" mx-auto mt-3 text-center text-md-start ">
                        <img src="./Logo.png" alt="" className=" mb-4" height={150} />
                    </Col>
                    <hr className="w-100 clearfix d-md-none" />
                    <Col md={6} className=" mx-auto mt-3 text-center text-md-end">
                        <h6 className="mb-4">CONTACT</h6>
                        <p><HouseDoorFill /> Via Iommella Piccola 23, Sant'Agnello 80065, NA</p>
                        <p><EnvelopeAtFill /> carmygargiulo45@gmail.com</p>
                        <p><TelephoneFill /> + 39 081 8043457</p>
                    </Col>
                </Row>
                <Row className="py-3 pt-0 d-flex align-items-center">
                    <Col md={7} lg={8} className="text-center text-md-start">
                        <div>
                            © 2024 Copyright:
                            <a href="#u" className="text-dark text-decoration-none"> Carmine Gargiulo</a>
                        </div>
                    </Col>
                    <Col md={5} lg={4} className="text-center text-md-end">
                        <a href="https://www.facebook.com/carmine.gargiulo.735" className="btn btn-floating m-1" role="button" target="blank"><Facebook /></a>
                        <a href="https://www.linkedin.com/in/carmine-gargiulo-2941b318a/" className="btn btn-floating m-1" role="button" target="blank"><Linkedin /></a>
                        <a href="mailto:carmygargiulo45@gmail.com" className="btn btn-floating m-1" role="button" target="blank"><Google /></a>
                        <a href="https://www.instagram.com/carmygar93/" className="btn btn-floating m-1" role="button" target="blank"><Instagram /></a>
                    </Col>
                </Row>
            </Container >
        </footer >
    )
}

export default MyFooter