const userSchema = require("../model/usermodel");

exports.getprofile = async (req, res) => {
    userSchema.findById(req.body.id).then((val) => {
        res.send(val)
    }).catch((err) => res.status(400).json(err));

};
exports.editprofile = async (req, res) => {
    userSchema.findByIdAndUpdate(req.body.id, {
        $set: {
            age: req.body.age,
            gender: req.body.gender,
            mobile: req.body.mobile,
        }
    }, { new: true }, function (err, result) {
        if (err) {
            res.send({ message: "failed" });
        }
        res.send({ message: "success" });
    });
};
