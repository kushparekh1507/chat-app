const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      const validPassword = await bcrypt.compare(password, checkEmail.password);

      if (validPassword) {
        const tokenData = {
          _id: checkEmail?._id,
          email: checkEmail?.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
        const tokenOptions = {
          httpOnly: true,
          secure: true
        }

        res.status(200).cookie("token", token, tokenOptions).json(token)

      } else {
        throw new Error("Wrong Password");
      }
    } else {
      throw new Error("User does not exist");
    }

  } catch (e) {
    res.status(500).json({
      message: e.message || e,
      error: true,
      success: false
    })
  }
}

module.exports = loginController