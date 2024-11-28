import { Container, Row, Col } from "react-bootstrap"
import { HouseDoorFill, EnvelopeAtFill, TelephoneFill, Facebook, TwitterX, Google, Instagram } from 'react-bootstrap-icons'

function MyFooter() {
    return (
        <footer className="mt-7">
            <Container className="p-4 pb-0 border-top" >
                <Row>
                    <Col md={6} className=" mx-auto mt-3 text-center text-md-start ">
                        <img src="http://placedog.net/100/100" alt="" className="img-fluid mb-4" />
                        <h6>siteName</h6>
                    </Col>
                    <hr className="w-100 clearfix d-md-none" />
                    <Col md={6} className=" mx-auto mt-3 text-center text-md-end">
                        <h6 className="mb-4">CONTACT</h6>
                        <p><HouseDoorFill /> Via IP 23, Sorrento 80067, NA</p>
                        <p><EnvelopeAtFill /> info@siteName.com</p>
                        <p><TelephoneFill /> + 39 081 8043457</p>
                    </Col>
                </Row>
                <Row className="py-3 pt-0 d-flex align-items-center">
                    <Col md={7} lg={8} className="text-center text-md-start">
                        <div>
                            © 2024 Copyright:
                            <a href="#u" className="text-dark text-decoration-none"> Carmine.com</a>
                        </div>
                    </Col>
                    <Col md={5} lg={4} className="text-center text-md-end">
                        <a href="#u" className="btn btn-floating m-1" role="button" ><Facebook /></a>
                        <a href="#u" className="btn btn-floating m-1" role="button"><TwitterX /></a>
                        <a href="#u" className="btn btn-floating m-1" role="button"><Google /></a>
                        <a href="#u" className="btn btn-floating m-1" role="button"><Instagram /></a>
                    </Col>
                </Row>
            </Container >
        </footer >
    )
}

export default MyFooter