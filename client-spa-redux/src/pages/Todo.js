import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import CreateOrEditModal from "../components/CreateOrEditModal";
import Jumbo from "../components/Jumbo";
import Logo from "../components/Logo";
import TodoTabs from "../components/TodoTabs";

import {
    actSetTodoTitle,
    actSetTodoDescription,
    actClearTodoItemData,
    actGetAllTodos,
    actGetLimitedTodos,
    actGetTodo,
    actCreateTodo,
    actEditTodo,
    actDeleteTodo,
    actClearTodoItems,
} from "../actions/todoaction";

function Todo() {
    const navigate = useNavigate();
    const allData = useSelector((state) => state);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);

    const [page, setPage] = useState(0);
    const [searchTerms, setSearchTerms] = useState("");
    const [loading, setLoading] = useState(false);
    const [noMoreItems, setNoMoreItems] = useState(false);

    const doCloseModal = () => {
        console.log("doCloseModal");

        setShow(false);
    };

    const doShowModal = () => {
        console.log("doShowModal");

        setShow(true);
    };

    const doGetCreateTodo = async () => {
        console.log("doGetCreateTodo");

        doShowModal();
        dispatch(actClearTodoItemData());
    };

    const doLoadMore = async () => {
        doGetLimitedTodos(page, searchTerms);
    };

    const doGetAllTodos = useCallback(async () => {
        console.log("doGetAllTodos");

        dispatch(actGetAllTodos());
    }, [dispatch]);

    const doGetLimitedTodos = async (valPage, query) => {
        console.log("doGetLimitedTodos");

        setLoading(true);

        setTimeout(async () => {
            console.log(page);
            console.log(valPage);

            await dispatch(actGetLimitedTodos(valPage, 2, query));
            setLoading(false);

            const newPage = valPage + 1;
            setPage(newPage);

            setSearchTerms(query ? query : "");
        }, 1000);
    };

    const doGetEditTodo = async (id) => {
        console.log("doGetEditTodo");

        doShowModal();
        dispatch(actGetTodo(id));
    };

    const doEditOrCreateTodo = async (e) => {
        console.log("doEditOrCreateTodo");

        if (allData.todos.item._id === "") {
            doCreateTodo(e);
        } else {
            doEditTodo(e);
        }
    };

    const doAddRandomTodoClick = async () => {
        for (let i = 0; i < 10; ++i) {
            dispatch(
                actCreateTodo({
                    title: "todo title " + Math.random().toString(),
                    description: "todo description " + Math.random().toString(),
                })
            );
        }

        setUpdate(!update);
    };

    const doCreateTodo = async (e) => {
        console.log("doCreateTodo");

        e.preventDefault();

        dispatch(
            actCreateTodo({
                title: allData.todos.item.title,
                description: allData.todos.item.description,
            })
        );

        dispatch(actClearTodoItemData());

        doCloseModal();
        setUpdate(!update);
    };

    const doEditTodo = async (e) => {
        console.log("doEditTodo");

        e.preventDefault();

        dispatch(
            actEditTodo({
                id: allData.todos.item._id,
                title: allData.todos.item.title,
                description: allData.todos.item.description,
            })
        );

        dispatch(actClearTodoItemData());

        doCloseModal();
        setUpdate(!update);
    };

    const doDeleteTodo = async (id) => {
        console.log("doDeleteTodo");

        dispatch(actDeleteTodo(id));
        setUpdate(!update);
    };

    const doUpdateTodoItems = async () => {
        console.log("doClearTodoItems");

        dispatch(actClearTodoItems());

        doGetLimitedTodos(0);
    };

    const doSearch = async (e) => {
        console.log("doSearch");
        if (e.charCode === 13) {
            console.log(e.target.value);

            dispatch(actClearTodoItems());

            doGetLimitedTodos(0, e.target.value);
        }
    };

    const doCheckAccessToken = useCallback(async () => {
        console.log("doCheckAccessToken");
        try {
            if (!sessionStorage.getItem("accessToken")) {
                navigate("/login");
            }
        } catch (err) {
            if (err.response) {
                navigate("/login");
            }
        }
    }, [navigate]);

    useEffect(() => {
        doCheckAccessToken();
    }, [doCheckAccessToken]);

    useEffect(() => {
        doUpdateTodoItems();
    }, [update]);

    useEffect(() => {
        setNoMoreItems(allData.todos.noMoreItems);
    }, [allData.todos.noMoreItems]);

    return (
        <div>
            <Row className="mt-5">
                <Logo />
                <Jumbo
                    onAddTodoClick={doGetCreateTodo}
                    onAddRandomTodoClick={doAddRandomTodoClick}
                    onSearchKeyDown={doSearch}
                />
            </Row>

            <Row className="mt-3">
                <TodoTabs onDelete={doDeleteTodo} onGetEdit={doGetEditTodo} />
            </Row>

            <Row className="mt-3 mb-3">
                <Col lg={12} md={12} sm={12}>
                    {loading ? (
                        <h4 className="text-center">memuat data...</h4>
                    ) : noMoreItems ? (
                        <h4 className="text-center">tidak ada data lagi...</h4>
                    ) : (
                        ""
                    )}

                    <Button
                        variant="primary"
                        className="w-100"
                        onClick={doLoadMore}
                    >
                        Muat Lebih Banyak Lagi
                    </Button>
                </Col>
            </Row>

            <CreateOrEditModal
                show={show}
                onTitleChange={(e) => {
                    dispatch(actSetTodoTitle(e.target.value));
                }}
                onDescriptionChange={(e) => {
                    dispatch(actSetTodoDescription(e.target.value));
                }}
                onModalHide={doCloseModal}
                onFormSubmit={doEditOrCreateTodo}
                onButtonCloseClick={doCloseModal}
            />
        </div>
    );
}

export default Todo;
