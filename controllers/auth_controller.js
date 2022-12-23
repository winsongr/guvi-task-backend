const userSchema = require("../model/usermodel");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const { db } = require("../model/usermodel");

var collection = db.collection('users');

exports.register = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new userSchema({
        userName: req.body.username,
        email: req.body.email,
        password: hashPassword,
        age: req.body.age,
        gender: req.body.age,
        mobile: req.body.mobile,
    });
    collection.find({ email: req.body.email }, { $exists: true }).toArray(function (err, docs) {
        if (docs.length > 0) {
            res.send({
                message: 'user exists',
            });
        }
        else {
            user.save().then(doc => {
                res.send({
                    message: 'success',
                })
            }).catch(err => res.status(500).send({
                message: err,
            }));
        }
    });

};
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        userSchema.find({ email }).then((data) => {
            if (data.length > 0) {
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then((result) => {
                    if (result) {
                        jwt.sign(email, 'guvi', (err, token) => {
                            res.send({
                                message: "success",
                                'token': token,
                                'id': data[0].id
                            });
                        });

                    } else {
                        res.send({
                            message: "Oops!, Wrong Password try again",
                        });
                    }
                });
            } else {
                res.status(200).send({ message: 'no users with this email', });
            }
        });

    } catch (error) {
        res.status(500).send(error);
    }

};
