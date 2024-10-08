const express = require("express");
const cors = require("cors");
const url = require("url");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const todoRouter = require("./routes/todo");
const authRouter = require("./routes/auth");

const app = express();
var corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/todo", todoRouter);
app.use("/auth", authRouter);
app.use("*", (req, res, next) => {
    res.redirect(`${req.protocol}://${req.get("host")}/todo/version`);
});

const port = url.parse(process.env.BASE_URL).port | 3001;
app.listen(port, function () {
    console.log(`server berjalan di port ${port}`);
});
