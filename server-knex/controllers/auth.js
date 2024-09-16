const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const helper = require("../helpers/helper");
const knex = require("../databases/connection");

module.exports.login = async function (req, res, next) {
    const { email, password } = req.body;

    try {
        const existingUser = await knex("users")
            .where({ email: email })
            .first();

        if (!existingUser) {
            return res.status(401).json({
                status: "error",
                message: "user not found",
                accessToken: null,
                refreshToken: null,
                user: null,
            });
        }

        const passValid = await bcrypt.compare(password, existingUser.password);

        if (passValid) {
            const { fingerprint, fingerprintHash } =
                helper.generateFpAndFpHash();

            res.cookie("fingerprint", fingerprint, {
                httpOnly: true,
                maxAge: 60 * 60 * 8,
                secure: true,
            });

            const accessToken = jwt.sign(
                {
                    _id: existingUser._id,
                    fingerprintHash: fingerprintHash,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
                }
            );

            const refreshToken = jwt.sign(
                {
                    _id: existingUser._id,
                    fingerprintHash: fingerprintHash,
                },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
                }
            );

            await knex("users")
                .where({
                    _id: existingUser._id,
                })
                .update(
                    {
                        refreshToken: refreshToken,
                    },
                    ["_id", "refreshToken"]
                );

            return res.status(200).json({
                status: "ok",
                message: "password match",
                accessToken: "Bearer " + accessToken,
                refreshToken: "Bearer " + refreshToken,
                user: existingUser,
            });
        } else {
            return res.status(401).json({
                status: "error",
                message: "invalid password",
                accessToken: null,
                refreshToken: null,
                user: null,
            });
        }
    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            status: "error",
            message: "server error: " + err.message,
            accessToken: null,
            refreshToken: null,
            user: null,
        });
    }
};

module.exports.register = async function (req, res, next) {
    const { email, password, repeatPassword } = req.body;

    try {
        const existingUser = await knex("users")
            .where({ email: email })
            .first();

        if (existingUser) {
            return res.status(401).json({
                status: "error",
                message: "user already exist",
                user: null,
            });
        }

        const passMatch = password == repeatPassword;

        if (!passMatch) {
            return res.status(401).json({
                status: "error",
                message: "password does not match",
                user: null,
            });
        }

        const salt = await bcrypt.genSalt();
        const tpass = await bcrypt.hash(password, salt);

        const userId = await knex("users").insert({
            email: email,
            password: tpass,
        });

        const user = await knex("users").where({
            _id: userId[0],
        });

        return res.status(200).json({
            status: "ok",
            message: "user created",
            user: user[0],
        });
    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            status: "error",
            message: "server error: " + err.message,
            user: null,
        });
    }
};

module.exports.logout = async function (req, res, next) {
    const { refreshToken } = req.body;

    try {
        if (!refreshToken) {
            return res.status(401).json({
                status: "error",
                message: "refreshToken does not exist",
                user: null,
            });
        }

        const existingUser = await knex("users")
            .where({ refreshToken: refreshToken })
            .first();

        if (!existingUser) {
            return res.status(401).json({
                status: "error",
                message: "user not exist",
                user: null,
            });
        }

        existingUser.refreshToken = null;
        await knex("users")
            .where({
                refreshToken: refreshToken,
            })
            .update({
                refreshToken: existingUser.refreshToken,
            });

        return res.status(200).json({
            status: "ok",
            message: "logout success",
            user: existingUser,
        });
    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            status: "error",
            message: "server error: " + err.message,
            user: null,
        });
    }
};

module.exports.token = async function (req, res, next) {
    const { refreshToken } = req.body;

    try {
        if (!refreshToken) {
            console.log("refreshToken does not exist");

            return res.status(401).json({
                status: "error",
                message: "refreshToken does not exist",
                accessToken: null,
                refreshToken: null,
            });
        }

        const existingUser = await knex("users")
            .where({ refreshToken: refreshToken })
            .first();
        console.log(existingUser);

        if (!existingUser) {
            console.log("user not exist");

            return res.status(401).json({
                status: "error",
                message: "user not exist",
                accessToken: null,
                refreshToken: null,
            });
        }

        try {
            try {
                const decoded = jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET
                );

                if (!decoded) {
                    return res.status(403).json({
                        status: "error",
                        message: "cannot decode accessToken",
                        accessToken: null,
                        refreshToken: null,
                    });
                }

                let fph1 = decoded.fingerprintHash;
                let fph2 = crypto
                    .createHash("sha256")
                    .update(req.cookies["fingerprint"])
                    .digest("hex");

                if (fph1 != fph2) {
                    return res.status(403).json({
                        status: "error",
                        message: "fingerprint not match",
                        accessToken: null,
                        refreshToken: null,
                    });
                }
            } catch (err) {
                console.log(err);

                return res.status(403).json({
                    status: "error",
                    message: err.message,
                    accessToken: null,
                    refreshToken: null,
                });
            }

            const { fingerprint, fingerprintHash } =
                helper.generateFpAndFpHash();

            res.cookie("fingerprint", fingerprint, {
                httpOnly: true,
                maxAge: 60 * 60 * 8,
                secure: true,
            });

            const accessToken = jwt.sign(
                {
                    _id: existingUser._id,
                    fingerprintHash: fingerprintHash,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
                }
            );

            const refreshToken1 = jwt.sign(
                {
                    _id: existingUser._id,
                    fingerprintHash: fingerprintHash,
                },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
                }
            );

            await knex("users")
                .where({
                    _id: existingUser._id,
                })
                .update({
                    refreshToken: refreshToken1,
                });

            return res.status(200).json({
                status: "ok",
                message: "access token generated successfully",
                accessToken: "Bearer " + accessToken,
                refreshToken: "Bearer " + refreshToken1,
            });
        } catch (err) {
            console.log(err.message);

            return res.status(500).json({
                status: "error",
                message: "server error: " + err.message,
                accessToken: null,
                refreshToken: null,
            });
        }
    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            status: "error",
            message: "server error: " + err.message,
            accessToken: null,
            refreshToken: null,
        });
    }
};
