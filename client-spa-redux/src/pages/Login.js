import { useState, useEffect } from "react";
import { Row, Col, Button, Jumbotron, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { login } from "../actions/authaction";

function Login() {
    const authData = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const doLogin = async (e) => {
        e.preventDefault();

        await dispatch(login(email, password));
    };

    useEffect(() => {
        if (
            authData.currentAction === "act-login-success" &&
            authData.status === "ok"
        ) {
            navigate("/todo");
        } else if (
            authData.currentAction === "act-login-failed" &&
            authData.status === "error"
        ) {
            alert(authData.message);
        }
    }, [authData.status, authData.message, navigate]);
    return (
        <Row className="mt-5">
            <Col lg={12} md={12} sm={12}>
                <Jumbotron className="pt-3 pb-5">
                    <h3>Login</h3>
                    <p>{authData.status}</p>
                    <p>{authData.message}</p>
                    {/* {authData.status === "error" ? alert(authData.message) : ""} */}
                    <hr></hr>
                    <Form onSubmit={doLogin}>
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

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Jumbotron>
            </Col>
        </Row>
    );
}

export default Login;
