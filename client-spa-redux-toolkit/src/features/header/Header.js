import { useEffect } from "react";
import { Col, Row, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchLogout } from "./headerSlice";

function Header() {
    const authData = useSelector((state) => state.header);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const doLogout = async (e) => {
        await dispatch(fetchLogout());
    };

    useEffect(() => {
        if (authData.status === "ok") {
            navigate("/");
        }
    }, [authData.status, navigate]);

    const showLoginOrLogout = () => {
        if (sessionStorage.getItem("accessToken")) {
            return (
                <div>
                    <Badge
                        pill
                        variant="primary"
                        className="float-right mr-2"
                        onClick={doLogout}
                        style={{ cursor: "pointer" }}
                    >
                        Logout
                    </Badge>
                </div>
            );
        }
        return (
            <Link to="/login">
                <Badge pill variant="primary" className="float-right mr-2">
                    Login
                </Badge>
            </Link>
        );
    };

    const showTodoOrNot = () => {
        if (sessionStorage.getItem("accessToken")) {
            return (
                <Link to="/todo">
                    <Badge pill variant="primary" className="float-right mr-2">
                        Todo
                    </Badge>
                </Link>
            );
        }
        return <></>;
    };

    return (
        <Row className="mt-5">
            <Col xs={12} md={6} className="d-flex justify-content-center">
                <h1>Todo App</h1>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center">
                <Link to="/">
                    <Badge pill variant="primary" className="float-right mr-2">
                        Home
                    </Badge>
                </Link>
                {showTodoOrNot()}
                {showLoginOrLogout()}
                <Link to="/register">
                    <Badge pill variant="primary" className="float-right mr-2">
                        Register
                    </Badge>
                </Link>
            </Col>
        </Row>
    );
}

export default Header;
