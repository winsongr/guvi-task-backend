const router = require("express").Router();
const authcontroller = require('../controllers/auth_controller');
const usercontroller = require('../controllers/user_controller');

router.get("/", (req,res) => {
    res.json({ "message": "working" });
 
})
router.post("/register", authcontroller.register);

router.post("/login", authcontroller.login);

router.get("/profile", usercontroller.getprofile);

router.post("/profile", usercontroller.editprofile);

module.exports = router;