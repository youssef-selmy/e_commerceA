const express = require("express");
const {
  signupvalidator,
  loginvalidator,
} = require("../utils/validators/authValidator");

const {
  singup,
  login,
  restictTo,
  protect,
} = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(signupvalidator,singup);
router.route("/login").post(loginvalidator, login);
// router.route('/:id')
//     .get(getuservalidator, getuser)
//     .put(updateuservalidator, upduateuser)
//     .delete(deleteuservalidator, deleteuser);

module.exports = router;
