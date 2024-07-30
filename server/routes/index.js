const router = require("express").Router();
const logOutController = require("../controller/logOut");
const loginController = require("../controller/login");
const registerController = require("../controller/register");
const serachUserController = require("../controller/serachUser");
const updateUserController = require("../controller/updateUser");
const userDetailsController = require("../controller/userDetails");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user-details", userDetailsController);
router.get("/logout", logOutController);
router.post("/update-user", updateUserController);
router.post("/serach-user", serachUserController);

module.exports = router