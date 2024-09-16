const knex = require("../databases/connection");

module.exports.getVersion = function (req, res, next) {
    return res.status(200).json({
        name: "Todo API",
        version: require("../package.json").version,
    });
};

module.exports.getAllTodo = async function (req, res, next) {
    try {
        let q = req.query.q ? req.query.q : null;
        let page = req.query.page ? req.query.page : null;
        let perPage = req.query.perPage ? req.query.perPage : null;

        console.log(q);
        console.log(page);
        console.log(perPage);

        if (q == null) {
            if (page == null || perPage == null) {
                const todos = await knex("todos");

                return res.status(200).json({
                    status: "ok",
                    message: "success",
                    data: todos,
                });
            } else {
                const todos = await knex("todos")
                    .orderBy("createdAt", "desc")
                    .offset(page * perPage)
                    .limit(perPage);

                return res.status(200).json({
                    status: "ok",
                    message: "success",
                    data: todos,
                });
            }
        } else {
            if (page == null || perPage == null) {
                const todos = await knex("todos").where(
                    "title",
                    "like",
                    `%${q}%`
                );

                return res.status(200).json({
                    status: "ok",
                    message: "success",
                    data: todos,
                });
            } else {
                const todos = await knex("todos")
                    .where("title", "like", `%${q}%`)
                    .orderBy("createdAt", "desc")
                    .offset(page * perPage)
                    .limit(perPage);

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
        const todoId = await knex("todos").insert({
            title: title,
            description: description,
        });

        const todo = await knex("todos").where({
            _id: todoId[0],
        });

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
        const todo = await knex("todos").where({ _id: req.params.id }).first();

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
        const ret = await knex("todos").where({ _id: id }).update(
            {
                title: title,
                description: description,
            },
            ["_id", "title", "description"]
        );

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
        const ret = await knex("todos")
            .where({
                _id: id,
            })
            .del()
            .returning("*");

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
