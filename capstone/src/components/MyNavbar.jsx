
import { Navbar, Container, Offcanvas, Nav, Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BoxArrowInLeft, Person } from 'react-bootstrap-icons'
import { RemovePlansAction, RemoveUserAction } from '../redux/actions'
function MyNavbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.logged)
    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch(RemoveUserAction())
        dispatch(RemovePlansAction())
        alert("Logout successfull")
        navigate("/explore")
    }
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
                                <Link to={"/recipes"} className='pe-lg-3 pe-xl-4 pe-xxl-5 fs-5 nav-link'>Recepies</Link>
                                <Link to={"/plans"} className='pe-lg-3 pe-xl-4 pe-xxl-5 fs-5 nav-link'>Weekly Plans</Link>
                                <Nav.Link href='#action5' className='pe-lg-3 pe-xl-4 pe-xxl-5 fs-5'>Your grocery lists</Nav.Link>
                            </Nav>
                            {
                                user ? (
                                    <div className='d-flex align-items-center'>
                                        <img
                                            alt=""
                                            src={user.avatarUrl}
                                            width="40"
                                            height="40"
                                            className="rounded-circle"
                                        />
                                        <Dropdown>
                                            <Dropdown.Toggle variant="outline-light" id="dropdown-basic" className='border-0 text-black rounded-3'>
                                                {user.name}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <div className='d-flex align-items-center'>
                                                        <Person size={20} className='me-2' />
                                                        <span>Profile</span>
                                                    </div>

                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleLogout()}>
                                                    <div className='d-flex align-items-center'>
                                                        <BoxArrowInLeft size={20} className='me-2' />
                                                        <span>Logout</span>
                                                    </div>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                ) : (
                                    <Button variant='danger' className='mt-3 mt-lg-0 align-self-center py-2' onClick={() => navigate('/auth/login')}>Login</Button>
                                )
                            }

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container >
            </Navbar >

        </>
    )
}

export default MyNavbar