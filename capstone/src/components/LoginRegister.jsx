import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useState } from 'react'
const LoginRegister = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        surname: "",
    });
    const { email, name, password, surname } = formData;
    const [isLogin, setIsLogin] = useState(true);
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
        setIsLogin((prev) => !prev);
    };
    return (
        <>
            <h1 className="text-center mt-8">Site Logo</h1>
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <Card className="my-5 px-5 py-3">
                        <h2 className="mt-3">{isLogin ? "Login" : "Register"}</h2>
                        <div className="mb-2 d-flex justify-content-end">
                            <p className="mb-0">
                                {isLogin ? "or" : "Already have an account ?"}

                            </p>
                            <a
                                size="sm"
                                onClick={handleToggle}
                                className="ps-2 nav-link text-danger"
                                href="#a"
                            >
                                {isLogin ? "Create an account" : "Login"}
                            </a>

                        </div>
                        <Form>
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
                            <Button className="btn btn-block w-100">
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