const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function registerController(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      throw new Error("Email is already registered");
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        profile_pic,
        password: hashedPassword
      })
      const saveUser = await newUser.save();

      res.json({
        data: saveUser,
        message: "User created successfully",
        error: false,
        success: true
      })
    }

  } catch (e) {
    res.status(500).json(e.message || e)
  }
}

module.exports = registerController