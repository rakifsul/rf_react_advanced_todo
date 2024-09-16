const initialState = {
    items: [],
    item: {
        _id: "",
        title: "",
        description: "",
    },
    noMoreItems: false,
};

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case "act-set-todo-title":
            return {
                ...state,
                item: {
                    ...state.item,
                    title: action.payload,
                },
            };
        case "act-set-todo-description":
            return {
                ...state,
                item: {
                    ...state.item,
                    description: action.payload,
                },
            };
        case "act-clear-todo-item-data":
            return {
                ...state,
                item: action.payload,
            };
        case "act-get-all-todos":
            return {
                ...state,
                items: action.payload,
            };
        case "act-get-limited-todos":
            console.log("AAAAAAAAAAAAAAAA");
            console.log(action.payload.length);
            console.log(action.payload);
            return {
                ...state,
                items: state.items.concat(action.payload),
                noMoreItems: action.payload.length < 1 ? true : false,
            };
        case "act-get-todo":
            return {
                ...state,
                item: action.payload,
            };
        case "act-create-todo":
            return {
                ...state,
                item: action.payload,
            };
        case "act-edit-todo":
            return {
                ...state,
                item: action.payload,
            };
        case "act-delete-todo":
            return {
                ...state,
                item: action.payload,
            };
        case "act-clear-todo-items":
            return {
                ...state,
                items: action.payload,
                noMoreItems: true,
            };
        default:
            return state;
    }
}

export default todoReducer;
