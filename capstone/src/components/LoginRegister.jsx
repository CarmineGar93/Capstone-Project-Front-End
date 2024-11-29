import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
const LoginRegister = () => {
    const location = useLocation()
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        surname: "",
    });
    const { email, name, password, surname } = formData;
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(location.pathname.includes("/login") ? true : false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleToggle = () => {
        setFormData({
            email: "",
            name: "",
            password: "",
            surname: "",
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLogin) {
            const bodyLogin = {
                email: formData.email,
                password: formData.password
            }
            try {
                const response = await fetch("http://localhost:3001/auth/login", {
                    method: "POST",
                    body: JSON.stringify(bodyLogin),
                    headers: {
                        "Content-Type": "application/json"
                    }

                })
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    localStorage.setItem("token", data.token)
                    alert("Login successful")
                    navigate("/home")

                } else {
                    const error = await response.json()
                    throw new Error(error.message)
                }
            } catch (err) {
                alert(err)
            }
        } else {
            try {
                const response = await fetch("http://localhost:3001/auth/register", {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json"
                    }

                })
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    localStorage.setItem("token", data.token)
                    alert("Login successful")
                    navigate("/home")

                } else {
                    const error = await response.json()
                    throw new Error(error.message)
                }
            } catch (err) {
                alert(err)
            }
        }
    }
    return (
        <>
            <h1 className="text-center mt-8" onClick={() => navigate("/explore")}>Site Logo</h1>
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <Card className="my-5 px-5 py-3 border-0">
                        <h2 className="mt-3">{isLogin ? "Login" : "Register"}</h2>
                        <div className="mb-2 d-flex justify-content-end">
                            <p className="mb-0">
                                {isLogin ? "or" : "Already have an account ?"}

                            </p>
                            <a
                                size="sm"
                                onClick={handleToggle}
                                className="ps-2 nav-link text-danger"
                                href={isLogin ? "/auth/register" : "/auth/login"}
                            >
                                {isLogin ? "Create an account" : "Login"}
                            </a>

                        </div>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            {!isLogin && (
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            )}
                            {!isLogin && (
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Surname"
                                        value={surname}
                                        name="surname"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            )}
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    name="email"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    name="password"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {
                                isLogin && <a
                                    size="sm"
                                    className="ps-2 nav-link text-end text-danger"
                                    href="#a"
                                >
                                    Forgot password?
                                </a>
                            }
                            <Form.Check
                                type={"checkbox"}
                                label={isLogin ? "Remember me" : "I accept the terms and privacy policy"}
                                className={`m${isLogin ? "b" : "y"}-4`}
                                required={isLogin ? false : true}
                            />
                            <Button variant="danger" type="submit" className="btn btn-block w-100">
                                Sign {isLogin ? "In" : "Up"}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>

    );
};

export default LoginRegister;