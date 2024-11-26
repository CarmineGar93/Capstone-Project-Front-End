
import { Navbar, Container, Offcanvas, Nav, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
function MyNavbar() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar key='lg' expand='lg' className="bg-white py-2">
                <Container fluid className='mx-lg-2 mx-xl-8 mx-xxl-9'>
                    <Navbar.Brand href="#home" className='py-2 fs-4 me-0'>
                        <img
                            alt=""
                            src="http://placedog.net/50/50"
                            width="40"
                            height="40"
                            className="d-inline-block align-top rounded-circle"
                        />{' '}
                        Webname
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-center flex-grow-1 pe-3">
                                <Link to={"/home"} className='pe-lg-3 pe-xl-4 pe-xxl-5 fs-5 nav-link'>Home</Link>
                                <Nav.Link href="#action2" className='pe-lg-3 pe-xl-4 pe-xxl-5 fs-5'>Your Products</Nav.Link>
                                <Link to={"/recepies"} className='pe-lg-3 pe-xl-4 pe-xxl-5 fs-5 nav-link'>Recepies</Link>
                                <Nav.Link href='#action4' className='pe-lg-3 pe-xl-4 pe-xxl-5 fs-5'>Weekly Plans</Nav.Link>
                                <Nav.Link href='#action5' className='pe-lg-3 pe-xl-4 pe-xxl-5 fs-5'>Your grocery lists</Nav.Link>
                            </Nav>
                            <Button variant='danger' className='mt-3 mt-lg-0 align-self-center py-2' onClick={() => navigate('/auth/login')}>Login</Button>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container >
            </Navbar >

        </>
    )
}

export default MyNavbar