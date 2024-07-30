const getDetailsFromToken = require("../helpers/getDetailsFromToken");
const User = require("../models/User");

async function updateUserController(req, res) {
  try {
    const token = req.cookies.token || "";
    const user = await getDetailsFromToken(token);

    const { name, profile_pic } = req.body;

    const updateUser = await User.updateOne({ _id: user._id }, { name, profile_pic })

    res.json({
      data: updateUser,
      message: "User Updated Successfully",
      error: false,
      success: true
    })
  } catch (e) {
    res.json({
      message: e.message || e,
      error: true,
      success: false
    })
  }
}

module.exports = updateUserController