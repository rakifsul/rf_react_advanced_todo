const Todo = require("../models/todo");

module.exports.getVersion = function (req, res, next) {
    return res.status(200).json({
        name: "Todo API",
        version: require("../package.json").version,
    });
};

module.exports.getAllTodo = async function (req, res, next) {
    try {
        // let err = new Error("XCXCXCV");
        // err.status = 500;
        // throw err;

        let q = req.query.q ? req.query.q : null;
        let page = req.query.page ? req.query.page : null;
        let perPage = req.query.perPage ? req.query.perPage : null;

        console.log(q);
        console.log(page);
        console.log(perPage);

        if (q == null) {
            if (page == null || perPage == null) {
                const todos = await Todo.find();
                // return res.status(200).json(todos);
                return res.status(200).json({
                    status: "ok",
                    message: "success",
                    data: todos,
                });
            } else {
                const todos = await Todo.find()
                    .sort({ createdAt: -1 })
                    .skip(page * perPage)
                    .limit(perPage);
                // return res.status(200).json(todos);
                return res.status(200).json({
                    status: "ok",
                    message: "success",
                    data: todos,
                });
            }
        } else {
            if (page == null || perPage == null) {
                const todos = await Todo.find({
                    title: {
                        $regex: q,
                        $options: "i",
                    },
                });
                // return res.status(200).json(todos);
                return res.status(200).json({
                    status: "ok",
                    message: "success",
                    data: todos,
                });
            } else {
                const todos = await Todo.find({
                    title: {
                        $regex: q,
                        $options: "i",
                    },
                })
                    .sort({ createdAt: -1 })
                    .skip(page * perPage)
                    .limit(perPage);
                // return res.status(200).json(todos);
                return res.status(200).json({
                    status: "ok",
                    message: "success",
                    data: todos,
                });
            }
        }
    } catch (err) {
        console.log(err.message);
        return res.status(err.status || 500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.createTodo = async function (req, res, next) {
    const { title, description } = req.body;
    try {
        let todo = new Todo({
            title: title,
            description: description,
        });

        await todo.save();

        // return res.status(200).json(todo);
        return res.status(200).json({
            status: "ok",
            message: "success",
            data: todo,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(err.status || 500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.getTodo = async function (req, res, next) {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
        });

        // return res.status(200).json(todo);
        return res.status(200).json({
            status: "ok",
            message: "success",
            data: todo,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(err.status || 500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.updateTodo = async function (req, res, next) {
    const { id, title, description } = req.body;
    try {
        let ret = await Todo.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    title: title,
                    description: description,
                },
            },
            {
                new: true,
            }
        );

        // return res.status(200).json(ret);
        return res.status(200).json({
            status: "ok",
            message: "success",
            data: ret,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(err.status || 500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports.deleteTodo = async function (req, res, next) {
    const { id } = req.query;
    try {
        const ret = await Todo.findOneAndDelete({
            _id: id,
        });

        // return res.status(200).json(ret);
        return res.status(200).json({
            status: "ok",
            message: "success",
            data: ret,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(err.status || 500).json({
            status: "error",
            message: err.message,
        });
    }
};
