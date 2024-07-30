const getDetailsFromToken = require("../helpers/getDetailsFromToken");

async function userDetailsController(req, res) {
  try {
    const token = req.cookies.token || "";
    const user = await getDetailsFromToken(token);
    console.log(user);

    res.json({
      message: "fetched",
      error: false,
      success: true,
      data: user
    })

  } catch (e) {
    res.json({
      message: e.message || e,
      error: true,
      success: false
    })
  }
}

module.exports = userDetailsController