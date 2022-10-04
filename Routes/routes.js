const Router = require("express").Router();
const appModel = require("../models/User");

Router.get("/", (req, res) => {
    res.send("Hello World");
});

Router.post("/login", (req, res) => {
    const { email, password } = req.body;

    appModel.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Logged In!!!", user: user });
            } else {
                res.status(400).send("Incorrect Password!!!");
            }
        } else {
            res.status(400).send({ message: "User not registered" });

        }
    })
});

Router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    appModel.findOne({ email: email }, (err, user) => {
        if (user) {
            res.status(400).send({ message: "User Already Registered!!!" });
        } else {
            const user = new appModel({
                name: name,
                email: email,
                password: password
            });
            user.save(err => {
                if (err) {
                    console.log(err);
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered!!!" })
                }
            }
            );
        }
    });
});

Router.post("/forgetPwd", (req, res) => {
    res.send("Hello");
});

module.exports = Router;