async function logOutController(req, res) {
  try {
    res.clearCookie("token");

    res.json({
      message: "Log out",
      success: true,
      error: false
    })
  } catch (e) {
    res.json({
      message: e.message || e,
      error: true,
      success: false
    })
  }
}

module.exports = logOutController