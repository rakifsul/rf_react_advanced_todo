import { useState, useEffect } from "react";
import { Row, Col, Button, Jumbotron, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchRegister } from "./registerSlice";

function Register() {
    const authData = useSelector((state) => state.register);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const doRegister = async (e) => {
        e.preventDefault();

        await dispatch(
            fetchRegister({
                email: email,
                password: password,
                repeatPassword: repeatPassword,
            })
        );
    };

    useEffect(() => {
        if (authData.status === "ok") {
            navigate("/login");
        } else if (authData.status === "error") {
            alert(authData.message);
        }
    }, [authData.status, authData.message, navigate]);

    return (
        <Row className="mt-5">
            <Col lg={12} md={12} sm={12}>
                <Jumbotron className="pt-3 pb-5">
                    <h3>Register</h3>
                    {/* <p>{authData.message}</p> */}
                    <hr></hr>
                    <Form onSubmit={doRegister}>
                        <Form.Group controlId="title">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                placeholder="isi email..."
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                placeholder="isi password..."
                            />
                        </Form.Group>

                        <Form.Group controlId="repeat-password">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={repeatPassword}
                                onChange={(e) => {
                                    setRepeatPassword(e.target.value);
                                }}
                                placeholder="isi password..."
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Jumbotron>
            </Col>
        </Row>
    );
}

export default Register;
