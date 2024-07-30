const User = require("../models/User")

async function serachUserController(req, res) {
  try {
    const { search } = req.body;
    const query = new RegExp(search, "i", "g");

    const user = await User.find({
      "$or": [
        { name: query },
        { email: query }
      ]
    }).select("-password")

    res.json({
      data: user,
      message: "fetched",
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

module.exports = serachUserController